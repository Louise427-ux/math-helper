const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { insertEvent, insertEvents, listOfficialEventsForExport } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN;
const teacherExportToken = process.env.TEACHER_EXPORT_TOKEN;

app.use(cors(allowedOrigin ? { origin: allowedOrigin } : {}));
app.use(express.json({ limit: '1mb' }));

function validateEvent(event) {
  if (!event || typeof event !== 'object' || Array.isArray(event)) {
    return 'event must be an object';
  }

  if (!event.clientEventId || typeof event.clientEventId !== 'string') {
    return 'clientEventId is required';
  }

  if (!event.eventType || typeof event.eventType !== 'string') {
    return 'eventType is required';
  }

  return null;
}

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

function csvValue(value) {
  if (value == null) return '';
  const str = String(value);
  return /[",\r\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function parsePayload(row) {
  try {
    return row.payloadJson ? JSON.parse(row.payloadJson) : {};
  } catch {
    return {};
  }
}

function pick(row, payload, key) {
  return row[key] != null && row[key] !== '' ? row[key] : payload[key];
}

function formatBeijingTime(value) {
  if (value == null || value === '') return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(date);

  const getPart = type => {
    const part = parts.find(item => item.type === type);
    return part ? part.value : '';
  };

  return `${getPart('year')}-${getPart('month')}-${getPart('day')} ${getPart('hour')}:${getPart('minute')}:${getPart('second')}`;
}

function getAnswerText(payload) {
  if (payload.selectedAnswer != null && payload.selectedAnswer !== '') return payload.selectedAnswer;
  if (payload.answer != null && payload.answer !== '') return payload.answer;
  return '';
}

function getIsCorrect(eventType) {
  if (eventType === 'step_correct' || eventType === 'remedial_correct') return '是';
  if (eventType === 'step_wrong' || eventType === 'remedial_wrong') return '否';
  return '';
}

function getIsRemedial(eventType, payload) {
  if (eventType === 'remedial_start' || eventType === 'remedial_correct' || eventType === 'remedial_wrong') {
    return '是';
  }
  if (payload.hasRemedial === true) return '是';
  if (payload.hasRemedial === false) return '否';
  return '';
}

function buildEventsCsv(rows) {
  const columns = [
    '记录时间',
    '练习名称',
    '班级',
    '姓名',
    '学号/座号',
    '题目ID',
    '题目名称',
    '步骤序号',
    '事件类型',
    '是否微变式',
    '是否答对',
    '学生选择',
    '学生选择序号',
    '正确答案序号',
    '错因类型',
    '反馈文字',
    '用时毫秒',
    '是否看提示',
    'clientEventId',
    '原始事件JSON'
  ];

  const lines = rows.map(row => {
    const payload = parsePayload(row);
    const eventType = pick(row, payload, 'eventType');
    const eventTime = pick(row, payload, 'createdAt') || row.receivedAt;
    const values = [
      formatBeijingTime(eventTime),
      pick(row, payload, 'practiceName'),
      pick(row, payload, 'className'),
      pick(row, payload, 'studentName'),
      pick(row, payload, 'studentNo'),
      pick(row, payload, 'questionId'),
      payload.questionTitle,
      payload.stepNum != null ? payload.stepNum : row.stepIndex,
      eventType,
      getIsRemedial(eventType, payload),
      getIsCorrect(eventType),
      getAnswerText(payload),
      payload.selectedIndex,
      payload.correctIndex != null ? payload.correctIndex : payload.remedialCorrectIndex,
      payload.sourceSkillTag || payload.skillTag,
      payload.feedback || payload.feedbackText,
      payload.durationMs,
      payload.viewedHint === true ? '是' : (payload.viewedHint === false ? '否' : ''),
      row.clientEventId,
      row.payloadJson
    ];

    return values.map(csvValue).join(',');
  });

  return '\uFEFF' + [columns.join(','), ...lines].join('\r\n');
}

app.get('/api/events.csv', (req, res) => {
  if (!teacherExportToken || req.query.token !== teacherExportToken) {
    return res.status(403).json({ ok: false, error: 'forbidden' });
  }

  try {
    const rows = listOfficialEventsForExport();
    const csv = buildEventsCsv(rows);
    const date = new Date().toISOString().slice(0, 10);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="math-helper-events-${date}.csv"`);
    return res.send(csv);
  } catch (error) {
    console.error('[GET /api/events.csv]', error);
    return res.status(500).json({ ok: false, error: 'failed to export events' });
  }
});

app.post('/api/events', (req, res) => {
  const validationError = validateEvent(req.body);
  if (validationError) {
    return res.status(400).json({ ok: false, error: validationError });
  }

  try {
    const status = insertEvent(req.body);
    return res.json({ ok: true, status });
  } catch (error) {
    console.error('[POST /api/events]', error);
    return res.status(500).json({ ok: false, error: 'failed to save event' });
  }
});

app.post('/api/events/batch', (req, res) => {
  const events = req.body && req.body.events;
  if (!Array.isArray(events)) {
    return res.status(400).json({ ok: false, error: 'events must be an array' });
  }

  const validEvents = [];
  let failed = 0;

  events.forEach(event => {
    const validationError = validateEvent(event);
    if (validationError) {
      failed += 1;
    } else {
      validEvents.push(event);
    }
  });

  try {
    const result = insertEvents(validEvents);
    return res.json({
      ok: true,
      inserted: result.inserted,
      skipped: result.skipped,
      failed: result.failed + failed
    });
  } catch (error) {
    console.error('[POST /api/events/batch]', error);
    return res.status(500).json({ ok: false, error: 'failed to save events' });
  }
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ ok: false, error: 'invalid JSON' });
  }

  return next(error);
});

app.listen(PORT, () => {
  console.log(`Math helper server listening on port ${PORT}`);
});
