import React from "react";
import type { PanelProps } from "types/index";
import { useVideo } from "../../../../store";
import { scenes } from "../../../../data/dataScenes";
import Icon from "../../../Icon/Icon";

/**
 * ChangeSetPanel - Scene/set selection panel
 * Allows switching between available video backgrounds
 */
const ChangeSetPanel: React.FC<PanelProps> = ({ isOpen }) => {
  const { currentScene, changeScene } = useVideo();

  if (!isOpen) return null;

  const handleSceneClick = (sceneId: string, hasVideos: boolean) => {
    if (hasVideos) {
      changeScene(sceneId);
    }
  };

  return (
    <div className="absolute top-[5%] sm:top-[6%] md:top-[7%] right-[12px] sm:right-[80px] md:right-[120px] w-[calc(100vw-24px)] sm:w-[340px] md:w-[380px] max-w-[380px] max-h-[80vh] sm:max-h-[632px] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] z-10 overflow-hidden glass-ultra animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="change-set m-[16px] sm:m-[20px] md:m-[24px] max-h-[calc(80vh-32px)] sm:max-h-[600px] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] overflow-y-auto">
        <div className="h-[44px] sm:h-[50px] md:h-[54px] flex items-center justify-between mb-[16px] sm:mb-[18px] md:mb-[20px]">
          <h4 className="font-[700] text-[20px] sm:text-[22px] md:text-[24px] text-white leading-[24px] sm:leading-[26px] md:leading-[28px] tracking-tight">
            Change Set
          </h4>
        </div>

        {scenes.map((scene, index) => {
          const isAvailable = scene.videos !== null;
          const isActive = currentScene === scene.id;

          return (
            <div
              key={scene.id}
              onClick={() => handleSceneClick(scene.id, isAvailable)}
              className={`${index === 0 ? "mb-[12px] sm:mb-[16px] md:mb-[20px]" : index === scenes.length - 1 ? "" : "my-[12px] sm:my-[16px] md:my-[20px]"} cursor-pointer relative rounded-[12px] sm:rounded-[14px] md:rounded-[16px] overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                isActive ? "ring-2 ring-accent shadow-glow" : "hover:ring-1 hover:ring-white/30"
              } ${!isAvailable ? "opacity-60" : ""}`}
            >
              {!isAvailable && (
                <div className="flex flex-col h-[50px] sm:h-[55px] md:h-[60px] justify-center absolute right-[6px] sm:right-[7px] md:right-[8px] top-[6px] sm:top-[7px] md:top-[8px] w-[50px] sm:w-[55px] md:w-[60px] z-40 items-center">
                  <Icon name="workspaces_premium" size={32} className="sm:w-9 sm:h-9 md:w-10 md:h-10 text-accent" />
                </div>
              )}
              <img
                className={`h-[140px] sm:h-[160px] md:h-[190px] object-cover w-[100%] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] aspect-video ${!isAvailable ? "opacity-50" : ""}`}
                src={scene.thumbnail}
                alt={scene.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChangeSetPanel;
