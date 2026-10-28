// Parse data, never execute it. Also handles escaped apostrophes in Python-style lists.
export function parseList(value) {
  if (Array.isArray(value))
    return value
      .map(String)
      .map((x) => x.trim())
      .filter(Boolean);
  const text = String(value ?? "").trim();
  if (!text || text === "None" || text === "null") return [];
  try {
    const result = JSON.parse(text);
    if (Array.isArray(result)) return parseList(result);
  } catch {}
  const body =
    text.startsWith("[") && text.endsWith("]") ? text.slice(1, -1) : text;
  const values = [];
  let token = "";
  let quote = "";
  let escaped = false;
  for (const character of body) {
    if (escaped) {
      token += character;
      escaped = false;
      continue;
    }
    if (quote && character === "\\") {
      escaped = true;
      continue;
    }
    if (quote) {
      if (character === quote) quote = "";
      else token += character;
      continue;
    }
    if ((character === '"' || character === "'") && !token.trim()) {
      quote = character;
      continue;
    }
    if (/[,;，；]/.test(character)) {
      if (token.trim()) values.push(token.trim());
      token = "";
    } else token += character;
  }
  if (token.trim()) values.push(token.trim());
  return values;
}

export function safeUrl(value) {
  try {
    const url = new URL(String(value));
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}
