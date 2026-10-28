import { useEffect, useMemo, useState } from "react";
import indexUrl from "../data/search-docs.json?url";
import type { SearchDoc } from "../lib/types";
import { search } from "../lib/search.mjs";
import {
  accessLabels,
  external,
  href,
  statusClass,
  statuses,
} from "../lib/links";
import { Filter, Link, Pager, Query, unique, usePage } from "./Controls";

const emptyFilters = {
  type: "",
  status: "",
  area: "",
  resourceType: "",
  access: "",
  language: "",
  year: "",
};
export default function Search() {
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [attempt, retry] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(location.search);
      setQ(params.get("q") || "");
      setFilters(
        Object.fromEntries(
          Object.keys(emptyFilters).map((key) => [key, params.get(key) || ""]),
        ) as typeof emptyFilters,
      );
      setReady(true);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setError("");
    fetch(indexUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data) => {
        setDocs(data);
        setLoaded(true);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError("搜索索引加载失败，请重试。");
      });
    return () => controller.abort();
  }, [attempt]);
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      const next = `${location.pathname}${params.size ? `?${params}` : ""}`;
      history.replaceState(null, "", next);
    }, 200);
    return () => clearTimeout(timer);
  }, [q, filters, ready]);
  const results = useMemo<SearchDoc[]>(
    () => search(docs, q, filters),
    [docs, q, filters],
  );
  const [page, setPage] = usePage(JSON.stringify([q, filters]));
  const safePage = Math.min(page, Math.max(1, Math.ceil(results.length / 30)));
  const update = (key: keyof typeof filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value }));
  return (
    <div className="search-workspace">
      <div className="search-main-query">
        <Query
          value={q}
          onChange={setQ}
          label="搜索全部资料"
          placeholder="课程代码、中文 / 英文课程名、仓库名、试题标题"
        />
      </div>
      <div className="tabs" aria-label="搜索类型">
        {["", "课程", "仓库", "试题", "2026 开课"].map((type) => (
          <button
            aria-pressed={filters.type === type}
            key={type}
            onClick={() => update("type", type)}
          >
            {type || "全部"}
          </button>
        ))}
      </div>
      <div className="filters filter-grid">
        <Filter
          label="课程状态"
          value={filters.status}
          values={statuses}
          onChange={(v) => update("status", v)}
        />
        <Filter
          label="学科"
          value={filters.area}
          values={unique(docs.map((d) => d.area))}
          onChange={(v) => update("area", v)}
        />
        <Filter
          label="资源类型"
          value={filters.resourceType}
          values={unique(docs.map((d) => d.resourceType))}
          onChange={(v) => update("resourceType", v)}
        />
        <label className="field">
          <span>获取方式</span>
          <select
            value={filters.access}
            onChange={(e) => update("access", e.target.value)}
          >
            <option value="">全部获取方式</option>
            {Object.entries(accessLabels).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <Filter
          label="语言"
          value={filters.language}
          values={unique(docs.map((d) => d.language))}
          onChange={(v) => update("language", v)}
        />
        <Filter
          label="年份"
          value={filters.year}
          values={unique(docs.map((d) => d.year))}
          onChange={(v) => update("year", v)}
        />
      </div>
      <div className="results-toolbar">
        <p role="status">
          {error ||
            (!loaded
              ? "正在加载搜索索引…"
              : `找到 ${results.length.toLocaleString("zh-CN")} 条结果`)}
        </p>
        <button
          className="text-button"
          onClick={() => {
            setQ("");
            setFilters(emptyFilters);
          }}
        >
          清除筛选
        </button>
      </div>
      {error && <button onClick={() => retry(attempt + 1)}>重新加载</button>}
      {loaded && !results.length && (
        <div className="empty">
          没有找到结果。可以尝试课程全名、课号，或清除筛选条件。
        </div>
      )}
      <div className="search-results">
        {results.slice((safePage - 1) * 30, safePage * 30).map((d) => (
          <article key={d.id} className="search-result">
            <div className="result-kicker">
              <span>{d.type}</span>
              {d.status && (
                <span className={`badge ${statusClass(d.status)}`}>
                  {d.status}
                </span>
              )}
              {d.access && (
                <span
                  className={`badge ${d.access === "paid" ? "red" : "gray"}`}
                >
                  {accessLabels[d.access]}
                </span>
              )}
            </div>
            <h2>
              <Link
                url={d.href ? (external(d.href) ? d.href : href(d.href)) : ""}
              >
                {d.title}
              </Link>
            </h2>
            <p>{d.subtitle}</p>
            <p className="muted">
              {[d.codes.join(" · "), d.area, d.resourceType, d.language, d.year]
                .filter(Boolean)
                .join(" / ")}
            </p>
            {d.type !== "课程" && d.courseId && (
              <a className="small-link" href={href(`courses/${d.courseId}/`)}>
                查看课程全部资料 →
              </a>
            )}
          </article>
        ))}
      </div>
      {loaded && (
        <Pager page={safePage} total={results.length} onChange={setPage} />
      )}
      <noscript>
        <p>
          交互搜索需要启用 JavaScript，也可以从顶部“课程”入口浏览静态课程页。
        </p>
      </noscript>
    </div>
  );
}
