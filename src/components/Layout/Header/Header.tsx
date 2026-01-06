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
    title: "MENU HOMEY",
    url: "https://homey.com.vn/menu",
  },
  {
    icon: "fastfood",
    title: "MENU MICHIKIN",
    url: "https://michikin.com/menu",
  },
  {
    icon: "contacts_product",
    title: "FACEBOOK",
    url: "https://www.facebook.com/homey.xinchao",
  },
  {
    icon: "person_add",
    title: "INSTAGRAM",
    url: "https://instagram.com/homey_xinchao",
  },
  {
    icon: "add_call",
    title: "0832.054.222",
    url: "tel:0832054222",
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
    <div className="px-[16px] sm:px-[24px] md:px-[48px] py-[12px] md:py-[24px] flex items-center justify-between z-50 w-full">
        <a href="https://homey.com.vn" target="_blank" rel="noreferrer noopener" className="flex-shrink-0">
        <img
          className="object-cover h-[60px] sm:h-[80px] md:h-[120px] lg:h-[200px] w-auto transition-opacity duration-300 hover:opacity-90"
          src="/assets/homey.svg"
          alt="logo"
        />
        </a>
      <div className="flex items-center h-full gap-[8px] sm:gap-[10px] md:gap-[12px] flex-shrink-0">
        {/* Toggle Weather - Enhanced with micro-interactions */}
        <button
          className={`relative w-[48px] sm:w-[56px] md:w-[64px] h-[24px] sm:h-[28px] md:h-[32px] rounded-full border-none outline-none shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0 ${
            toggled ? "bg-accent shadow-glow" : "bg-night"
          }`}
          onClick={handleToggle}
          aria-label="Toggle day/night mode"
        >
          <div
            className={`absolute transition-all duration-300 ease-out top-[2px] sm:top-[2.5px] md:top-[3px] bg-white w-[20px] sm:w-[23px] md:w-[26px] h-[20px] sm:h-[23px] md:h-[26px] rounded-full shadow-md ${
              toggled ? "translate-x-[26px] sm:translate-x-[30px] md:translate-x-[34px]" : "translate-x-[2px] sm:translate-x-[2.5px] md:translate-x-[3px]"
            }`}
          ></div>
          <div
            className={`absolute top-[4px] sm:top-[5.5px] md:top-[7px] w-[14px] sm:w-[16px] md:w-[18px] h-[14px] sm:h-[16px] md:h-[18px] transition-all duration-300 flex items-center justify-center text-white ${
              toggled ? "left-[6px] sm:left-[7px] md:left-[8px] opacity-100" : "right-[6px] sm:right-[7px] md:right-[8px] opacity-100"
            }`}
          >
            <Icon name={toggled ? "dark_mode" : "light_mode"} size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" />
          </div>
        </button>
        
        {/* Promo Banner - Glassmorphism style - Unified with buttons */}
        <div className="hidden md:flex relative items-center cursor-pointer gap-[10px] glass px-[16px] py-[8px] rounded-[12px] hover-lift group h-[40px]">
          <Icon name="celebration" size={20} className="text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <a href="https://zalo.me/4214517211878440541" target="_blank" rel="noreferrer noopener" className="flex-shrink-0">
            <p className="font-bold leading-[16px] text-white text-[12px] tracking-tight whitespace-nowrap">
              ĐĂNG KÝ THÀNH VIÊN
              <br />
              <span className="text-accent">NHẬN 2 VOUCHER 10%</span>
            </p>
          </a>
          
          {/* QR Code Popover - Shows on hover */}
          <div className="absolute top-[52px] left-1/2 -translate-x-1/2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
            <div className="glass-strong rounded-[16px] p-[6px] shadow-elevated animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-white rounded-[12px] p-[6px] flex items-center justify-center">
                <img 
                  src="/assets/homey-zalo-oa.png" 
                  alt="QR Code đăng ký thành viên" 
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Fullscreen Button - Unified style */}
        <button 
          onClick={handleFullScreen}
          className="glass w-[40px] h-[40px] rounded-[12px] hover-lift transition-all duration-300 hover:bg-white/10 flex items-center justify-center text-white flex-shrink-0"
          aria-label="Toggle fullscreen"
        >
          <Icon name="fullscreen" size={20} />
        </button>
        
        {/* Menu Button - Unified style */}
        <div className="relative">
          <button
            onClick={handleOpenMenu}
            className="glass w-[40px] h-[40px] rounded-[12px] hover-lift transition-all duration-300 hover:bg-white/10 flex items-center justify-center text-white flex-shrink-0"
            aria-label="Open menu"
          >
            <Icon name="menu" size={20} />
          </button>
          
          {/* Setting Menu - Glassmorphism with smooth animation */}
          {openMenu && (
            <div className="z-40 absolute top-[48px] sm:top-[52px] md:top-[56px] right-0 w-[180px] sm:w-[200px] rounded-[12px] sm:rounded-[16px] overflow-hidden glass-strong text-white pt-2 pb-2 animate-in fade-in slide-in-from-top-2 duration-300">
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
