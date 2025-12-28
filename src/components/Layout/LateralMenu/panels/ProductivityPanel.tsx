import React from "react";
import type { PanelProps } from "types/index";

interface ProductivityItem {
  icon: string;
  label: string;
}

const PRODUCTIVITY_ITEMS: ProductivityItem[] = [
  { icon: "./assets/img/product/play.svg", label: "Start Session" },
  { icon: "./assets/img/product/tomato.svg", label: "Timer and Tasks" },
  { icon: "./assets/img/product/notes.svg", label: "Notes" },
  { icon: "./assets/img/product/history.svg", label: "History" },
];

/**
 * ProductivityPanel - Productivity tools panel (locked features)
 */
const ProductivityPanel: React.FC<PanelProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[42%] right-[90px] w-[300px] rounded-[24px] z-10 overflow-hidden bg-[#070707]">
      <div className="mx-[16px] py-[10px]">
        <div className="h-[54px] flex items-center justify-between">
          <h4 className="font-[700] text-[20px] text-white leading-[24px]">
            Productivity
          </h4>
        </div>
        <div className="relative">
          {PRODUCTIVITY_ITEMS.map((item) => (
            <div key={item.label}>
              <div className="bg-[hsla(0,0%,100%,.05)] flex items-center rounded-[13px] cursor-pointer flex-row mb-[12px] py-[8px] pl-[16px] pr-[8px]">
                <img
                  className="brightness-[9] opacity-20 w-[28px] h-[28px]"
                  src={item.icon}
                  alt={item.label}
                />
                <h6 className="text-[16px] font-[500] leading-[16px] mx-[16px] text-white flex-1">
                  {item.label}
                </h6>
                <img
                  className="w-[24px] h-[24px] opacity-10"
                  src="./assets/img/product/lock.svg"
                  alt="lock"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductivityPanel;
