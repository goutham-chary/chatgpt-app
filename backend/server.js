const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MOCK_DIR = path.join(__dirname, "mock");
const SESSIONS_FILE = path.join(MOCK_DIR, "sessions.json");
const HISTORY_FILE = path.join(MOCK_DIR, "sessions_history.json");
const RESPONSES_FILE = path.join(MOCK_DIR, "sample_responses.json");

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return null;
  }
}
function writeJSON(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}

app.get("/api/health", (req, res) => res.json({ ok: true }));

// Get all sessions
app.get("/api/sessions", (req, res) => {
  const sessions = readJSON(SESSIONS_FILE) || [];
  res.json(sessions);
});

// Create a new session
app.post("/api/sessions", (req, res) => {
  const sessions = readJSON(SESSIONS_FILE) || [];
  const id = `sess-${nanoid(8)}`;
  const title = req.body.title || `Chat ${sessions.length + 1}`;
  const newSession = { id, title, createdAt: new Date().toISOString() };
  sessions.unshift(newSession);
  writeJSON(SESSIONS_FILE, sessions);
  const history = readJSON(HISTORY_FILE) || {};
  history[id] = [];
  writeJSON(HISTORY_FILE, history);
  res.json({ id, title });
});

// Get session history
app.get("/api/sessions/:id/history", (req, res) => {
  const history = readJSON(HISTORY_FILE) || {};
  res.json(history[req.params.id] || []);
});

// Ask question in session -> returns a dummy table + assistant message
app.post("/api/sessions/:id/message", (req, res) => {
  const { id } = req.params;
  const { message } = req.body || {};
  const responses = readJSON(RESPONSES_FILE) || {};

  // naive selection based on keywords
  let key = "sales_q1";
  if (/employee|staff|department/i.test(message)) key = "employees_summary";
  const response = responses[key];

  // append to history
  const history = readJSON(HISTORY_FILE) || {};
  history[id] = history[id] || [];
  history[id].push({
    role: "user",
    text: message,
    timestamp: new Date().toISOString(),
  });
  history[id].push({
    role: "assistant",
    text: response.text,
    table: response.table,
    timestamp: new Date().toISOString(),
    meta: { responseKey: key },
  });
  writeJSON(HISTORY_FILE, history);

  res.json({ text: response.text, table: response.table });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Mock backend running on http://localhost:${PORT}`)
);
