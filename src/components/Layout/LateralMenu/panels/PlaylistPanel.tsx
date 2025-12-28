import React from "react";
import type { PanelProps } from "types/index";

/**
 * PlaylistPanel - Playlist selection and templates panel
 */
const PlaylistPanel: React.FC<PanelProps> = ({ isOpen }) => {
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
          <img
            className="h-[120px]"
            src="./assets/img/playlist/chill.svg"
            alt="chill"
          />
          <img
            className="h-[120px]"
            src="./assets/img/playlist/focus.svg"
            alt="focus"
          />
          <img
            className="h-[120px]"
            src="./assets/img/playlist/sleep.svg"
            alt="sleep"
          />
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
