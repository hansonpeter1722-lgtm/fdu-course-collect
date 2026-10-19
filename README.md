# 复旦大学（FDU / Fudan）相关 GitHub 仓库整理报告

> 公开仓库 · 不含 fork · 抓取时间 2026-10-19 · 共 **4943** 个仓库

> ⚠️ **使用限制**：仅限**非商业**用途，**禁止倒卖、禁止付费分发**（[LICENSE](LICENSE)：CC BY-NC 4.0）。
>
> 若你是被收录仓库的作者且不希望被收录，[点此提交移除请求](https://github.com/hansonpeter1722-lgtm/fdu-github-collect/issues/new?template=removal-request.yml) 或邮件 `hansonpeter1722@gmail.com`，**48 小时内移除，不需要理由**。
>
> 本仓库**只搬运链接**、不托管任何仓库内容；被收录仓库本身的任何问题请**直接联系原作者**。详见 [DISCLAIMER.md](DISCLAIMER.md)。
>
> 本清单由**大模型批量筛选**，未能逐一取得 4,943 位作者的授权；如你觉得不妥，[告诉我，立刻删](#关于方法与授权请先看这一节)。

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

### 关于授权

> 这些仓库都是公开的，但**「公开」不等于「授权转载」**。受时间和条件限制，我没有、也无法逐一联系 4,943 位作者取得许可。

我能做到的只有四条：**只摘录公开的描述与元数据**、**不复制任何代码和文档内容**、**对个人信息做脱敏**、**随时准备删除**。

所以——

> **如果任何一位作者觉得自己的仓库出现在这里不妥，不需要理由，也不必和我讨论「这算不算公开数据」。提个 Issue 或发邮件，我看到就删，48 小时内处理完。**

这份整理没有任何商业目的，也不接受任何形式的付费转载或倒卖。如果它给你带来了困扰，那就是它做错了，删掉就好。

## 摘要

本仓库整理了 GitHub 上名称、所有者、描述或 topics 含 fdu / fudan 的公开仓库，并做了分类：

- **课程学习资料 1611 个**：其中 **1028 个归入 69 门课程/主题**，另有 **583 个**确认是学习资料但未能定位具体课程；
- **通用大仓 42 个**：跨课程资源合集、Awesome 清单、共享笔记库；
- **其他 3290 个**：科研项目、工具、个人项目、信息不足、无关仓库，均附一句话简介。

**本清单不生产内容**：所有代码、讲义、笔记都在原仓库里，这里只是一份索引，功劳属于各仓库的作者。

README 覆盖 2781 / 4943。分类为启发式结果，详见 [METHOD.md](METHOD.md)。

## 分类统计

| 类别 | 数量 | 说明 |
| --- | ---: | --- |
| 课程学习资料 | 1611 | 已归入 69 门课程 1028 个；未识别具体课程 583 个 |
| 通用大仓 | 42 | 跨课程资源合集、Awesome 清单、共享资料库 |
| 其他 | 3290 | 科研 / 工具 / 个人 / 信息不足 / 无关 |
| **合计** | **4943** | 去重后的公开仓库 |

### 其他仓库细分

| 子类 | 数量 | 文件 |
| --- | ---: | --- |
| 个人项目 | 2015 | [个人项目](others/个人项目.md) |
| 信息不足 | 479 | [信息不足](others/信息不足.md) |
| 科研项目 | 395 | [科研项目](others/科研项目.md) |
| 工具/网站/模板 | 244 | [工具/网站/模板](others/工具-网站-模板.md) |
| 无关/低相关 | 157 | [无关/低相关](others/无关-低相关.md) |

## 课程索引

| # | 课程/主题 | 仓库数 | 文件 |
| ---: | --- | ---: | --- |
| 1 | 计算机系统基础（ICS） | 109 | [计算机系统基础（ICS）](courses/计算机系统基础-ICS.md) |
| 2 | 数据库 | 74 | [数据库](courses/数据库.md) |
| 3 | 程序设计 | 71 | [程序设计](courses/程序设计.md) |
| 4 | Web 开发 | 69 | [Web 开发](courses/Web-开发.md) |
| 5 | 深度学习 | 60 | [深度学习](courses/深度学习.md) |
| 6 | 操作系统 | 44 | [操作系统](courses/操作系统.md) |
| 7 | 人工智能 | 42 | [人工智能](courses/人工智能.md) |
| 8 | 计算机视觉 | 41 | [计算机视觉](courses/计算机视觉.md) |
| 9 | 机器学习 | 39 | [机器学习](courses/机器学习.md) |
| 10 | 数据结构 | 38 | [数据结构](courses/数据结构.md) |
| 11 | 算法设计与分析 | 35 | [算法设计与分析](courses/算法设计与分析.md) |
| 12 | 数据科学 | 35 | [数据科学](courses/数据科学.md) |
| 13 | 编译原理 | 35 | [编译原理](courses/编译原理.md) |
| 14 | 软件工程 | 32 | [软件工程](courses/软件工程.md) |
| 15 | 计算机图形学 | 30 | [计算机图形学](courses/计算机图形学.md) |
| 16 | 模式识别与机器学习（PRML） | 27 | [模式识别与机器学习（PRML）](courses/模式识别与机器学习-PRML.md) |
| 17 | 计算机网络 | 25 | [计算机网络](courses/计算机网络.md) |
| 18 | 数据挖掘 | 20 | [数据挖掘](courses/数据挖掘.md) |
| 19 | 计算机体系结构 | 17 | [计算机体系结构](courses/计算机体系结构.md) |
| 20 | 自然语言处理（NLP） | 17 | [自然语言处理（NLP）](courses/自然语言处理-NLP.md) |
| 21 | 大数据 | 15 | [大数据](courses/大数据.md) |
| 22 | 数据可视化 | 11 | [数据可视化](courses/数据可视化.md) |
| 23 | 数字图像处理 | 9 | [数字图像处理](courses/数字图像处理.md) |
| 24 | 数字逻辑 | 9 | [数字逻辑](courses/数字逻辑.md) |
| 25 | 高级 Web 技术 | 9 | [高级 Web 技术](courses/高级-Web-技术.md) |
| 26 | 分布式系统 | 8 | [分布式系统](courses/分布式系统.md) |
| 27 | 机器人学 | 6 | [机器人学](courses/机器人学.md) |
| 28 | 多模态 | 4 | [多模态](courses/多模态.md) |
| 29 | 学术讲座/研讨 | 6 | [学术讲座/研讨](courses/学术讲座-研讨.md) |
| 30 | 电路 | 6 | [电路](courses/电路.md) |
| 31 | 计算物理 | 6 | [计算物理](courses/计算物理.md) |
| 32 | 项目管理 | 5 | [项目管理](courses/项目管理.md) |
| 33 | 软件测试 | 5 | [软件测试](courses/软件测试.md) |
| 34 | 医学 | 5 | [医学](courses/医学.md) |
| 35 | 程序分析 | 4 | [程序分析](courses/程序分析.md) |
| 36 | 区块链 | 4 | [区块链](courses/区块链.md) |
| 37 | 计算机组成原理 | 4 | [计算机组成原理](courses/计算机组成原理.md) |
| 38 | 嵌入式系统 | 3 | [嵌入式系统](courses/嵌入式系统.md) |
| 39 | 经济学 | 3 | [经济学](courses/经济学.md) |
| 40 | 知识图谱 | 3 | [知识图谱](courses/知识图谱.md) |
| 41 | 线性代数 | 3 | [线性代数](courses/线性代数.md) |
| 42 | 新闻传播 | 2 | [新闻传播](courses/新闻传播.md) |
| 43 | 信息安全 | 3 | [信息安全](courses/信息安全.md) |
| 44 | 强化学习 | 1 | [强化学习](courses/强化学习.md) |
| 45 | 随机过程 | 2 | [随机过程](courses/随机过程.md) |
| 46 | 密码学 | 2 | [密码学](courses/密码学.md) |
| 47 | 大学物理 | 2 | [大学物理](courses/大学物理.md) |
| 48 | 高等代数 | 2 | [高等代数](courses/高等代数.md) |
| 49 | 语音识别 | 2 | [语音识别](courses/语音识别.md) |
| 50 | 思政 | 2 | [思政](courses/思政.md) |
| 51 | 生物学 | 1 | [生物学](courses/生物学.md) |
| 52 | 概率论 | 2 | [概率论](courses/概率论.md) |
| 53 | 离散数学 | 2 | [离散数学](courses/离散数学.md) |
| 54 | 数字信号处理 | 2 | [数字信号处理](courses/数字信号处理.md) |
| 55 | 游戏设计与开发 | 1 | [游戏设计与开发](courses/游戏设计与开发.md) |
| 56 | 复变函数 | 1 | [复变函数](courses/复变函数.md) |
| 57 | 语言学导论 | 1 | [语言学导论](courses/语言学导论.md) |
| 58 | 图论 | 1 | [图论](courses/图论.md) |
| 59 | 生成式 AI | 1 | [生成式 AI](courses/生成式-AI.md) |
| 60 | 人机交互 | 1 | [人机交互](courses/人机交互.md) |
| 61 | 计算机软件基础 | 1 | [计算机软件基础](courses/计算机软件基础.md) |
| 62 | 并行计算 | 1 | [并行计算](courses/并行计算.md) |
| 63 | 高等数学 | 1 | [高等数学](courses/高等数学.md) |
| 64 | 数学建模 | 1 | [数学建模](courses/数学建模.md) |
| 65 | 材料物理 | 1 | [材料物理](courses/材料物理.md) |
| 66 | 云计算 | 1 | [云计算](courses/云计算.md) |
| 67 | 信息检索 | 1 | [信息检索](courses/信息检索.md) |
| 68 | 医学图像处理 | 1 | [医学图像处理](courses/医学图像处理.md) |
| 69 | 数值分析 | 1 | [数值分析](courses/数值分析.md) |
| 70 | 未识别具体课程 | 583 | [未识别具体课程](courses/未识别具体课程.md) |

## 通用大仓

共 42 个，详见 [general.md](general.md)。代表仓库：[openFudan/fudan-coursera](https://github.com/openFudan/fudan-coursera)、[jeekzhang/Awesome-Fudan](https://github.com/jeekzhang/Awesome-Fudan)、[Snivallus/FDU-Course-Notes-2024-2025](https://github.com/Snivallus/FDU-Course-Notes-2024-2025)、[ForeverHaibara/Fudan-Courses](https://github.com/ForeverHaibara/Fudan-Courses)、[Su-Zi-Zhan/FDU-SDS-Lecture-Notes](https://github.com/Su-Zi-Zhan/FDU-SDS-Lecture-Notes)。

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

- 数据来自 GitHub 官方 API 的只读请求；单查询上限 1,000 条，按 stars + 创建年份分区翻页枚举。
- 去重按 repository id；默认排除 fork；仅覆盖公开仓库。
- 分类规则、覆盖缺口与已知误判详见 [METHOD.md](METHOD.md)。

## 数据文件

- [repos_raw.csv](data/repos_raw.csv)：全部仓库原始元数据（描述、topics、语言、时间等）。
- [复旦相关仓库分类清单.csv](data/复旦相关仓库分类清单.csv)：分类结果，可直接用 Excel 筛选。

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
