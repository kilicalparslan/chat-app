import type { ThemeStore, Theme } from "@/constants/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "theme",
    }
  )
);
