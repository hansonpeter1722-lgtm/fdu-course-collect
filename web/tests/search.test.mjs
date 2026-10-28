import test from "node:test";
import assert from "node:assert/strict";
import { search, tokenize } from "../src/lib/search.mjs";
const doc = (id, type, title, subtitle, text, codes) => ({
  id,
  type,
  title,
  subtitle,
  text,
  codes,
  status: "开课",
  area: "计算机",
  access: "",
  resourceType: "",
  language: "",
  year: "",
});
const docs = [
  doc(
    "repo",
    "仓库",
    "example/ics-notes",
    "计算机系统基础",
    "COMP130001 系统 笔记",
    ["COMP130001"],
  ),
  doc("exam", "试题", "2025 计算机系统期末试卷", "计算机系统基础", "试卷", [
    "COMP130001",
  ]),
  doc("schedule", "2026 开课", "计算机系统基础（荣誉）", "", "", [
    "COMP130001",
  ]),
  doc(
    "course",
    "课程",
    "计算机系统基础",
    "Introduction to Computer Systems",
    "",
    ["COMP130001"],
  ),
];
test("exact course code/name wins over resources; names, repos, titles and schedules are searchable", () => {
  assert.equal(search(docs, "comp130001")[0].id, "course");
  assert.equal(search(docs, "计算机系统基础")[0].id, "course");
  assert.equal(
    search(docs, "Introduction to Computer Systems")[0].id,
    "course",
  );
  assert.equal(search(docs, "ics-notes")[0].id, "repo");
  assert.equal(search(docs, "2025 计算机系统期末试卷")[0].id, "exam");
  assert.equal(search(docs, "计算机系统基础（荣誉）")[0].id, "schedule");
  assert.equal(
    search(docs, "计算机", { type: "仓库", status: "开课" })[0].id,
    "repo",
  );
  assert.equal(search(docs, "", { type: "课程", status: "合并" }).length, 0);
});
test("Chinese 2-gram fallback supports Chinese and course codes", () => {
  assert.deepEqual(tokenize("数学分析", true), ["数学", "学分", "分析"]);
  assert.deepEqual(tokenize("COMP130001 数学", true), ["comp130001", "数学"]);
  assert.ok(tokenize("计算机系统").length > 0);
});
