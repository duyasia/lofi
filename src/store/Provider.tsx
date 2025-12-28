import { AudioProvider } from "./AudioContext";
import { VideoProvider } from "./VideoContext";
import { UIProvider } from "./UIContext";
import { PomodoroProvider } from "./PomodoroContext";

/**
 * StoreProvider - Composes all domain-specific providers
 * Order: UIProvider > VideoProvider > AudioProvider > PomodoroProvider (innermost)
 */
function Provider({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <VideoProvider>
        <AudioProvider>
          <PomodoroProvider>{children}</PomodoroProvider>
        </AudioProvider>
      </VideoProvider>
    </UIProvider>
  );
}

export default Provider;
