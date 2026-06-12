"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

const themes = [
  { id: "honey", label: "Honey", color: "#f5a623" },
  { id: "pearl", label: "Pearl", color: "#d4785c" },
  { id: "slate", label: "Slate", color: "#38bdf8" },
  { id: "mint", label: "Mint", color: "#2dd4bf" },
] as const;

type ThemeId = (typeof themes)[number]["id"];

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "honey",
  setTheme: () => {},
  themes,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("honey");
  const [, setTransitioning] = useState(false);

  const setTheme = useCallback((t: ThemeId) => {
    setTransitioning(true);
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.classList.add("theme-transition");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
      setTransitioning(false);
    }, 600);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      <div className="fixed bottom-8 right-8 z-[60] flex gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`size-4 rounded-full border transition-all duration-300 ${
              theme === t.id
                ? "scale-125 border-bone-white shadow-[0_0_8px_rgba(var(--prism-a),0.5)]"
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
            style={{ backgroundColor: t.color }}
            aria-label={t.label}
            title={t.label}
          />
        ))}
      </div>
      {children}
    </ThemeContext.Provider>
  );
}
