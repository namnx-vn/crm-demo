import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TableDensity = "compact" | "normal";

type UiState = {
  sidebarCollapsed: boolean;
  tableDensity: TableDensity;
  selectedCustomerIds: number[];
};

type UiActions = {
  toggleSidebar: () => void;
  setTableDensity: (density: TableDensity) => void;
  toggleCustomer: (id: number) => void;
  clearSelectedCustomers: () => void;
};

export const useUiStore = create<UiState & UiActions>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      tableDensity: "normal",
      selectedCustomerIds: [],

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setTableDensity: (tableDensity) => set({ tableDensity }),

      toggleCustomer: (id) =>
        set((state) => ({
          selectedCustomerIds: state.selectedCustomerIds.includes(id)
            ? state.selectedCustomerIds.filter((customerId) => customerId !== id)
            : [...state.selectedCustomerIds, id],
        })),

      clearSelectedCustomers: () => set({ selectedCustomerIds: [] }),
    }),
    {
      name: "crm-ui-store",
      // Persist UI preferences only. Row selection is temporary interaction state.
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        tableDensity: state.tableDensity,
      }),
    },
  ),
);
