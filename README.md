# 复旦课程资料索引 · fdu-course-collect

> 一个按课程组织的复旦公开资料入口。只收集公开链接与元数据，不托管任何仓库内容、课件或试卷正文。

**在线访问：** https://hansonpeter1722-lgtm.github.io/fdu-course-collect/

> 数据整理时间：2026-10-31。课程与资料来自公开 GitHub 仓库；2026 开课数据来自复旦大学教务系统公开查询页。

## 这是什么

GitHub 上有不少复旦课程资料，但散落在几千个仓库里。这个仓库把它们按课程重新组织，做成：

- 150 个课程页，每页只有三个模块：**试题 / 课程资料 / 代码仓库**
- 一个静态网站，支持按课程名、课号、仓库名、试题标题、2026 课名搜索
- 一份 2026 本科开课对映表，标出本地课程是今年开课、已合并到相近课程，还是今年未开

网站是纯静态的，不登录、不追踪、不请求 GitHub API。

## 直接开始

- 在线版：https://hansonpeter1722-lgtm.github.io/fdu-course-collect/
- 课程总览：COURSES.md
- 2026 开课对映：COURSE-MAPPING.md
- 网络试题索引：EXAMS.md
- 合集文件索引：COLLECTIONS.md
- 使用说明：GUIDE.md
- 方法与局限：METHOD.md

## 当前规模

| 项目 | 数量 |
|---|---:|
| 公开 GitHub 仓库（不含 fork） | 4,943 |
| 课程仓库 | 1,207 |
| 课程/主题页 | 150 |
| 合集内文件链接 | 13,879 |
| 合集仓 | 23 |
| 网络试题（清洗后） | 3,399 |
| 2026 本科开课课程 | 2,040 |
| 2026 开课状态：开课 / 合并 / 未开 / 研究生过滤 | 94 / 24 / 31 / 1 |

网络试题中，免费 1,203 条、可预览 595 条、付费/受限 1,573 条、未知 28 条。课程页默认只显示免费和可预览；付费只作索引，不推荐购买。

## 课程页怎么读

每个课程页统一为三个模块：

1. **试题**：GitHub 试题仓库 + 网络试题链接 + 合集里的试卷文件
2. **课程资料**：笔记、复习总结、课件、讲义、作业、实验说明 + 合集里的资料文件
3. **代码仓库**：Lab / PJ / 课程项目代码 + 合集里的代码文件

不再单列“网络试题”或“合集内资源”子段；所有来源并进同一张表。单个合集文件直接链接到 GitHub blob，不链父目录。

## 2026 开课对映

2026-2027 学年 1 学期的本科课表，按以下规则整理：

- 去掉体育、实践、实习、论文、讨论类课程
- 去掉研究生课程
- 去掉 1 学分课程
- 保留本科和本研融通课程

最终 2,040 门课程。与本地 150 门课程对映后：

- 94 门开课（同名或课名映射）
- 24 门今年没有同名课，专业课并入相近本地课程
- 31 门今年未开
- 1 门只有研究生班，已过滤

完整表：

- COURSE-MAPPING.md
- course_mapping_2026.xlsx（3 个工作表）
- data/course_mapping_2026.csv
- data/schedule_course_mapping_2026.csv

注意：2026 课表使用新课程代码体系，本地旧代码只能对上很少一部分，所以对映以课程名为准，不按代码硬匹配。

## 数据文件

| 文件 | 内容 |
|---|---|
| data/courses.csv | 150 门本地课程与 2026 状态 |
| data/course_repos.csv | 1,207 条课程仓库 |
| data/collections.csv | 432 个课程×合集×模块组 |
| data/collection_files.csv | 13,879 条合集文件 |
| data/course_exams.csv | 3,399 条清洗后试题 |
| data/course_mapping_2026.csv | 150 门本地课程对映 |
| data/schedule_course_mapping_2026.csv | 2,040 门 2026 本科课程 |

## 仓库结构

    fdu-course-collect/
    ├── README.md                 本文件
    ├── COURSES.md                课程总览
    ├── COURSE-MAPPING.md         2026 开课对映
    ├── EXAMS.md                  网络试题
    ├── COLLECTIONS.md            合集文件
    ├── GUIDE.md                  使用说明
    ├── METHOD.md                 方法与局限
    ├── DISCLAIMER.md             免责声明与移除请求
    ├── courses/                  150 个课程页
    ├── data/                     结构化 CSV 与对映表
    ├── web/                      Astro 静态网站源码
    └── .github/                  移除请求模板

## 网站构建与部署

网站源码在 web/，构建产物是纯静态文件，部署在 gh-pages 分支。

    cd web
    npm install
    PUBLIC_BASE_PATH=/fdu-course-collect/     PUBLIC_REPOSITORY_URL=https://github.com/hansonpeter1722-lgtm/fdu-course-collect     npm run build

构建后把 web/dist 推到 gh-pages 分支。GitHub Pages 地址：

    https://hansonpeter1722-lgtm.github.io/fdu-course-collect/

## 数据口径与已知局限

- 课程归属、课程资料类型是启发式结果，可能有误；CSV 保留原始标题和描述，建议复核。
- 网络试题原始 8,253 条，清洗后保留 3,399 条；已剔除求助帖、无试题词、课程不匹配和重复项。
- 2026 课表按规则过滤了体育/实践、研究生和 1 学分课程；因此“今年未开”不等于学校绝对没开，可能只是被本表口径过滤。
- 2026 课表中还有 1,953 门课程本地没有对应资料；它们保留在 data/schedule_course_mapping_2026.csv，不强行并入课程页。
- 部分课程今年换了名字，已做名称映射；部分专业课今年停开或只有研究生班，已标注。
- 只覆盖公开 GitHub 仓库；私有、已删除、未被索引的仓库不在范围内。
- GitHub Pages 在国内访问可能不稳定；如需要更快访问，可迁移到 Cloudflare Pages 或国内 OSS/CDN。

## 只收链接，不存内容

- 不复制代码、课件、试卷正文，只保留链接、公开描述、Star、语言等元数据。
- 已对课程页和 CSV 中的联系方式做脱敏；README 保留维护者公开邮箱。
- 被收录仓库和试卷的版权归原作者；本仓库只做索引。
- 非商业使用，协议为 CC BY-NC 4.0，禁止倒卖或付费分发。

## 移除请求

如果你是仓库作者，或被收录试卷的权利人，且不希望内容出现在这里：

- 提交移除请求：https://github.com/hansonpeter1722-lgtm/fdu-course-collect/issues/new?template=removal-request.yml
- 或邮件：hansonpeter1722@gmail.com

不需要说明理由，48 小时内处理。详见 DISCLAIMER.md。

## 致谢

感谢 openFudan/fudan-coursera、jeekzhang/Awesome-Fudan、OpenExamFDU/FDU-csdiy 等前人索引，以及所有愿意把课程资料公开出来的作者。

这份清单不生产内容，只做整理；功劳属于原作者。
