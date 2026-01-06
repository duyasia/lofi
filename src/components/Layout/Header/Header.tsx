import React, { useState } from "react";
import { useVideo } from "../../../store";
import "./Header.scss";
import Icon from "../../Icon/Icon";

interface MenuSettingItem {
  icon: string;
  title: string;
  url: string;
}

const MENU_SETTING: MenuSettingItem[] = [
  {
    icon: "local_drink",
    title: "SẢN PHẨM",
    url: "https://homey.com.vn/menu",
  },
  {
    icon: "sell",
    title: "KHUYẾN MÃI",
    url: "https://homey.com.vn/khuyen-mai",
  },
  {
    icon: "article",
    title: "TIN TỨC",
    url: "https://homey.com.vn/tin-tuc",
  },
  {
    icon: "person_add",
    title: "TUYỂN DỤNG",
    url: "https://homey.com.vn/tuyen-dung",
  },
  {
    icon: "contact_support",
    title: "LIÊN HỆ",
    url: "https://homey.com.vn/lien-he",
  },
];

const Header: React.FC = () => {
  const { toggled, setToggled, fullscreen, setFullscreen } = useVideo();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleToggle = () => setToggled((s) => !s);
  const handleOpenMenu = () => setOpenMenu((s) => !s);

  const handleFullScreen = () => {
    if (!fullscreen) {
      setFullscreen(true);
      const e = document.documentElement;
      e.requestFullscreen();
    } else {
      setFullscreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="px-[48px] py-[0px] flex items-center justify-between z-50">
        <a href="https://homey.com.vn" target="_blank" rel="noreferrer noopener">
        <img
          className="object-cover h-[200px]  transition-opacity duration-300 hover:opacity-90"
          src="/assets/homey.svg"
          alt="logo"
        />
        </a>
      <div className="flex items-center h-full gap-[20px]">
        {/* Toggle Weather - Enhanced with micro-interactions */}
        <button
          className={`relative w-[64px] h-[32px] rounded-full border-none outline-none shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
            toggled ? "bg-accent shadow-glow" : "bg-night"
          }`}
          onClick={handleToggle}
          aria-label="Toggle day/night mode"
        >
          <div
            className={`absolute transition-all duration-300 ease-out top-[3px] bg-white w-[26px] h-[26px] rounded-full shadow-md ${
              toggled ? "translate-x-[34px]" : "translate-x-[3px]"
            }`}
          ></div>
          <div
            className={`absolute top-[7px] w-[18px] h-[18px] transition-all duration-300 flex items-center justify-center text-white ${
              toggled ? "left-[8px] opacity-100" : "right-[8px] opacity-100"
            }`}
          >
            <Icon name={toggled ? "dark_mode" : "light_mode"} size={18} />
          </div>
        </button>
        
        {/* Promo Banner - Glassmorphism style */}
        <div className="hidden md:flex items-center cursor-pointer gap-[12px] glass px-[20px] py-[10px] rounded-[16px] hover-lift group">
          <h3 className="text-[36px] leading-[40px] transition-transform duration-300 group-hover:scale-110">
          <Icon name="celebration" size={28} />
          </h3>
          <a href="https://zalo.me/4214517211878440541" target="_blank" rel="noreferrer noopener">
            <p className="font-bold leading-[18px] text-white text-[13px] tracking-tight">
              ĐĂNG KÝ THÀNH VIÊN
              <br />
              <span className="text-accent">NHẬN 2 VOUCHER 10%</span>
            </p>
          </a>
        </div>
        
        {/* Fullscreen Button - Glassmorphism */}
        <button 
          onClick={handleFullScreen}
          className="glass p-[12px] rounded-[12px] hover-lift transition-all duration-300 hover:bg-white/10 flex items-center justify-center text-white"
          aria-label="Toggle fullscreen"
        >
          <Icon name="fullscreen" size={20} />
        </button>
        
        {/* Menu Button - Glassmorphism */}
        <div className="relative">
          <button
            onClick={handleOpenMenu}
            className="glass p-[12px] rounded-[12px] hover-lift transition-all duration-300 hover:bg-white/10 flex items-center justify-center text-white"
            aria-label="Open menu"
          >
            <Icon name="menu" size={20} />
          </button>
          
          {/* Setting Menu - Glassmorphism with smooth animation */}
          {openMenu && (
            <div className="z-40 absolute top-[56px] right-0 w-[200px] rounded-[16px] overflow-hidden glass-strong text-white pt-2 pb-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {MENU_SETTING.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-[16px] px-[18px] py-[10px] hover:bg-white/10 cursor-pointer transition-all duration-200 group"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex gap-[16px] items-center w-full"
                  >
                    <Icon 
                      name={item.icon} 
                      size={18}
                      className="transition-transform duration-200 group-hover:scale-110 text-white"
                    />
                    <p className="text-[14px] font-[500] transition-colors duration-200 group-hover:text-accent">
                      {item.title}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
