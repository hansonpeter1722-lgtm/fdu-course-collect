import { useEffect, useState } from "react";
import type { Exam, Schedule, CollectionFile, Course } from "../lib/types";
import { accessLabels, href } from "../lib/links";
import { normalize } from "../lib/search.mjs";
import { Filter, Link, Pager, Query, unique, usePage } from "./Controls";

type Row = Exam | Schedule | CollectionFile;
type Kind = "schedule" | "exams" | "collections";
export default function DataBrowser({
  kind,
  dataUrl,
  initial,
  courses,
}: {
  kind: Kind;
  dataUrl: string;
  initial: Row[];
  courses: Pick<Course, "id" | "name">[];
}) {
  const [rows, setRows] = useState<Row[]>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, retry] = useState(0);
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [access, setAccess] = useState("");
  const [showPaid, setShowPaid] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQ(params.get("q") || "");
    if (kind === "exams") setA(params.get("course") || "");
  }, [kind]);
  useEffect(() => {
    const controller = new AbortController();
    setError("");
    setLoading(true);
    fetch(dataUrl, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          setError("完整列表加载失败，当前显示首批记录。");
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, [dataUrl, attempt]);
  const scheduleRows = rows as Schedule[];
  const examRows = rows as Exam[];
  const fileRows = rows as CollectionFile[];
  const filtered = rows.filter((row) => {
    if (kind === "schedule") {
      const r = row as Schedule;
      return (
        (!a || r.departments.includes(a)) &&
        (!b ||
          r.credits
            .split(/[;；]/)
            .map((v) => v.trim())
            .includes(b)) &&
        (!c || r.coverage === c) &&
        normalize([r.name, ...r.codes, ...r.departments].join(" ")).includes(
          normalize(q),
        )
      );
    }
    if (kind === "exams") {
      const r = row as Exam;
      return (
        (showPaid || ["free", "preview"].includes(r.accessKind)) &&
        (!a || (a === "$outside" ? !r.courseId : r.courseId === a)) &&
        (!b || r.source === b) &&
        (!c || r.year === c) &&
        (!access || r.accessKind === access) &&
        normalize(`${r.title} ${r.courseName} ${r.desc}`).includes(normalize(q))
      );
    }
    const r = row as CollectionFile;
    return (
      (!a || r.module === a) &&
      (!b || r.courseId === b) &&
      (!c || r.collection === c) &&
      normalize(`${r.path} ${r.courseName} ${r.collection}`).includes(
        normalize(q),
      )
    );
  });
  const [page, setPage] = usePage(
    JSON.stringify([q, a, b, c, access, showPaid]),
  );
  const safePage = Math.min(page, Math.max(1, Math.ceil(filtered.length / 30)));
  const courseOptions = (value: string, update: (v: string) => void) => (
    <label className="field">
      <span>课程</span>
      <select value={value} onChange={(e) => update(e.target.value)}>
        <option value="">全部课程</option>
        {kind === "exams" && <option value="$outside">课程表外</option>}
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.name}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <div>
      <div className="filters filter-grid">
        <Query
          value={q}
          onChange={setQ}
          label="搜索列表"
          placeholder={
            kind === "schedule"
              ? "课程名、课号或院系"
              : kind === "exams"
                ? "试题标题或课程名"
                : "文件路径或课程名"
          }
        />
        {kind === "schedule" ? (
          <>
            <Filter
              label="院系"
              value={a}
              onChange={setA}
              values={unique(scheduleRows.flatMap((r) => r.departments))}
            />
            <Filter
              label="学分"
              value={b}
              onChange={setB}
              values={unique(
                scheduleRows.flatMap((r) =>
                  r.credits.split(/[;；]/).map((v) => v.trim()),
                ),
              )}
            />
            <Filter
              label="覆盖状态"
              value={c}
              onChange={setC}
              values={unique(scheduleRows.map((r) => r.coverage))}
            />
          </>
        ) : kind === "exams" ? (
          <>
            {courseOptions(a, setA)}
            <Filter
              label="来源"
              value={b}
              onChange={setB}
              values={unique(examRows.map((r) => r.source))}
            />
            <Filter
              label="年份"
              value={c}
              onChange={setC}
              values={unique(examRows.map((r) => r.year))}
            />
            <label className="field">
              <span>获取方式</span>
              <select
                value={access}
                onChange={(e) => setAccess(e.target.value)}
              >
                <option value="">全部可见方式</option>
                {Object.entries(accessLabels)
                  .filter(
                    ([key]) => showPaid || ["free", "preview"].includes(key),
                  )
                  .map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
              </select>
            </label>
          </>
        ) : (
          <>
            <Filter
              label="模块"
              value={a}
              onChange={setA}
              values={unique(fileRows.map((r) => r.module))}
            />
            {courseOptions(b, setB)}
            <Filter
              label="合集"
              value={c}
              onChange={setC}
              values={unique(fileRows.map((r) => r.collection))}
            />
          </>
        )}
      </div>
      {kind === "exams" && (
        <label className="toggle">
          <input
            type="checkbox"
            checked={showPaid}
            onChange={(e) => {
              setShowPaid(e.target.checked);
              setAccess("");
            }}
          />
          <span>显示付费及获取方式未知的索引</span>
          <small>付费条目不代表免费获取</small>
        </label>
      )}
      <div className="results-toolbar">
        <p role="status">
          {loading
            ? "正在加载完整列表…"
            : error || `筛选后 ${filtered.length.toLocaleString("zh-CN")} 条`}
        </p>
        <button
          className="text-button"
          onClick={() => {
            setQ("");
            setA("");
            setB("");
            setC("");
            setAccess("");
            setShowPaid(false);
          }}
        >
          清除筛选
        </button>
      </div>
      {error && <button onClick={() => retry(attempt + 1)}>重试</button>}
      <table className="responsive-table">
        <caption className="sr-only">
          {kind === "schedule"
            ? "2026 开课课程"
            : kind === "exams"
              ? "网络试题索引"
              : "合集文件索引"}
        </caption>
        <thead>
          <tr>
            {(kind === "schedule"
              ? ["课程", "课号 / 学分", "院系 / 班次", "本地覆盖"]
              : kind === "exams"
                ? ["试题", "课程", "来源 / 年份", "获取方式"]
                : ["文件路径", "课程", "模块", "合集"]
            ).map((label) => (
              <th key={label} scope="col">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.slice((safePage - 1) * 30, safePage * 30).map((row, i) => {
            if (kind === "schedule") {
              const r = row as Schedule;
              return (
                <tr key={`${r.name}-${i}`}>
                  <td data-label="课程">
                    <strong>{r.name}</strong>
                  </td>
                  <td data-label="课号 / 学分">
                    {r.codes.join(" / ") || "—"}
                    <p className="row-description">{r.credits || "—"} 学分</p>
                  </td>
                  <td data-label="院系 / 班次">
                    {r.departments.join(" / ") || "—"}
                    <p className="row-description">
                      {r.sections || "—"} 个班次
                    </p>
                  </td>
                  <td data-label="本地覆盖">
                    {r.localId && r.coverage !== "无对应" ? (
                      <>
                        <span className="badge green">{r.coverage}</span>
                        <p>
                          <a href={href(`courses/${r.localId}/`)}>
                            {r.localName || r.name} →
                          </a>
                        </p>
                      </>
                    ) : (
                      <span className="muted">本地未覆盖</span>
                    )}
                  </td>
                </tr>
              );
            }
            if (kind === "exams") {
              const r = row as Exam;
              return (
                <tr key={`${r.url}-${i}`}>
                  <td data-label="试题">
                    <Link url={r.url}>{r.title}</Link>
                    {r.desc && <p className="row-description">{r.desc}</p>}
                  </td>
                  <td data-label="课程">
                    {r.courseId ? (
                      <a href={href(`courses/${r.courseId}/`)}>
                        {r.courseName}
                      </a>
                    ) : (
                      <span>{r.courseName || "课程表外"}</span>
                    )}
                  </td>
                  <td data-label="来源 / 年份">
                    {r.source || "—"}
                    <p className="row-description">{r.year || "年份未知"}</p>
                  </td>
                  <td data-label="获取方式">
                    <span
                      className={`badge ${r.accessKind === "paid" ? "red" : "gray"}`}
                    >
                      {accessLabels[r.accessKind]}
                    </span>
                    <p className="row-description">{r.access}</p>
                  </td>
                </tr>
              );
            }
            const r = row as CollectionFile;
            return (
              <tr key={`${r.url}-${i}`}>
                <td data-label="文件路径">
                  <Link url={r.url}>{r.path}</Link>
                  <p className="row-description">{r.ext || "文件"}</p>
                </td>
                <td data-label="课程">
                  <a href={href(`courses/${r.courseId}/`)}>{r.courseName}</a>
                </td>
                <td data-label="模块">{r.module}</td>
                <td data-label="合集">{r.collection}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!filtered.length && <p className="empty">暂无匹配记录。</p>}
      <Pager page={safePage} total={filtered.length} onChange={setPage} />
      <noscript>
        <p>当前仅显示首批记录；筛选和翻页需要启用 JavaScript。</p>
      </noscript>
    </div>
  );
}
