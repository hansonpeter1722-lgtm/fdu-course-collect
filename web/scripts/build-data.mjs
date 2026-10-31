import { readFile, writeFile, mkdir, access, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { parse } from "csv-parse";
import { parseList, safeUrl } from "./parse-list.mjs";

const web = fileURLToPath(new URL("../", import.meta.url));
const source = path.resolve(
  process.env.WEB_DATA_DIR || path.join(web, "../data"),
);
const output = path.resolve(
  process.env.WEB_DATA_OUTPUT_DIR || path.join(web, "src/data"),
);
const publicDirectory = process.env.WEB_DATA_OUTPUT_DIR
  ? path.join(output, ".public")
  : path.join(web, "public");
const schemas = {
  courses:
    "id,zh_name,en_name,codes,area,repos,exam,notes,materials,code,schedule_status,merge_into,schedule_match",
  course_repos:
    "course_id,course_name,full_name,url,resource_type,tags,language,stars,year,tech,code_intro,intro,desc,pushed",
  collections:
    "collection,course_id,course_name,module,file_count,leaf_count,top",
  collection_files:
    "collection,branch,course_id,course_name,module,path,url,file_count,ext",
  course_exams:
    "course_id,course_name,title,url,source,type,year,access,quality,desc,access_kind",
  schedule_course_mapping_2026:
    "schedule_name,schedule_codes,credits,sections,departments,coverage,local_name,suggested_local",
  course_mapping_2026:
    "local_id,local_name,area,local_codes,local_repos,status,merge_into,match_type,schedule_name,schedule_codes,schedule_credits,schedule_sections,note",
};
const number = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);
const moduleName = (value) =>
  ({ 课程材料: "课程资料", 笔记: "课程资料", 代码仓: "代码仓库" })[value] ||
  value;

async function main() {
  const missing = [];
  for (const name of Object.keys(schemas)) {
    try {
      await access(path.join(source, `${name}.csv`));
    } catch {
      missing.push(`${name}.csv`);
    }
  }
  if (missing.length)
    throw new Error(
      `缺少只读数据源：${missing.join("、")}\n预期目录：${source}\n请将 web/ 放入已有 data/ 的 fdu-course-collect 根目录；不会生成或下载替代数据。`,
    );
  const raw = {};
  for (const [name, fields] of Object.entries(schemas)) {
    const content = await readFile(path.join(source, `${name}.csv`), "utf8");
    const { rows, header } = await new Promise((resolve, reject) => {
      parse(
        content,
        {
          bom: true,
          columns: true,
          skip_empty_lines: true,
          relax_quotes: true,
        },
        (error, records, info) => {
          if (error) reject(error);
          else
            resolve({
              rows: records,
              header: Array.isArray(info.columns)
                ? info.columns.map((column) => column.name)
                : [],
            });
        },
      );
    });
    const absent = fields
      .split(",")
      .filter((field) => !header?.includes(field));
    if (absent.length)
      throw new Error(`${name}.csv 缺少字段：${absent.join(", ")}`);
    raw[name] = rows;
    console.log(`${name}.csv: ${rows.length} 行；字段 ${header.join(",")}`);
    if (process.argv.includes("--inspect"))
      console.log(JSON.stringify(rows.slice(0, 3), null, 2));
  }
  const ids = new Set();
  const courses = raw.courses.map((r) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(r.id) || ids.has(r.id))
      throw new Error(`课程 id 非法或重复：${r.id}`);
    ids.add(r.id);
    if (
      !["开课", "合并", "今年未开课", "研究生已过滤"].includes(
        r.schedule_status,
      )
    )
      throw new Error(`未知课程状态：${r.schedule_status}`);
    return {
      id: r.id,
      name: r.zh_name,
      enName: r.en_name,
      codes: parseList(r.codes),
      area: r.area,
      counts: { repos: 0, exams: 0, collectionFiles: 0 },
      status: r.schedule_status,
      mergeInto: r.merge_into,
      scheduleMatch: r.schedule_match,
    };
  });
  const byId = new Map(courses.map((c) => [c.id, c]));
  const byName = new Map(courses.map((c) => [c.name, c]));
  const byScheduleName = new Map(
    courses
      .filter((c) => c.status === "开课" && c.scheduleMatch)
      .map((c) => [c.scheduleMatch, c]),
  );
  const seen = new Set();
  const repos = raw.course_repos
    .filter((r) => {
      const key = `${r.course_id}\0${r.full_name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((r) => ({
      courseId: r.course_id,
      courseName: r.course_name,
      fullName: r.full_name,
      url: safeUrl(r.url),
      type: r.resource_type,
      tags: [...new Set([...parseList(r.tags), ...parseList(r.tech)])],
      language: r.language,
      stars: number(r.stars),
      year: r.year,
      intro: r.intro || r.code_intro,
      desc: r.desc,
      pushed: r.pushed,
    }));
  const exams = raw.course_exams.map((r) => ({
    courseId: r.course_id,
    courseName: r.course_name,
    title: r.title,
    url: safeUrl(r.url),
    source: r.source,
    type: r.type,
    year: r.year,
    access: r.access,
    accessKind: ["free", "preview", "paid", "unknown"].includes(r.access_kind)
      ? r.access_kind
      : "unknown",
    desc: r.desc,
    quality: r.quality,
  }));
  const collections = raw.collections.map((r, i) => {
    let top;
    try {
      top = JSON.parse(r.top || "[]");
      if (!Array.isArray(top)) throw new Error("not array");
    } catch {
      throw new Error(`collections.csv 第 ${i + 2} 行 top 不是 JSON 数组`);
    }
    return {
      collection: r.collection,
      courseId: r.course_id,
      courseName: r.course_name,
      module: moduleName(r.module),
      fileCount: number(r.file_count),
      leafCount: number(r.leaf_count),
      top: top.map((item) => ({
        path: String(item.path || ""),
        url: safeUrl(item.url),
        kind: String(item.kind || ""),
        fileCount: number(item.file_count),
      })),
    };
  });
  const collectionFiles = raw.collection_files.map((r) => ({
    courseId: r.course_id,
    courseName: r.course_name,
    module: moduleName(r.module),
    originalModule: r.module,
    path: r.path,
    url: safeUrl(r.url),
    collection: r.collection,
    ext: r.ext,
    branch: r.branch,
    fileCount: number(r.file_count),
  }));
  const mapping = raw.course_mapping_2026.map((r) => {
    const course = byId.get(r.local_id);
    if (!course) throw new Error(`映射引用不存在的课程：${r.local_id}`);
    if (course.status !== r.status)
      throw new Error(
        `课程状态不一致：${r.local_id} courses=${course.status}, mapping=${r.status}`,
      );
    return {
      localId: r.local_id,
      localName: r.local_name,
      area: r.area,
      localCodes: parseList(r.local_codes),
      localRepos: number(r.local_repos),
      status: r.status,
      mergeInto: r.merge_into,
      matchType: r.match_type,
      scheduleName: r.schedule_name,
      scheduleCodes: parseList(r.schedule_codes),
      scheduleCredits: r.schedule_credits,
      scheduleSections: r.schedule_sections,
      note: r.note,
    };
  });
  for (const m of mapping)
    if (m.scheduleName && m.status === "开课")
      byScheduleName.set(m.scheduleName, byId.get(m.localId));
  const schedule = raw.schedule_course_mapping_2026.map((r) => ({
    name: r.schedule_name,
    codes: parseList(r.schedule_codes),
    credits: r.credits,
    sections: r.sections,
    departments: parseList(r.departments),
    coverage: r.coverage,
    localName: r.local_name,
    suggestedLocal: r.suggested_local,
    localId: ["已有", "课名映射"].includes(r.coverage)
      ? (
          byName.get(r.local_name) ||
          byScheduleName.get(r.schedule_name) ||
          byName.get(r.schedule_name)
        )?.id || ""
      : "",
  }));
  for (const [rows, key] of [
    [repos, "repos"],
    [exams, "exams"],
    [collectionFiles, "collectionFiles"],
  ])
    for (const row of rows) {
      const course = byId.get(row.courseId);
      if (!course && row.courseId)
        throw new Error(`资源引用不存在的课程：${row.courseId}`);
      if (course) course.counts[key]++;
    }
  let repositoryUrl = safeUrl(process.env.PUBLIC_REPOSITORY_URL || "");
  if (!repositoryUrl)
    try {
      const remote = execFileSync(
        "git",
        ["config", "--get", "remote.origin.url"],
        {
          cwd: path.join(web, ".."),
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        },
      ).trim();
      repositoryUrl = safeUrl(
        remote
          .replace(/^git@github\.com:/, "https://github.com/")
          .replace(/\.git$/, ""),
      );
    } catch {}
  let license = "";
  for (const name of ["LICENSE", "LICENSE.md", "LICENSE.txt", "COPYING"])
    try {
      license = await readFile(path.join(web, "..", name), "utf8");
      break;
    } catch {}
  const stats = {
    courses: courses.length,
    unassignedExams: exams.filter((exam) => !exam.courseId).length,
    repos: repos.length,
    exams: exams.length,
    collectionFiles: collectionFiles.length,
    collections: collections.length,
    schedule: schedule.length,
    sourceRepos: raw.course_repos.length,
    duplicatesRemoved: raw.course_repos.length - repos.length,
    status: Object.fromEntries(
      ["开课", "合并", "今年未开课", "研究生已过滤"].map((s) => [
        s,
        courses.filter((c) => c.status === s).length,
      ]),
    ),
    builtAt: new Date().toISOString(),
    repositoryUrl,
    hasLicense: Boolean(license),
  };
  const context = (id) => {
    const c = byId.get(id);
    return {
      courseId: id,
      status: c?.status || "",
      area: c?.area || "",
      codes: c?.codes || [],
      courseName: c?.name || "",
    };
  };
  const searchDocs = [
    ...courses.map((c) => ({
      ...context(c.id),
      codes: [
        ...new Set([
          ...c.codes,
          ...schedule.filter((s) => s.localId === c.id).flatMap((s) => s.codes),
        ]),
      ],
      id: `course:${c.id}`,
      type: "课程",
      title: c.name,
      subtitle: c.enName,
      text: [c.name, c.enName, c.scheduleMatch, ...c.codes].join(" "),
      href: `courses/${c.id}/`,
      resourceType: "",
      access: "",
      language: "",
      year: "",
    })),
    ...repos.map((r, i) => ({
      ...context(r.courseId),
      id: `repo:${i}`,
      type: "仓库",
      title: r.fullName,
      subtitle: r.courseName,
      text: [r.fullName, r.courseName, r.intro, r.desc, ...r.tags].join(" "),
      href: r.url,
      resourceType: r.type,
      access: "",
      language: r.language,
      year: r.year,
    })),
    ...exams.map((e, i) => ({
      ...context(e.courseId),
      id: `exam:${i}`,
      type: "试题",
      title: e.title,
      subtitle: e.courseName,
      text: [e.title, e.courseName, e.desc, e.source].join(" "),
      href: e.url,
      resourceType: e.type || "试题",
      access: e.accessKind,
      language: "",
      year: e.year,
    })),
    ...schedule.map((s, i) => ({
      ...context(s.localId),
      codes: s.codes,
      id: `schedule:${i}`,
      type: "2026 开课",
      title: s.name,
      subtitle: `${s.departments.join(" / ")} · ${s.credits} 学分`,
      text: [s.name, ...s.codes, ...s.departments, s.localName].join(" "),
      href: s.localId
        ? `courses/${s.localId}/`
        : `schedule/?q=${encodeURIComponent(s.name)}`,
      resourceType: "",
      access: "",
      language: "",
      year: "2026",
    })),
  ];
  await mkdir(output, { recursive: true });
  const outputs = {
    courses,
    repos,
    exams,
    collections,
    "collection-files": collectionFiles,
    schedule,
    mapping,
    stats,
    "search-docs": searchDocs,
  };
  for (const [name, data] of Object.entries(outputs))
    await writeFile(path.join(output, `${name}.json`), JSON.stringify(data));
  await mkdir(publicDirectory, { recursive: true });
  if (license)
    await writeFile(path.join(publicDirectory, "LICENSE.txt"), license);
  else await rm(path.join(publicDirectory, "LICENSE.txt"), { force: true });
  console.log(
    "JSON 条数：",
    Object.fromEntries(
      Object.entries(outputs).map(([name, data]) => [
        name,
        Array.isArray(data) ? data.length : 1,
      ]),
    ),
  );
}
main().catch((error) => {
  console.error(`\n数据构建失败：${error.message}`);
  process.exitCode = 1;
});
