export function normalize(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
export function tokenize(value, fallback = false) {
  const text = normalize(value);
  if (!fallback)
    try {
      const segmenter = new Intl.Segmenter("zh", { granularity: "word" });
      return [...segmenter.segment(text)]
        .filter((s) => s.isWordLike)
        .map((s) => s.segment);
    } catch {}
  return [...text.matchAll(/[a-z0-9_-]+|[\u3400-\u9fff]+/g)].flatMap(
    ([word]) => {
      if (/^[a-z0-9_-]+$/.test(word) || word.length < 2) return [word];
      return Array.from({ length: word.length - 1 }, (_, i) =>
        word.slice(i, i + 2),
      );
    },
  );
}
export function score(doc, query, words = tokenize(query)) {
  const q = normalize(query);
  if (!q) return 1;
  const exactCode = doc.codes.some((code) => normalize(code) === q);
  const exactName =
    normalize(doc.title) === q ||
    (doc.type === "课程" && normalize(doc.subtitle) === q);
  if (doc.type === "课程" && exactCode) return 10000;
  if (doc.type === "课程" && exactName) return 9000;
  const haystack = normalize(
    `${doc.title} ${doc.subtitle} ${doc.text} ${doc.codes.join(" ")}`,
  );
  if (exactCode) return 8000;
  if (exactName) return 7000;
  if (haystack.includes(q))
    return 5000 + (normalize(doc.title).includes(q) ? 500 : 0);
  if (!words.length || !words.every((word) => haystack.includes(word)))
    return 0;
  return (
    1000 +
    words.filter((word) => normalize(doc.title).includes(word)).length * 100
  );
}
export function search(docs, query, filters = {}) {
  const q = normalize(query);
  const words = tokenize(q);
  return docs
    .filter((doc) =>
      Object.entries(filters).every(
        ([key, value]) => !value || value === "全部" || doc[key] === value,
      ),
    )
    .map((doc) => ({ doc, score: score(doc, q, words) }))
    .filter((result) => result.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.doc.title.localeCompare(b.doc.title, "zh"),
    )
    .map((result) => result.doc);
}
