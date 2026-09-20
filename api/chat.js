/**
 * D23: the endpoint is now a LOCAL Next Route Handler (app/api/chat/route.js), not the
 * external backend. `apiUrl()` prefixed the separate API origin; a same-origin relative
 * path replaces it, which is also what makes the Route Handler's Origin check meaningful.
 *
 * The RESPONSE CONTRACT below is unchanged, so every caller behaves exactly as before:
 *   { answer, source: "ai" } | { source: "quota_exceeded" } | { source: "error", message }
 */
const CHAT_ENDPOINT = "/api/chat";

/**
 * Send a question to the backend AI chat endpoint.
 *
 * Returns the backend's JSON response, which is always one of:
 *   { answer, source: "ai" }       → render the answer
 *   { source: "quota_exceeded" }   → caller runs the keyword fallback
 *   { source: "error", message }   → caller runs the keyword fallback
 *
 * Network failure (server down, CORS, etc.) throws — the caller treats a thrown
 * error the same as "quota_exceeded": fall back to keyword matching.
 *
 * @param {string} question
 * @param {Array<{role: "user"|"assistant", content: string}>} history
 */
export async function sendChatMessage(question, history = []) {
  const res = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, history }),
  });

  // The backend returns a `source` field even on handled errors, so we parse the
  // body regardless of status instead of throwing on non-2xx.
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!data.source) {
    // Unexpected shape → behave like an error so the caller falls back.
    return { source: "error", message: `Unexpected response (${res.status})` };
  }
  return data;
}
