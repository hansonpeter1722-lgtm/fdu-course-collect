import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
export const fixtureDirectory = fileURLToPath(
  new URL("../.qa/fixtures", import.meta.url),
);
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
const course = (id, name, en, codes, area, status, merge = "", match = "") => ({
  id,
  zh_name: name,
  en_name: en,
  codes,
  area,
  schedule_status: status,
  merge_into: merge,
  schedule_match: match,
});
const courses = [
  course(
    "ics",
    "计算机系统基础",
    "Introduction to Computer Systems",
    "COMP130001;COMP130002",
    "计算机科学",
    "开课",
    "",
    "计算机系统基础（荣誉）",
  ),
  course(
    "mathanalysis",
    "数学分析",
    "Mathematical Analysis",
    "MATH130001",
    "数学",
    "开课",
  ),
  course(
    "merged",
    "测试合并课程",
    "Merged course",
    "COMP000001",
    "计算机科学",
    "合并",
    "计算机系统基础",
  ),
  course(
    "history",
    "测试历史课程",
    "Historical course",
    "HIST000001",
    "人文",
    "今年未开课",
  ),
  course(
    "graduate",
    "测试研究生课程",
    "Graduate course",
    "GRAD000001",
    "研究生",
    "研究生已过滤",
  ),
];
export const fixtureData = {
  courses,
  course_repos: [
    {
      course_id: "ics",
      course_name: "计算机系统基础",
      full_name: "example/ics-notes",
      url: "https://github.com/example/ics-notes",
      resource_type: "笔记",
      tags: "['系统', 'C, C++']",
      tech: '["C"]',
      language: "C",
      stars: "12",
      year: "2025",
      intro: "测试：课程笔记",
    },
    {
      course_id: "ics",
      course_name: "计算机系统基础",
      full_name: "example/ics-notes",
      url: "https://github.com/example/ics-notes",
      resource_type: "笔记",
      tags: "",
      language: "C",
      stars: "12",
    },
    {
      course_id: "ics",
      course_name: "计算机系统基础",
      full_name: "example/ics-code",
      url: "https://github.com/example/ics-code",
      resource_type: "代码仓",
      tags: '["C", "实验"]',
      language: "C",
      stars: "8",
      year: "2024",
    },
    {
      course_id: "mathanalysis",
      course_name: "数学分析",
      full_name: "example/math-exams",
      url: "https://github.com/example/math-exams",
      resource_type: "试题",
      tags: "数学;考试",
      stars: "3",
      year: "2024",
    },
  ],
  course_exams: ["free", "preview", "paid", "unknown"].map((kind, i) => ({
    course_id: "ics",
    course_name: "计算机系统基础",
    title: ["测试期末试卷", "测试预览试卷", "测试付费试卷", "测试未知试卷"][i],
    url: `https://example.com/exam/${i}`,
    source: "测试来源",
    type: "期末",
    year: "2025",
    access: {
      free: "公开",
      preview: "部分预览",
      paid: "付费",
      unknown: "未知",
    }[kind],
    access_kind: kind,
  })),
  collections: ["试题", "课程资料", "代码仓库"].map((module) => ({
    collection: "测试合集",
    course_id: "ics",
    course_name: "计算机系统基础",
    module,
    file_count: module === "试题" ? "63" : "1",
    leaf_count: "1",
    top: JSON.stringify([
      {
        path: "test",
        url: "https://github.com/example/test/tree/main",
        kind: "dir",
        file_count: 63,
      },
    ]),
  })),
  collection_files: Array.from({ length: 65 }, (_, i) => ({
    collection: "测试合集",
    branch: "main",
    course_id: "ics",
    course_name: "计算机系统基础",
    module: i < 63 ? "试题" : i === 63 ? "笔记" : "代码仓",
    path:
      i < 63
        ? `测试试题/2025/测试文件-${i + 1}.pdf`
        : i === 63
          ? "测试课件/slides.pdf"
          : "测试代码/main.c",
    url: `https://github.com/example/test/blob/main/file-${i}.pdf`,
    file_count: "1",
    ext: i === 64 ? ".c" : ".pdf",
  })),
  schedule_course_mapping_2026: [
    {
      schedule_name: "计算机系统基础（荣誉）",
      schedule_codes: "CS10005",
      credits: "4",
      sections: "2",
      departments: "计算机科学技术学院;软件学院",
      coverage: "课名映射",
      local_name: "计算机系统基础",
    },
    {
      schedule_name: "数学分析",
      schedule_codes: "MATH130001",
      credits: "5",
      sections: "3",
      departments: "数学科学学院",
      coverage: "已有",
      local_name: "数学分析",
    },
    {
      schedule_name: "测试新增课程",
      schedule_codes: "TEST000001",
      credits: "2",
      sections: "1",
      departments: "测试院系",
      coverage: "无对应",
      local_name: "",
    },
  ],
  course_mapping_2026: courses.map((c) => ({
    local_id: c.id,
    local_name: c.zh_name,
    area: c.area,
    local_codes: c.codes,
    status: c.schedule_status,
    merge_into: c.merge_into,
    schedule_name:
      c.schedule_match || (c.id === "mathanalysis" ? "数学分析" : ""),
    match_type: c.schedule_match ? "课名映射" : "已有",
    schedule_credits: "4",
  })),
};
export async function writeFixtures(
  directory = fixtureDirectory,
  data = fixtureData,
) {
  await mkdir(directory, { recursive: true });
  const cell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  for (const [name, header] of Object.entries(schemas)) {
    const keys = header.split(",");
    await writeFile(
      path.join(directory, `${name}.csv`),
      "\uFEFF" +
        [
          header,
          ...data[name].map((row) =>
            keys.map((key) => cell(row[key])).join(","),
          ),
        ].join("\n"),
    );
  }
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await writeFixtures();
  console.log(`仅用于测试的 CSV：${fixtureDirectory}`);
}
