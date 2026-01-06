import React from "react";
import type { PanelProps, Song } from "types/index";
import { useAudio } from "../../../../store";
import { chill, jazzy, sleep } from "../../../../data/dataSong";

interface PlaylistOption {
  id: string;
  image: string;
  songs: Song[];
}

const PLAYLISTS: PlaylistOption[] = [
  { id: "chill", image: "./assets/img/playlist/chill.svg", songs: chill },
  { id: "focus", image: "./assets/img/playlist/focus.svg", songs: jazzy },
  { id: "sleep", image: "./assets/img/playlist/sleep.svg", songs: sleep },
];

/**
 * PlaylistPanel - Playlist selection and templates panel
 */
const PlaylistPanel: React.FC<PanelProps> = ({ isOpen }) => {
  const { song, setSong } = useAudio();

  // Determine active playlist by comparing first song
  const activePlaylist =
    PLAYLISTS.find((p) => p.songs[0]?.src === song[0]?.src)?.id || "chill";

  const handlePlaylistClick = (playlist: PlaylistOption) => {
    setSong(playlist.songs);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-[20%] sm:top-[24%] md:top-[26%] right-[12px] sm:right-[80px] md:right-[120px] w-[calc(100vw-24px)] sm:w-[340px] md:w-[380px] max-w-[380px] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] z-10 overflow-hidden glass-ultra animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mx-[20px] sm:mx-[28px] md:mx-[36px] py-[16px] sm:py-[20px] md:py-[24px]">
        <div className="h-[48px] sm:h-[54px] md:h-[60px] flex items-center justify-between mb-[16px] sm:mb-[20px] md:mb-[24px]">
          <h4 className="font-[700] text-[20px] sm:text-[22px] md:text-[24px] text-white leading-[24px] sm:leading-[26px] md:leading-[28px] tracking-tight">
            Playlists
          </h4>
        </div>
        <div className="flex justify-between items-center gap-[8px] sm:gap-[10px] md:gap-[12px] mb-[24px] sm:mb-[28px] md:mb-[32px]">
          {PLAYLISTS.map((playlist) => (
            <div
              key={playlist.id}
              className={`flex-1 cursor-pointer transition-all duration-300 rounded-[16px] overflow-hidden hover:scale-105 active:scale-95 ${
                activePlaylist === playlist.id
                  ? "ring-2 ring-accent shadow-glow"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => handlePlaylistClick(playlist)}
            >
              <img
                className="w-full h-auto object-cover"
                src={playlist.image}
                alt={playlist.id}
              />
            </div>
          ))}
        </div>
        <div className="h-[32px] flex items-center justify-between mb-[12px] border-t border-white/10 pt-[20px]">
          <h4 className="font-[700] text-[20px] text-white leading-[24px] tracking-tight">
            Templates
          </h4>
        </div>
        <div>
          <p className="opacity-60 text-[14px] text-white leading-relaxed">
            You haven't saved any template yet, open the mixer to save one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPanel;
