const CardSkeleteton = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <div className="animate-pulse space-y-4">
        <div className="h-5 w-40 rounded-md bg-muted" />

        <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-5/6 rounded-md bg-muted" />
        </div>

        <div className="flex gap-3 pt-2">
            <div className="h-10 w-36 rounded-lg bg-muted" />
            <div className="h-10 w-28 rounded-lg bg-muted" />
        </div>
    </div>
</div>
  )
}

export default CardSkeleteton