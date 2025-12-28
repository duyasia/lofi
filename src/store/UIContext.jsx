import { createContext, useState, useContext, useMemo } from "react";

const UIContext = createContext();

/**
 * UIProvider - Manages UI-related state (enter/navigation)
 */
export function UIProvider({ children }) {
  const [enter, setEnter] = useState(false);

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
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }
  return context;
}

export default UIContext;
