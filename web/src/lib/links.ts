export const href = (path = "") =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
export const accessLabels: Record<string, string> = {
  free: "免费公开",
  preview: "仅可预览",
  paid: "付费索引",
  unknown: "获取方式未知",
};
export const statuses = ["开课", "合并", "今年未开课", "研究生已过滤"];
export const statusClass = (status: string) =>
  ({ 开课: "green", 合并: "blue", 今年未开课: "gray", 研究生已过滤: "purple" })[
    status
  ] || "gray";
export function external(url: string) {
  return /^https?:\/\//i.test(url);
}
export function validLink(url: string) {
  return (
    external(url) ||
    (url.startsWith(import.meta.env.BASE_URL) && !url.startsWith("//"))
  );
}
