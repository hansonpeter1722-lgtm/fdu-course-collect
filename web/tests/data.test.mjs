import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parseList, safeUrl } from "../scripts/parse-list.mjs";
import {
  fixtureData,
  fixtureDirectory,
  writeFixtures,
} from "./make-fixtures.mjs";
const web = fileURLToPath(new URL("../", import.meta.url));
test("list parser accepts safe formats without executing code", () => {
  assert.deepEqual(parseList('["C++", "Python"]'), ["C++", "Python"]);
  assert.deepEqual(parseList("['C, C++', 'Python', 'it\\'s']"), [
    "C, C++",
    "Python",
    "it's",
  ]);
  assert.deepEqual(parseList("C;Python,Java"), ["C", "Python", "Java"]);
  assert.deepEqual(parseList(""), []);
  assert.equal(safeUrl("javascript:alert(1)"), "");
});
test("CSV build counts records, deduplicates repos, retains paid labels, resolves mappings", async () => {
  await writeFixtures();
  const out = `${web}.qa/test-json`;
  const env = {
    ...process.env,
    WEB_DATA_DIR: fixtureDirectory,
    WEB_DATA_OUTPUT_DIR: out,
  };
  execFileSync(process.execPath, ["scripts/build-data.mjs", "--inspect"], {
    cwd: web,
    env,
  });
  const json = async (name) =>
    JSON.parse(await readFile(`${out}/${name}.json`, "utf8"));
  const stats = await json("stats");
  assert.deepEqual(
    [
      stats.courses,
      stats.repos,
      stats.exams,
      stats.collectionFiles,
      stats.collections,
      stats.schedule,
    ],
    [5, 3, 4, 65, 3, 3],
  );
  assert.equal(stats.duplicatesRemoved, 1);
  const courses = await json("courses");
  assert.deepEqual(courses[0].counts, {
    repos: 2,
    exams: 4,
    collectionFiles: 65,
  });
  assert.deepEqual(courses[0].codes, ["COMP130001", "COMP130002"]);
  assert.equal((await json("exams"))[2].accessKind, "paid");
  assert.equal((await json("schedule"))[0].localId, "ics");
  assert.equal((await json("schedule"))[2].localId, "");
  assert.equal((await json("search-docs")).length, 15);
  assert.ok(
    (await json("search-docs"))
      .find((d) => d.id === "course:ics")
      .codes.includes("CS10005"),
  );
  assert.equal((await json("collection-files"))[64].module, "代码仓库");
  assert.equal((await json("collection-files"))[63].module, "课程资料");
  for (const name of [
    "courses",
    "repos",
    "exams",
    "collections",
    "collection-files",
    "schedule",
    "mapping",
    "stats",
    "search-docs",
  ])
    assert.ok(await json(name));
});
test("missing CSV and inconsistent mapping fail with a readable error", async () => {
  const missing = spawnSync(process.execPath, ["scripts/build-data.mjs"], {
    cwd: web,
    encoding: "utf8",
    env: { ...process.env, WEB_DATA_DIR: `${web}.qa/absent` },
  });
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /缺少只读数据源/);
  const directory = `${web}.qa/invalid-fixtures`;
  await writeFixtures(directory, {
    ...fixtureData,
    course_mapping_2026: fixtureData.course_mapping_2026.map((row, i) =>
      i ? row : { ...row, status: "合并" },
    ),
  });
  const invalid = spawnSync(process.execPath, ["scripts/build-data.mjs"], {
    cwd: web,
    encoding: "utf8",
    env: {
      ...process.env,
      WEB_DATA_DIR: directory,
      WEB_DATA_OUTPUT_DIR: `${web}.qa/invalid-output`,
    },
  });
  assert.equal(invalid.status, 1);
  assert.match(invalid.stderr, /课程状态不一致/);
});

test("exams outside the local course catalog remain indexed without a fabricated course", async () => {
  const directory = `${web}.qa/outside-fixtures`;
  const output = `${web}.qa/outside-json`;
  await writeFixtures(directory, {
    ...fixtureData,
    course_exams: [
      ...fixtureData.course_exams,
      {
        ...fixtureData.course_exams[0],
        course_id: "",
        course_name: "（课程表外）",
        title: "课程表外试卷",
      },
    ],
  });
  execFileSync(process.execPath, ["scripts/build-data.mjs"], {
    cwd: web,
    env: {
      ...process.env,
      WEB_DATA_DIR: directory,
      WEB_DATA_OUTPUT_DIR: output,
    },
  });
  const stats = JSON.parse(await readFile(`${output}/stats.json`, "utf8"));
  assert.equal(stats.exams, 5);
  assert.equal(stats.unassignedExams, 1);
  const docs = JSON.parse(await readFile(`${output}/search-docs.json`, "utf8"));
  assert.equal(docs.find((d) => d.title === "课程表外试卷").courseId, "");
});
