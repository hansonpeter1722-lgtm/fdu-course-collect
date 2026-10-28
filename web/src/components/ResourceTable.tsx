import { useState } from "react";
import type { ResourceRow } from "../lib/types";
import { Link, Pager, Query, usePage } from "./Controls";
import { normalize } from "../lib/search.mjs";

export default function ResourceTable({
  rows,
  module,
}: {
  rows: ResourceRow[];
  module: string;
}) {
  const [q, setQ] = useState("");
  const filtered = rows.filter((r) =>
    normalize(`${r.title} ${r.source} ${r.type}`).includes(normalize(q)),
  );
  const [page, setPage] = usePage(q);
  const safePage = Math.min(page, Math.max(1, Math.ceil(filtered.length / 30)));
  const columns =
    module === "试题"
      ? [
          { key: "source", label: "来源" },
          { key: "year", label: "年份" },
          { key: "access", label: "获取方式" },
        ]
      : module === "课程资料"
        ? [
            { key: "type", label: "类型" },
            { key: "source", label: "来源" },
          ]
        : [
            { key: "language", label: "语言" },
            { key: "year", label: "年份" },
            { key: "stars", label: "Star" },
          ];
  if (!rows.length) return <p className="empty">暂无</p>;
  return (
    <>
      <div className="table-tools">
        <Query
          value={q}
          onChange={setQ}
          label={`筛选${module}`}
          placeholder="搜索标题或来源"
        />
        <span className="muted">每页最多 30 条</span>
      </div>
      <table className="responsive-table">
        <caption className="sr-only">{module}统一资源表</caption>
        <thead>
          <tr>
            <th scope="col">资源名称</th>
            {columns.map((c) => (
              <th scope="col" key={c.key}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.slice((safePage - 1) * 30, safePage * 30).map((r, i) => (
            <tr key={`${r.url}-${i}`}>
              <td data-label="资源名称">
                <Link url={r.url}>{r.title}</Link>
                {r.description && (
                  <p className="row-description">{r.description}</p>
                )}
              </td>
              {columns.map((c) => (
                <td data-label={c.label} key={c.key}>
                  {r[c.key as keyof ResourceRow] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!filtered.length && <p className="empty">没有匹配的资源。</p>}
      <Pager page={safePage} total={filtered.length} onChange={setPage} />
    </>
  );
}
