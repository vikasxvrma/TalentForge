import {
  useCallback,
  useMemo,
  useState,
} from "react";

import { SidebarContext } from "../context/SidebarContext";

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    }),
    [isOpen, openSidebar, closeSidebar, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}