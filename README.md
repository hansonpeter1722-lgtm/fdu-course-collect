# 复旦大学（FDU / Fudan）相关 GitHub 仓库整理报告

> 公开仓库 · 不含 fork · 抓取时间 2026-10-19 · 共 **4943** 个仓库

> ⚠️ **使用限制**：仅限**非商业**用途，**禁止倒卖、禁止付费分发**（[LICENSE](LICENSE)：CC BY-NC 4.0）。
>
> 若你是被收录仓库的作者且不希望被收录，[点此提交移除请求](https://github.com/hansonpeter1722-lgtm/fdu-github-collect/issues/new?template=removal-request.yml) 或邮件 `hansonpeter1722@gmail.com`，**48 小时内移除，不需要理由**。
>
> 本仓库**只搬运链接**、不托管任何仓库内容；被收录仓库本身的任何问题请**直接联系原作者**。详见 [DISCLAIMER.md](DISCLAIMER.md)。
>
> 本清单由**大模型批量筛选**，未能逐一取得 4,943 位作者的授权；如你觉得不妥，[告诉我，立刻删](#关于方法与授权请先看这一节)。

📄 **只想要试题？** → [EXAMS.md](EXAMS.md)（1034 条按课程归类的真实试题，已剔除求助帖）

📖 **第一次来？先看 [使用说明](GUIDE.md)**：怎么按课程查、两个 CSV 的字段含义、常见问题。

## 关于方法与授权（请先看这一节）

### 为什么做这个

GitHub 上跟复旦有关的内容很多，但散落在成千上万个仓库里，没有一个统一的入口。

想找某门课的资料，通常只能靠搜索框。而 GitHub 的搜索主要看仓库名和描述——**不少内容其实做得很扎实，只是名字用了缩写、描述只有一句话、也没打标签，就沉在结果列表后面，翻几页都翻不到**。

这不是谁的问题：仓库名和描述本来就是写给自己看的，没有人有义务为了"被搜到"去改自己的习惯。

结果就是，刚接触 GitHub 的同学往往搜两下就放弃了，明明有好东西，却不知道往哪儿找。

所以我起了这个念头：借现在的大模型，把复旦相关的内容整个翻一遍，尽量筛出真正有用的部分，至少给后来的人一个能按课程翻的入口，不用从零开始一个个试。

### 前面已经有人做过

这份清单不是凭空来的。在我之前，已经有不少人做过索引，我能做的只是在他们之后多翻了一遍：

- [openFudan/fudan-coursera](https://github.com/openFudan/fudan-coursera) —— 复旦课程资源合集，900+ star，最早的一批
- [jeekzhang/Awesome-Fudan](https://github.com/jeekzhang/Awesome-Fudan) —— 复旦计算机课程仓库清单
- [OpenExamFDU/FDU-csdiy](https://github.com/OpenExamFDU/FDU-csdiy) —— 复旦 CS 自学指南
- 以及 `courses/` 里那 1,600 多个仓库的作者，和所有愿意把课程资料公开出来的学长学姐

我的工作只是把已有的链接换了个方式排一遍：分类、去重、做成表格。**没有新内容，也没有新知识**，无非是花了一点时间，刚好赶上大模型能替我读几千个 README。

所以——

> 如果你觉得这份清单有用，功劳是这些仓库作者的，也是前面那些做过索引的人的；如果它有问题、有错漏，那是我整理得不好，与原作者无关。

### 但这件事有两面

我清楚这样做会给一些仓库的作者带来困扰：自己的仓库被陌生人整理、被放进一张表里，哪怕内容本来就是公开的，心里也可能不舒服。

**就像我自己做这个仓库，也不希望把自己的个人信息留在里面**——所以这种感受我完全理解。

希望同学们能多多理解、多多包容。如果你不希望自己的仓库出现在这里，说一声就行，我立刻删，不问理由。

### 怎么做的

**这份清单是用大模型（DeepSeek）批量筛出来的，不是人工逐个读过 4,943 个仓库。**

做法是把每个仓库的名称、描述和 README 摘要交给模型，让它判断「是不是复旦相关」「属于哪门课」，再用关键词规则复核一遍。好处是能在有限时间里覆盖全量，代价也很清楚：

- **分类一定会有错**，也一定有你不同意的判断；
- **描述不一定准确**，模型可能被措辞误导，把 A 课的作业放进 B 课。

### 为什么要用大模型，以及怎么维护

做这件事最大的成本不是抓取，是“读”。4,943 个仓库的描述、2,781 个 README，纯人工读一遍要几个月，而且读完就开始过期。

大模型把这一步压到了几小时：批量读、批量分类、批量生成表格。**不是为了显得先进，是因为不这么做就做不完。**

维护同理。这份清单没有服务器、没有数据库，只有一个仓库加一套脚本：

- **每天自动巡检一次** issue 与 PR（本机在线时运行），只有真的有人提反馈时才需要我动手；
- 没人提，就是**零操作**；有移除请求，删一行、同步一次统计，几分钟的事。

目标很朴素：**把维护成本压到“一个人每周花几分钟”**。只有这样它才可能活过两年，否则就会变成前面说的那种“毕业即弃坑”的仓库。

也要说清楚自动化做不到什么：它只能告诉我“有人提了请求”，**该不该删、删哪一行、统计怎么同步，仍然要人来判断**。别指望它自己维护自己。

### 关于授权

> 这些仓库都是公开的，但**「公开」不等于「授权转载」**。受时间和条件限制，我没有、也无法逐一联系 4,943 位作者取得许可。

我能做到的只有四条：**只摘录公开的描述与元数据**、**不复制任何代码和文档内容**、**对个人信息做脱敏**、**随时准备删除**。

所以——

> **如果任何一位作者觉得自己的仓库出现在这里不妥，不需要理由，也不必和我讨论「这算不算公开数据」。提个 Issue 或发邮件，我看到就删，48 小时内处理完。**

这份整理没有任何商业目的，也不接受任何形式的付费转载或倒卖。如果它给你带来了困扰，那就是它做错了，删掉就好。

## 摘要

本次重构把重心放在**课程**：用仓库中出现的真实课程代码（COMP / DATA / CS / SOFT / MATH / MICR 等）与课程名做映射，课程页内按 **试题 / 笔记 / 课程材料 / 代码仓** 分类；代码仓附一句话介绍。

全量仍是 **4,943** 个公开仓库，分成三块：

- **课程仓库 1,194 个**，归入 **89** 门课程/主题（试题 7 · 笔记 28 · 课程材料 187 · 代码仓 972）
- **非课程 3,707 个**：个人项目 2,015 · 信息不足 479 · 科研项目 395 · 工具/网站/模板 244 · 无关/低相关 157 · 待归类 417
- **通用大仓 42 个**：跨课程合集、Awesome 清单
- **合集内资源 5633 个文件链接**：来自 14 个合集仓，按四个模块并入课程页（见 COLLECTIONS.md）

## 入口

- **[课程总览（按领域 + 课程代码）](COURSES.md)** ← 推荐从这里开始
- [合集内资源（按模块）](COLLECTIONS.md)
- [通用大仓（跨课程合集）](general.md)
- 非课程：[个人项目](others/个人项目.md) · [科研项目](others/科研项目.md) · [工具/网站/模板](others/工具-网站-模板.md) · [信息不足](others/信息不足.md) · [无关/低相关](others/无关-低相关.md) · [待归类](others/非课程与待归类.md)
- [使用说明](GUIDE.md) · [方法与局限](METHOD.md) · [声明与免责](DISCLAIMER.md)

## 课程仓库数 Top 15

| 课程 | 代码 | 仓库数 |
| --- | --- | ---: |
| [计算机系统基础](courses/计算机系统基础.md) | CS10005 / COMP130201 | 114 |
| [程序设计](courses/程序设计.md) | COMP120006 / CS10004 | 86 |
| [神经网络与深度学习](courses/神经网络与深度学习.md) | DATA130011 / SOFT130085 | 83 |
| [数据库系统引论](courses/数据库系统引论.md) | COMP130010 | 73 |
| [Web 开发](courses/Web-开发.md) | — | 72 |
| [人工智能](courses/人工智能.md) | COMP130207 / DATA130008 / COMP130031 | 50 |
| [操作系统](courses/操作系统.md) | COMP130110 | 50 |
| [计算机视觉](courses/计算机视觉.md) | COMP130124 / CS50028 | 46 |
| [机器学习](courses/机器学习.md) | COMP130172 / INFO130342 / DATA130003 | 44 |
| [编译原理](courses/编译原理.md) | COMP130014 / SOFT130061 | 40 |
| [数据结构](courses/数据结构.md) | COMP130004 / DATA130023 | 39 |
| [软件工程](courses/软件工程.md) | COMP130015 / SOFT130006 | 38 |
| [计算机图形学](courses/计算机图形学.md) | COMP130018 / SOFT130062 | 35 |
| [算法设计与分析](courses/算法设计与分析.md) | COMP130011 / INFO130057 | 31 |
| [自然语言处理导论](courses/自然语言处理导论.md) | COMP130141 / DATA130030 / COMP130199 | 31 |

## 分类统计

| 类别 | 数量 |
| --- | ---: |
| 课程仓库（89 门） | 1,194 |
| 　试题 | 7 |
| 　笔记 | 27 |
| 　课程材料 | 187 |
| 　代码仓 | 973 |
| 非课程 · 个人项目 | 2,015 |
| 非课程 · 信息不足 | 479 |
| 非课程 · 科研项目 | 395 |
| 非课程 · 工具/网站/模板 | 244 |
| 非课程 · 无关/低相关 | 157 |
| 非课程 · 待归类 | 417 |
| 通用大仓 | 42 |
| **合计** | **4,943** |

## 高星仓库 Top 20

| 仓库 | Star | 分类 | 简介 |
| --- | ---: | --- | --- |
| [OpenMOSS/MOSS](https://github.com/OpenMOSS/MOSS) | 12,278 | 其他 | An open-source, tool-augmented conversational language model from Fudan University |
| [fudan-generative-vision/hallo](https://github.com/fudan-generative-vision/hallo) | 8,671 | 其他 | Hallo: Hierarchical Audio-Driven Visual Synthesis for Portrait Image Animation |
| [fudan-generative-vision/champ](https://github.com/fudan-generative-vision/champ) | 4,264 | 其他 | (ECCV 2024) Champ: Controllable and Consistent Human Image Animation with 3D Parametric Gu |
| [fudan-generative-vision/hallo2](https://github.com/fudan-generative-vision/hallo2) | 3,749 | 其他 | (ICLR 2025) Hallo2: Long-Duration and High-Resolution Audio-driven Portrait Image Animatio |
| [adrianlopezroche/fdupes](https://github.com/adrianlopezroche/fdupes) | 3,029 | 其他 | FDUPES is a program for identifying or deleting duplicate files residing within specified |
| [fudan-zvg/Semantic-Segment-Anything](https://github.com/fudan-zvg/Semantic-Segment-Anything) | 2,303 | 其他 | Automated dense category annotation engine that serves as the initial semantic labeling fo |
| [fudan-generative-vision/hallo3](https://github.com/fudan-generative-vision/hallo3) | 1,417 | 其他 | (CVPR 2025) Hallo3: Highly Dynamic and Realistic Portrait Image Animation with Video Diffu |
| [wangyi-fudan/wyhash](https://github.com/wangyi-fudan/wyhash) | 1,149 | 其他 | The FASTEST QUALITY hash function, random number generators (PRNG) and hash map |
| [fudan-zvg/SETR](https://github.com/fudan-zvg/SETR) | 1,109 | 其他 | (CVPR 2021 & IJCV 2024) Rethinking Semantic Segmentation from a Sequence-to-Sequence Persp |
| [fudan-zvg/4d-gaussian-splatting](https://github.com/fudan-zvg/4d-gaussian-splatting) | 1,047 | 其他 | (ICLR 2024) Real-time Photorealistic Dynamic Scene Representation and Rendering with 4D Ga |
| [stone-zeng/fduthesis](https://github.com/stone-zeng/fduthesis) | 1,045 | 其他 | LaTeX thesis template for Fudan University |
| [openFudan/fudan-coursera](https://github.com/openFudan/fudan-coursera) | 935 | 通用大仓 | 复旦大学课程资源（计算机专业的课程已全部上传~） |
| [fudan-generative-vision/dynamicPDB](https://github.com/fudan-generative-vision/dynamicPDB) | 788 | 其他 | (AAAI 2025) Dynamic Protein Data Bank |
| [ChenxinAn-fdu/POLARIS](https://github.com/ChenxinAn-fdu/POLARIS) | 697 | 其他 | Scaling RL on advanced reasoning models |
| [fudan-generative-vision/DicFace](https://github.com/fudan-generative-vision/DicFace) | 465 | 其他 | (ICCV2025 Highlight) DicFace: Dirichlet-Constrained Variational Codebook Learning for Temp |
| [FudanVI/FudanOCR](https://github.com/FudanVI/FudanOCR) | 438 | 其他 | A toolbox of scene text super-resolution and recognition |
| [DanXi-Dev/DanXi](https://github.com/DanXi-Dev/DanXi) | 430 | 其他 | (Windows / Mac / Linux / Android / iOS) Maybe the best all-rounded service app for Fudan U |
| [jeekzhang/Awesome-Fudan](https://github.com/jeekzhang/Awesome-Fudan) | 381 | 通用大仓 | Awesome-Fudan: a code repository list of computer courses at Fudan University |
| [fudan-generative-vision/WAM-Flow](https://github.com/fudan-generative-vision/WAM-Flow) | 371 | 其他 | (CVPR 2026) WAM-Flow: Parallel Coarse-to-Fine Motion Planning via Discrete Flow Matching f |
| [fudan-zvg/SeaFormer](https://github.com/fudan-zvg/SeaFormer) | 369 | 其他 | (ICLR 2023 & IJCV 2025) SeaFormer: Squeeze-enhanced Axial Transformer |

## 方法与局限

- 课程目录基于复旦教务处 2022 本科教学培养方案，并交叉核对 FDU-csdiy、Awesome-Fudan、FDUCSLG 课程站与仓库内出现的课号。
- 课程归属优先用真实课程代码，其次课程名/别名，最后用原有课程组兜底；非课程内容按考试、工具、科研、个人项目等分类。
- 课程页内按标题/描述/README 判定「试题 / 笔记 / 课程材料 / 代码仓」；代码仓附一句自动简介。
- 全量与局限详见 [METHOD.md](METHOD.md)。

## 数据文件

- [courses.csv](data/courses.csv)：课程目录与各类型数量
- [course_repos.csv](data/course_repos.csv)：课程仓库明细（类型/年份/技术栈/简介）
- [repos_raw.csv](data/repos_raw.csv)：全量原始元数据（旧版字段，保留）
- [复旦相关仓库分类清单.csv](data/复旦相关仓库分类清单.csv)：旧版分类清单（保留）

## 说明

- 仓库链接均为抓取时的 GitHub 地址，后续可能改名或删除。
- 发布前已对描述中的邮箱、学号、身份证号等个人信息做脱敏；另有 2 个仓库名本身含明文访问令牌，令牌已隐去。详见 [METHOD.md](METHOD.md#隐私处理发布前已执行)。
- 分类为启发式结果，建议结合原始描述复核；欢迎提交 PR 修正。

## 许可与声明

| 项目 | 说明 |
| --- | --- |
| 整理成果 | [CC BY-NC 4.0](LICENSE)：可转载但须署名，**禁止商业使用、禁止倒卖** |
| 被收录仓库 | 版权归各原作者，遵守其原有 LICENSE，本仓库不主张任何权利 |
| 移除请求 | 提 Issue 或邮件 `hansonpeter1722@gmail.com`，核实后 48 小时内移除 |
| 内容问题 | 本仓库只收集链接，代码/资料本身的问题请找**原仓库作者** |

完整条款见 [DISCLAIMER.md](DISCLAIMER.md)。
