import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isExpanded: true,
  isMobileOpen: false,
  isHovered: false,
  activeItem: null,
  openSubmenu: null,

  setIsExpanded: (val) => set({ isExpanded: val }),
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setIsHovered: (val) => set({ isHovered: val }),
  setActiveItem: (item) => set({ activeItem: item }),
  toggleSubmenu: (item) =>
    set((state) => ({
      openSubmenu: state.openSubmenu === item ? null : item,
    })),
}));
