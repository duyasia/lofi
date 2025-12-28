import { createContext, useState, useContext, useMemo } from "react";
import type { UIContextType } from "types/index";

const UIContext = createContext<UIContextType | undefined>(undefined);

/**
 * UIProvider - Manages UI-related state (enter/navigation)
 */
export function UIProvider({ children }: { children: React.ReactNode }) {
  const [enter, setEnter] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      enter,
      setEnter,
    }),
    [enter]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

/**
 * useUI - Custom hook for consuming UI context
 */
export function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }
  return context;
}

export default UIContext;
