import { useMemo, useState } from "react";
import type { Course } from "../lib/types";
import { href, statusClass, statuses } from "../lib/links";
import { Query, Filter, unique } from "./Controls";
import { normalize } from "../lib/search.mjs";

export default function CourseDirectory({ courses }: { courses: Course[] }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [area, setArea] = useState("");
  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (!status || c.status === status) &&
          (!area || c.area === area) &&
          normalize([c.name, c.enName, ...c.codes].join(" ")).includes(
            normalize(q),
          ),
      ),
    [courses, q, status, area],
  );
  const areas = unique(courses.map((c) => c.area));
  return (
    <div>
      <div className="directory-controls">
        <div className="tabs" aria-label="课程状态筛选">
          {["", ...statuses].map((s) => (
            <button
              key={s}
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
            >
              {s || "全部课程"}{" "}
              <span>
                {s
                  ? courses.filter((c) => c.status === s).length
                  : courses.length}
              </span>
            </button>
          ))}
        </div>
        <div className="filters">
          <Query
            value={q}
            onChange={setQ}
            placeholder="筛选课程名、英文名或课号"
            label="查找课程"
          />
          <Filter label="学科" value={area} onChange={setArea} values={areas} />
        </div>
      </div>
      <p className="result-count" role="status">
        找到 {filtered.length} 门课程
      </p>
      {!filtered.length && (
        <div className="empty">没有匹配的课程，试试更短的关键词。</div>
      )}
      {unique(filtered.map((c) => c.area || "其他")).map((group) => (
        <section className="course-group" key={group}>
          <div className="section-title">
            <h3>{group}</h3>
            <span>
              {filtered.filter((c) => (c.area || "其他") === group).length} 门
            </span>
          </div>
          <div className="course-grid">
            {filtered
              .filter((c) => (c.area || "其他") === group)
              .map((c) => (
                <a
                  className="course-card"
                  href={href(`courses/${c.id}/`)}
                  key={c.id}
                >
                  <div className="card-top">
                    <span className="card-code">
                      {c.codes[0] || "课程资料"}
                    </span>
                    <span className={`badge ${statusClass(c.status)}`}>
                      {c.status}
                    </span>
                  </div>
                  <h4>{c.name}</h4>
                  <p className="english">{c.enName || "查看课程资料"}</p>
                  <p className="card-counts">
                    {c.counts.repos} 个仓库 <span>·</span> {c.counts.exams}{" "}
                    条试题 <span>·</span> {c.counts.collectionFiles} 个文件
                  </p>
                  <span className="card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
