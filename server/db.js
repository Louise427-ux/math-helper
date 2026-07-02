const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
require('dotenv').config();

const DEFAULT_DB_PATH = path.join(__dirname, 'data', 'math-helper.sqlite');
const DB_PATH = process.env.DB_PATH
  ? path.resolve(__dirname, process.env.DB_PATH)
  : DEFAULT_DB_PATH;

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientEventId TEXT NOT NULL UNIQUE,
    eventType TEXT,
    createdAt TEXT,
    receivedAt TEXT NOT NULL,
    className TEXT,
    studentName TEXT,
    studentNo TEXT,
    practiceName TEXT,
    questionId TEXT,
    stepIndex INTEGER,
    isPreview INTEGER NOT NULL DEFAULT 0,
    payloadJson TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_events_createdAt ON events (createdAt);
  CREATE INDEX IF NOT EXISTS idx_events_student ON events (className, studentName);
  CREATE INDEX IF NOT EXISTS idx_events_question ON events (questionId);
`);

function normalizeEvent(event) {
  if (!event || typeof event !== 'object') {
    throw new Error('event must be an object');
  }

  if (!event.clientEventId) {
    throw new Error('clientEventId is required');
  }

  return {
    clientEventId: String(event.clientEventId),
    eventType: event.eventType == null ? null : String(event.eventType),
    createdAt: event.createdAt == null ? null : String(event.createdAt),
    receivedAt: new Date().toISOString(),
    className: event.className == null ? null : String(event.className),
    studentName: event.studentName == null ? null : String(event.studentName),
    studentNo: event.studentNo == null ? null : String(event.studentNo),
    practiceName: event.practiceName == null ? null : String(event.practiceName),
    questionId: event.questionId == null ? null : String(event.questionId),
    stepIndex: Number.isInteger(event.stepIndex) ? event.stepIndex : null,
    isPreview: event.isPreview === true ? 1 : 0,
    payloadJson: JSON.stringify(event)
  };
}

const insertEventStmt = db.prepare(`
  INSERT OR IGNORE INTO events (
    clientEventId,
    eventType,
    createdAt,
    receivedAt,
    className,
    studentName,
    studentNo,
    practiceName,
    questionId,
    stepIndex,
    isPreview,
    payloadJson
  ) VALUES (
    @clientEventId,
    @eventType,
    @createdAt,
    @receivedAt,
    @className,
    @studentName,
    @studentNo,
    @practiceName,
    @questionId,
    @stepIndex,
    @isPreview,
    @payloadJson
  )
`);

function insertEvent(event) {
  const normalized = normalizeEvent(event);
  const result = insertEventStmt.run(normalized);
  return result.changes === 1 ? 'inserted' : 'skipped';
}

const insertEventsTransaction = db.transaction(events => {
  const summary = { inserted: 0, skipped: 0, failed: 0 };

  events.forEach(event => {
    try {
      const status = insertEvent(event);
      summary[status] += 1;
    } catch (error) {
      summary.failed += 1;
    }
  });

  return summary;
});

function insertEvents(events) {
  if (!Array.isArray(events)) {
    throw new Error('events must be an array');
  }

  return insertEventsTransaction(events);
}

function listEvents(options = {}) {
  const limit = Number.isInteger(options.limit) ? options.limit : 100;
  return db.prepare(`
    SELECT
      id,
      clientEventId,
      eventType,
      createdAt,
      receivedAt,
      className,
      studentName,
      studentNo,
      practiceName,
      questionId,
      stepIndex,
      isPreview,
      payloadJson
    FROM events
    ORDER BY id DESC
    LIMIT ?
  `).all(limit);
}

function countEvents() {
  return db.prepare('SELECT COUNT(*) AS count FROM events').get().count;
}

module.exports = {
  db,
  DB_PATH,
  insertEvent,
  insertEvents,
  listEvents,
  countEvents
};
