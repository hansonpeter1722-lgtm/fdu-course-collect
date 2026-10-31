# 复旦课程资料索引 · 静态网站

Astro + TypeScript + Tailwind CSS，搜索、筛选和分页使用独立 React islands。无后端、数据库、SSR 或 API routes；不会请求 GitHub API，不会抓取外部资料。未使用外部字体、图片、统计脚本或官方校徽。

## 放置位置与启动

将整个 `web/` 放在 `fdu-course-collect/` 根目录，和已有的 `data/` 同级。

```text
fdu-course-collect/
  data/                 # 原仓库的七份 CSV，只读
  LICENSE               # 若存在，构建时复制到 web/public/LICENSE.txt
  web/
```

需要 Node.js 22.12+。在 `web/` 下执行：

```sh
npm install
npm run data
npm run check
npm run build
npm run preview
```

在限制用户目录写入的沙箱环境中，运行 Astro 命令前可设置 `export ASTRO_TELEMETRY_DISABLED=1`，避免 Astro CLI 写入用户偏好目录。本次验证使用该设置，未修改系统目录。

开发使用 `npm run dev`。`dev` 与 `build` 都先执行数据转换；CSV 改动后需重新启动或重新构建。`preview` 仅预览已生成的静态 `dist/`。首次转换可运行 `node scripts/build-data.mjs --inspect` 查看七份 CSV 的表头、实际行数和前三条记录。

子路径构建示例：

```sh
PUBLIC_BASE_PATH=/fdu-course-collect/ npm run build
```

可设置 `PUBLIC_REPOSITORY_URL=https://github.com/实际所有者/fdu-course-collect`。未设置时脚本尝试从父仓库 Git remote 读取；该值用于数据来源和移除请求入口。如果缺少来源地址或 LICENSE，关于页会明确说明，不编造仓库、联系人或许可。这里的变量通过命令行或 shell 环境传入；`.env.example` 仅作为说明。

## 页面

- `/` 首页与课程目录
- `/courses/` 课程总览
- `/courses/[id]/` 静态课程页，三个模块：试题、课程资料、代码仓库
- `/search/` 全局搜索，索引仅在此页通过本地静态资源懒加载
- `/schedule/` 2026 本科开课筛选
- `/exams/` 网络试题索引，默认免费公开与可预览
- `/collections/` 合集文件分页
- `/about/` 数据来源、口径、免责声明、移除请求和 LICENSE
- `/404.html` 中文 404；托管平台需自行配置静态 404

没有整站 SPA 路由。直接访问课程页即可读到 HTML。课程、试题及文件表按每页 30 条渲染，375px 下变为卡片。大型列表加载本地构建数据，不向 GitHub 或其他原始资源站点发出后台请求；外链只在用户点击时打开。

## 生成数据与口径

`scripts/build-data.mjs` 只读 `../data/`，使用 `csv-parse` 和指定参数，写入 `src/data/` 中九个忽略追踪的 JSON：

| JSON | 数据行口径 |
| --- | --- |
| courses | courses.csv 实际记录 |
| repos | course_repos.csv 按 course_id + full_name 去重 |
| exams | course_exams.csv 全部记录，保留获取方式 |
| collections | collections.csv 实际分组记录 |
| collection-files | collection_files.csv 实际文件记录，不累加 file_count |
| schedule | schedule_course_mapping_2026.csv 实际课程记录 |
| mapping | course_mapping_2026.csv 实际映射记录 |
| stats | 1 个统计对象，含构建时间、状态数量和来源元数据 |
| search-docs | courses + 去重 repos + exams + schedule |

`tags` 和 `tech` 使用安全列表解析，不执行字符串。课程状态以 CSV 为准，并核验两个课程表中的状态一致性。无效外链会禁用，不允许 `javascript:` 等协议。React 渲染纯文本，不使用原始 HTML 注入。

课程资料类型通过仓库 resource_type，以及文件路径中的「笔记 / note」「课件 / slide / lecture」「作业 / homework / assignment」识别；其他文件标为「合集」。代码语言优先使用仓库 language；合集文件只按常见扩展名推断。文件年份仅显示路径内明确的四位年份。以上是展示启发式，不修改 CSV。

开课映射优先按 local_name，再按 schedule_name 与本地课程映射解析。合并目标按课程中文名匹配；若没有对应本地 ID，只显示 CSV 原文。课程页不默认展示 paid 和 unknown；可到网络试题总索引主动开启。GitHub 仓库只标为「公开链接 · 以原站为准」，不承诺内容可下载或免费。

## 验证

```sh
npm test
```

测试覆盖：列表解析、去重、动态统计、获取方式、课程映射、缺失数据报错、精确课号排序、四种搜索目标和中文 2-gram 回退。测试只在 `web/.qa/` 生成隔离的虚构数据，不能作为真实课程数据发布。

已用仓库的七份真实 CSV 构建九份 JSON 和 158 个静态页面，详细验收结果见 `VERIFICATION.md`。测试数据始终留在 `.qa/`，正式 `src/data/` 与 `dist/` 使用真实数据。

原始 `collection_files.csv` 的模块实际使用「试题 / 课程材料 / 笔记 / 代码仓」。前端在生成 JSON 时统一成三个展示模块，保留 originalModule，不修改 CSV。试题 CSV 中空 course_id 的「课程表外」记录保留在试题总索引和全局搜索中，不虚构课程页；课程筛选提供「课程表外」。搜索课程代码同时包含本地课号和 2026 覆盖映射课号。

内部测试可以显式执行 `node tests/make-fixtures.mjs` 后用 `WEB_DATA_DIR="$PWD/.qa/fixtures" npm run build`，但不能把这个测试站点作为正式输出。测试完成后执行普通 `npm run build` 恢复真实数据。`WEB_DATA_OUTPUT_DIR` 可将转换结果写入隔离目录，`npm test` 不会覆盖正式 JSON。

`node_modules/`、`dist/`、`.astro/`、生成 JSON、复制的 LICENSE、`.qa/` 和 npm 缓存均已忽略。只需提交 `web/` 下未被忽略的源文件和 package-lock.json。本项目未部署、未推送、未创建 PR。
