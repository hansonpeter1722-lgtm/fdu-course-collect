import { useEffect, useState } from "react";
import { external, validLink } from "../lib/links";

export function Link({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  if (!url || !validLink(url))
    return (
      <span>
        {children}
        <small className="muted">（链接缺失）</small>
      </span>
    );
  return (
    <a
      href={url}
      {...(external(url)
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
      {external(url) && (
        <span aria-hidden="true" className="external">
          {" "}
          ↗
        </span>
      )}
    </a>
  );
}
export function Filter({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">全部{label}</option>
        {values.filter(Boolean).map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </label>
  );
}
export function Query({
  value,
  onChange,
  placeholder = "输入关键词",
  label = "搜索关键词",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}) {
  return (
    <label className="field query">
      <span>{label}</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
export function Pager({
  page,
  total,
  size = 30,
  onChange,
}: {
  page: number;
  total: number;
  size?: number;
  onChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / size));
  return (
    <nav className="pager" aria-label="结果分页">
      <span role="status">
        共 {total.toLocaleString("zh-CN")} 条 · 第 {page} / {pages} 页
      </span>
      <div>
        <button disabled={page <= 1} onClick={() => onChange(page - 1)}>
          上一页
        </button>
        <button disabled={page >= pages} onClick={() => onChange(page + 1)}>
          下一页
        </button>
      </div>
    </nav>
  );
}
export function usePage(key: string) {
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [key]);
  return [page, setPage] as const;
}
export const unique = (values: string[]) =>
  [...new Set(values)]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "zh", { numeric: true }));
