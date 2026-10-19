# 使用说明

[返回总览](README.md) · [方法与局限](METHOD.md) · [声明与免责](DISCLAIMER.md)

这份文档讲三件事：**这堆文件怎么用**、**每个字段是什么意思**、**遇到问题先看哪里**。

---

## 一、这个仓库能帮你做什么

| 场景 | 用法 | 入口 |
| --- | --- | --- |
| 想找某门课的往年资料、作业、项目 | 按课程名翻对应页面 | [README 课程索引](README.md#课程索引) → `courses/xx.md` |
| 想找某个关键词相关的仓库（如「编译原理」「强化学习」「选课脚本」） | 仓库内搜索或本地 grep | 见下方「按关键词查」 |
| 想做统计分析（星级、语言、年份分布） | 用 Excel / pandas 打开 CSV | `data/` 目录 |
| 想知道某个仓库靠不靠谱 | 点链接进原仓库看 star、更新时间、README | 表格里的链接 |

> 本仓库**只收链接和元数据**，不存代码、不存课件。所有实质内容都在原仓库里。

---

## 二、目录结构

```
fdu-github-collect/
├── README.md          总览：分类统计、69 门课程索引、高星 Top 20
├── GUIDE.md           本文件
├── METHOD.md          抓取方式、分类规则、已知局限、隐私处理
├── DISCLAIMER.md      使用条款、作者移除请求、免责声明
├── LICENSE            CC BY-NC 4.0（禁止商用与倒卖）
├── general.md         42 个「通用大仓」：跨课程合集、Awesome 清单
├── courses/           70 个文件 = 69 门课程 + 1 个「未识别具体课程」
├── others/            5 个文件 = 个人项目 / 科研项目 / 工具网站模板 / 信息不足 / 无关
└── data/
    ├── repos_raw.csv                原始元数据（19 列，字段最全）
    └── 复旦相关仓库分类清单.csv        分类结果（9 列，带类别与课程）
```

---

## 三、怎么查

### 3.1 按课程查（最常用）

打开 [README 的课程索引](README.md#课程索引)，按仓库数从多到少排列，点课程名进入对应页面。每个页面是一张表：

| 仓库 | Star | 语言 | 简介 |
| --- | ---: | --- | --- |
| [cccchyj/Data_Structure_2025Fa](https://github.com/cccchyj/Data_Structure_2025Fa) | 7 | C++ | ... |

表格按 Star 降序，Star 相同按仓库名排。页面顶部有「共 N 个仓库」和返回总览的链接。

### 3.2 按关键词查

**在 GitHub 网页里**（推到 GitHub 后可用）：

```
repo:hansonpeter1722-lgtm/fdu-github-collect 操作系统
```

**在本地命令行里**（克隆下来之后）：

```bash
# 在所有课程页里找含「数据库」的行
grep -rn "数据库" courses/

# 只看某个关键词命中的仓库名
grep -rhoE "\[[^]]+\]\(https://github.com/[^)]+\)" courses/ | sort -u | head
```

### 3.3 按条件筛（CSV）

用 Excel / WPS 直接打开 `data/复旦相关仓库分类清单.csv`（**带 UTF-8 BOM，双击不会乱码**），开启筛选后：

- 看某门课：`课程/子类` = 课程名
- 看某一类：`类别` = 课程学习资料 / 通用大仓 / 其他
- 找高星：`Star` 降序
- 找某语言：`语言` 筛选

用 pandas：

```python
import pandas as pd
df = pd.read_csv("data/复旦相关仓库分类清单.csv", encoding="utf-8-sig")
df[df["课程/子类"] == "数据库"].sort_values("Star", ascending=False).head(10)
```

---

## 四、字段说明

### 4.1 `data/repos_raw.csv`（原始元数据，19 列，4,943 行）

| 字段 | 含义 | 备注 |
| --- | --- | --- |
| `id` | GitHub 仓库数字 ID | 去重依据 |
| `full_name` | `owner/repo` | 唯一键 |
| `html_url` | 仓库地址 | |
| `owner_login` | 所有者账号 | |
| `owner_type` | `User` / `Organization` | 4,261 / 682 |
| `description` | 仓库原始描述 | **完整，未截断**，最长 1,002 字符；1,766 个为空（GitHub 上作者未填写） |
| `topics` | 仓库 topics | 分号分隔，如 `fdupes;linux-packages` |
| `stars` / `forks` | 抓取时的星标 / fork 数 | 快照值 |
| `language` | 主要语言 | GitHub 判定 |
| `fork` | 是否 fork | 本次全部为 `False`（已排除） |
| `archived` | 是否已归档 | 90 个为 `True` |
| `created_at` / `pushed_at` / `updated_at` | 创建 / 最近推送 / 元数据更新 | ISO 8601 UTC |
| `size_kb` | 仓库体积（KB） | |
| `license` | SPDX 许可标识 | 4,018 个未声明 |
| `homepage` | 仓库主页 | 多为空 |
| `sources` | 命中检索词的方式 | `fdu-name` / `fudan-name` / `fdu-desc` / `fudan-desc` 的组合，分号分隔 |

### 4.2 `data/复旦相关仓库分类清单.csv`（分类结果，9 列，4,943 行）

| 字段 | 含义 | 备注 |
| --- | --- | --- |
| `类别` | 课程学习资料 / 通用大仓 / 其他 | 1,611 / 42 / 3,290 |
| `课程/子类` | 课程名或「其他」下的子类 | 共 76 种取值 |
| `仓库` | `owner/repo` | |
| `链接` | 仓库地址 | |
| `Star` / `语言` | 同原始表 | |
| `简介` | **截断到 90 字符**的简介 | 表格排版用，可能断在单词中间；1,766 个 GitHub 无描述的仓库中，有 790 个用 README 提取的内容补上了 |
| `描述` | 完整描述 | 需要全文时用这一列 |
| `更新时间` | 最近一次 push 时间 | ISO 8601 UTC |

> **两份 CSV 的关系**：`repos_raw.csv` 是抓下来的原始数据（字段最全），`复旦相关仓库分类清单.csv` 是在它基础上加了分类结果、并把描述截到 90 字符便于浏览。行数相同，用 `full_name` / `仓库` 关联。

---

## 五、数据口径

- **来源**：GitHub 官方 REST API，只读请求；检索 `fdu` / `fudan` 出现在仓库名、描述、topics 中的公开仓库。
- **去重**：按 repository id；默认**排除 fork**；仅公开仓库。
- **分类**：关键词词典 + 组织账号匹配的启发式规则，不是人工逐条核对。规则与已知误判见 [METHOD.md](METHOD.md)。
- **时间**：全部为 **2026-10-19** 的快照，之后的变化不会自动同步。
- **README 覆盖**：2,781 / 4,943 个仓库有 README，其余靠名称与描述判断，因此「未识别具体课程」有 583 个。

---

## 六、常见问题

**Q：点进去 404 / 仓库不存在？**
抓取后改名、删除或转为私有了。表里保留的是抓取时的地址。

**Q：为什么这个仓库被归到这门课？看着不对。**
分类是关键词启发式结果，会误判。以原仓库的 README 为准；欢迎提 PR 修正。

**Q：为什么描述只有半句，断在单词中间？**
`简介` 列为了排版整齐截断到 90 字符。看 `描述` 列或 `repos_raw.csv` 里的 `description`（完整，最长 1,002 字符）。

**Q：为什么有些仓库没有简介？**
约 970 个仓库既没有 GitHub 描述、也没能从 README 里提取出可用简介，表里显示为 `—`。这类仓库只能靠名称和分类线索判断，置信度较低。另有 790 个仓库的 GitHub 描述为空，但简介是用 README 内容补的。

**Q：为什么搜不到某个我记得存在的复旦仓库？**
可能：① 描述和名称里都没写 fdu/fudan；② 是 fork（已排除）；③ 私有仓库；④ 未被 GitHub 搜索索引收录；⑤ 创建于抓取时间之后。

**Q：数据会更新吗？**
目前是一次性快照，不自动更新。需要新数据要重新跑抓取流程。

**Q：能商用吗？能打包卖吗？**
不能。见 [LICENSE](LICENSE) 与 [DISCLAIMER.md](DISCLAIMER.md)。

**Q：我是被收录仓库的作者，不想被收录怎么办？**
提 Issue 或邮件 `hansonpeter1722@gmail.com`，核实后 48 小时内移除，无需说明理由。

---

## 七、引用

学术或公开场合引用本数据集：

```bibtex
@misc{fdu_course_collect_2026,
  title        = {复旦大学相关 GitHub 仓库整理（Fudan GitHub Repositories Collection）},
  author       = {{hansonpeter1722-lgtm}},
  year         = {2026},
  howpublished = {\url{https://github.com/hansonpeter1722-lgtm/fdu-github-collect}},
  note         = {4,943 个公开仓库，抓取于 2026-10-19；仅整理链接与元数据，版权归各原作者}
}
```

---

最后更新：2026-10-19
