import * as React from "react";

// Replacement for next-themes' ThemeProvider used in the original AI-Web layout.
// Lovable site is a single-theme, scope-per-route render — no toggling needed.
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
} & Record<string, unknown>) {
  return <>{children}</>;
}

export default ThemeProvider;
