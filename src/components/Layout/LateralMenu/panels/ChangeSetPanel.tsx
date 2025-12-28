import React from "react";
import images from "../../../../assets/images/images";
import type { PanelProps } from "types/index";
import { useVideo } from "../../../../store";
import { scenes } from "../../../../data/dataScenes";

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
    <div className="absolute top-[7%] right-[90px] w-[350px] max-h-[632px] rounded-[24px] z-[-1] bg-[#070707]">
      <div className="change-set m-[16px] max-h-[600px] rounded-[16px] overflow-y-auto">
        <div className="h-[42px] flex items-center justify-between">
          <h4 className="font-[700] text-[20px] text-white leading-[24px]">
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
              className={`${index === 0 ? "mb-[16px]" : index === scenes.length - 1 ? "" : "my-[16px]"} cursor-pointer bg-[#0005] relative ${isActive ? "ring-2 ring-white rounded-[16px]" : ""}`}
            >
              {!isAvailable && (
                <div className="flex flex-col h-[60px] justify-center absolute right-[-3%] top-[4px] w-[60px] z-40">
                  <img src={images.premium} alt="coming soon" />
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
