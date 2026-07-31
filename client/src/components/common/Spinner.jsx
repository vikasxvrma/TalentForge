import clsx from "clsx";

export default function Spinner({
  size = "md",
  className,
}) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-[3px]",
    lg: "h-10 w-10 border-4",
    xl: "h-14 w-14 border-4",
  };

  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-primary border-t-transparent",
        sizes[size],
        className
      )}
    />
  );
}