import { useCallback, useEffect, useMemo, useState } from "react";
import {
  applyTheme,
  getInitialTheme,
  setStoredTheme,
  Theme,
} from "@/theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    setStoredTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return useMemo(
    () => ({
      theme,
      setTheme,
      toggle,
      isDark: theme === "dark",
    }),
    [theme, toggle]
  );
}

