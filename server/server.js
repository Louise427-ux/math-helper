const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { insertEvent, insertEvents } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN;

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
