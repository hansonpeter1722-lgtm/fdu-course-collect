# 交付验收记录

日期：2026-10-28（北京时间）。目标仓库远程：`hansonpeter1722-lgtm/fdu-course-collect`。全部新增实现位于 `web/`，使用七份原始 CSV；未重新抓取、未修改数据或已有 Markdown，未部署、未推送、未创建 PR。已比对 web/ 外 180 个文件的 SHA-256，内容均未改变；仓库原有未提交更改保留。

## 构建与测试

| 命令 / 检查 | 结果 |
| --- | --- |
| `npm install --no-audit --no-fund` | 成功；依赖缓存位于忽略追踪的 `.qa/npm-cache/` |
| `npm run data` | 成功；九份 JSON，全部使用 CSV 实际记录 |
| `ASTRO_TELEMETRY_DISABLED=1 npm run build` | 成功；生成 `web/dist/`，158 个静态页面 |
| `ASTRO_TELEMETRY_DISABLED=1 npm run check` | 0 errors / 0 warnings / 0 hints |
| `npm test` | 六项全部通过 |
| `PUBLIC_BASE_PATH=/fdu-course-collect/` | 隔离测试数据的构建与浏览器验证通过；正式 dist 保留根路径构建 |

Astro CLI 验证禁用遥测，避免写入用户偏好目录。未添加站点统计脚本。单元测试的数据输出位于 `.qa/`，不会覆盖正式 JSON。

## 九份 JSON 的实际数量

| JSON | 条数 |
| --- | ---: |
| courses.json | 150 |
| repos.json | 1,207 |
| exams.json | 3,399 |
| collections.json | 432 |
| collection-files.json | 13,879 |
| schedule.json | 2,040 |
| mapping.json | 150 |
| stats.json | 1 个统计对象 |
| search-docs.json | 6,796 |

仓库关联按 course_id + full_name 去重；本批源表没有重复关联。课程状态为开课 94、合并 24、今年未开课 31、研究生已过滤 1。已覆盖的 87 条开课记录均有本地课程链接；24 条合并课程的目标均可定位。

## 浏览器验收

158 个静态页面的外链 target / rel 属性、所有课程页的三个模块、搜索索引仅出现在搜索页，均已通过生成 HTML 检查。

以下均使用原始 CSV 生成的正式站点进行验证：

- 首页、`/courses/ics/`、`/courses/mathanalysis/`、`/search/`、`/schedule/`、`/exams/`、`/collections/`、`/about/` 可打开；中文 404 在隔离测试站点验证。
- 上述八页在 375px 视口的 documentElement.scrollWidth 均为 375，无横向滚动。
- 课程页正文恰有三个模块：试题、课程资料、代码仓库。表格在 375px 变为卡片，保留语义表头。
- ics 各模块首屏分别为 5 / 30 / 30 行；mathanalysis 为 30 / 25 行，代码模块显示暂无。全部资源表每页最多 30 行。
- 精确搜索 `CS10005`、`MATH120014` 时对应课程第一；中文课名、`snlia/fdu-ics`、完整数学分析试题标题、2026 课名「高级英语」均命中真实结果。
- 搜索页类型切换与 q/type/status/area URL 参数已验证。索引仅在搜索页通过本地静态文件加载。
- 网络试题默认 1,798 条 free / preview；主动开启后 3,399 条。筛选「课程表外」为 2,365 条，不链接到不存在的课程页。
- 合集模块「代码仓库」筛选得到 4,141 条，首屏 30 条，可翻至第 2 / 139 页。
- 开课覆盖状态「课名映射」筛选得到 28 条，可链接本地资料；无对应记录显示「本地未覆盖」。
- 浏览器验证没有记录警告或错误。没有点击外部资料链接或请求 GitHub API。

## 数据适配与已知假设

- 原始 collection_files.csv 模块为「课程材料 / 笔记 / 试题 / 代码仓」。生成 JSON 时统一到「课程资料 / 试题 / 代码仓库」，同时保留 originalModule。统一后分别为 8,213 / 1,525 / 4,141 条，源 CSV 不变。
- 试题中 2,365 条空 course_id 的「课程表外」记录保留在总索引和搜索，未虚构课程或丢弃记录。
- 资料类型优先尊重原始笔记分类，再使用路径中的笔记、课件、作业关键词；其他显示「合集」。合集语言按常见扩展名、年份按路径中的四位年份推断，无法判断时显示未知。
- 多学分字段按分号拆分筛选；搜索课程代码包含本地课号与 2026 覆盖映射课号。合并目标按中文名定位，课名映射优先使用明确的 local_name。
- preview 仅代表可预览，不代表全文或下载免费。paid 和 unknown 明确标注，只作索引。GitHub 链接不承诺可下载或免费。
- 来源与移除请求入口从原仓库 Git remote 推导；LICENSE 原文复制到忽略追踪的 public/LICENSE.txt。外部资料分别适用原作者许可。

## 新增源文件（33 个）

```text
.env.example
.gitignore
.npmrc
README.md
VERIFICATION.md
astro.config.mjs
package.json
package-lock.json
tsconfig.json
scripts/build-data.mjs
scripts/parse-list.mjs
src/components/Controls.tsx
src/components/CourseDirectory.tsx
src/components/DataBrowser.tsx
src/components/ResourceTable.tsx
src/components/Search.tsx
src/layouts/Layout.astro
src/lib/links.ts
src/lib/search.mjs
src/lib/types.ts
src/pages/index.astro
src/pages/courses/index.astro
src/pages/courses/[id].astro
src/pages/search.astro
src/pages/schedule.astro
src/pages/exams.astro
src/pages/collections.astro
src/pages/about.astro
src/pages/404.astro
src/styles/global.css
tests/data.test.mjs
tests/make-fixtures.mjs
tests/search.test.mjs
```

node_modules/、dist/、.astro/、src/data/*.json、public/LICENSE.txt 和 .qa/ 均被 web/.gitignore 忽略，不会随源文件提交。
