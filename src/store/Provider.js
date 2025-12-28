import { AudioProvider } from "./AudioContext";
import { VideoProvider } from "./VideoContext";
import { UIProvider } from "./UIContext";

/**
 * StoreProvider - Composes all domain-specific providers
 * Order: UIProvider > VideoProvider > AudioProvider (innermost has audio)
 */
function Provider({ children }) {
  return (
    <UIProvider>
      <VideoProvider>
        <AudioProvider>{children}</AudioProvider>
      </VideoProvider>
    </UIProvider>
  );
}

export default Provider;
