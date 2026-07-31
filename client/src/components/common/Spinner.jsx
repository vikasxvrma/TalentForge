import clsx from "clsx";

export default function PageSpinner({
  message = "Loading experience...",
  showLogo = true,
  className,
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0B0F]/80 backdrop-blur-md transition-opacity duration-300",
        className
      )}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Glow backdrop ring */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse" />

        {/* Dual-ring spinner */}
        <div className="relative h-16 w-16">
          {/* Outer glowing track */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          
          {/* Animated gradient ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-500 border-r-purple-500" />
          
          {/* Inner counter-rotating ring for depth */}
          <div className="absolute inset-2 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-pink-500/80" />

          {/* Center core pulse dot */}
          <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-ping" />
        </div>

        {/* Loading status text */}
        {message && (
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium tracking-wide text-zinc-300 animate-pulse">
              {message}
            </p>
            <span className="sr-only">Please wait while the page loads</span>
          </div>
        )}
      </div>
    </div>
  );
}