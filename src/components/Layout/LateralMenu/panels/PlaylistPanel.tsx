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
    <div className="absolute top-[26%] right-[90px] w-[360px] rounded-[24px] z-10 overflow-hidden bg-[#070707]">
      <div className="mx-[16px] py-[10px]">
        <div className="h-[54px] flex items-center justify-between">
          <h4 className="font-[700] text-[20px] text-white leading-[24px]">
            Playlists
          </h4>
        </div>
        <div className="flex justify-between items-center">
          {PLAYLISTS.map((playlist) => (
            <img
              key={playlist.id}
              className={`h-[120px] cursor-pointer transition-opacity ${
                activePlaylist === playlist.id
                  ? "opacity-100 ring-2 ring-white rounded-lg"
                  : "opacity-70 hover:opacity-100"
              }`}
              src={playlist.image}
              alt={playlist.id}
              onClick={() => handlePlaylistClick(playlist)}
            />
          ))}
        </div>
        <div className="h-[54px] flex items-center justify-between">
          <h4 className="font-[700] text-[20px] text-white leading-[24px]">
            Templates
          </h4>
        </div>
        <div>
          <p className="opacity-50 text-[14px] text-white">
            You haven't saved any template yet, open the mixer to save one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPanel;
