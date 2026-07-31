import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-border bg-surface lg:flex">
      <SidebarContent />
    </aside>
  );
}