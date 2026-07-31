export function formatRelativeDate(date) {
  const today = new Date();

  const target = new Date(date);

  const diff = Math.floor(
    (today - target) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) return "Today";

  if (diff === 1) return "Yesterday";

  if (diff < 7) return `${diff} days ago`;

  return target.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}