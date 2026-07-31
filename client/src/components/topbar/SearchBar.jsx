import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="hidden w-full max-w-md items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2 lg:flex">
      <Search className="h-4 w-4 text-muted" />

      <input
        type="text"
        placeholder="Search resumes, chats..."
        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
      />
    </div>
  );
}

export default SearchBar;