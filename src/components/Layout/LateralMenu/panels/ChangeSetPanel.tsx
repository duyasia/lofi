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
    <div className="absolute top-[7%] right-[120px] w-[380px] max-h-[632px] rounded-[24px] z-10 overflow-hidden glass-ultra animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="change-set m-[24px] max-h-[600px] rounded-[16px] overflow-y-auto">
        <div className="h-[54px] flex items-center justify-between mb-[20px]">
          <h4 className="font-[700] text-[24px] text-white leading-[28px] tracking-tight">
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
              className={`${index === 0 ? "mb-[20px]" : index === scenes.length - 1 ? "" : "my-[20px]"} cursor-pointer relative rounded-[16px] overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                isActive ? "ring-2 ring-accent shadow-glow" : "hover:ring-1 hover:ring-white/30"
              } ${!isAvailable ? "opacity-60" : ""}`}
            >
              {!isAvailable && (
                <div className="flex flex-col h-[60px] justify-center absolute right-[8px] top-[8px] w-[60px] z-40 items-center">
                  <Icon name="workspaces_premium" size={40} className="text-accent" />
                </div>
              )}
              <img
                className={`h-[190px] object-cover w-[100%] rounded-[16px] aspect-video ${!isAvailable ? "opacity-50" : ""}`}
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
