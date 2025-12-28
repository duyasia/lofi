import { useState } from "react";
import { useVideo } from "../../../store";
import "./Header.scss";

const MENU_SETTING = [
  {
    icon: "/assets/icon/local_drink.svg",
    title: "SẢN PHẨM",
    url: "https://starbeans.vn/menu",
  },
  {
    icon: "/assets/icon/sell.svg",
    title: "KHUYẾN MÃI",
    url: "https://starbeans.vn/khuyen-mai",
  },
  {
    icon: "/assets/icon/newspaper.svg",
    title: "TIN TỨC",
    url: "https://starbeans.vn/tin-tuc",
  },
  {
    icon: "/assets/icon/person_add.svg",
    title: "TUYỂN DỤNG",
    url: "https://starbeans.vn/tuyen-dung",
  },
  {
    icon: "/assets/icon/contact.svg",
    title: "LIÊN HỆ",
    url: "https://starbeans.vn/lien-he",
  },
];

const Header = () => {
  const { toggled, setToggled, fullscreen, setFullscreen } = useVideo();
  const [openMenu, setOpenMenu] = useState(false);

  const handleToggle = () => setToggled((s) => !s);
  const handleOpenMenu = () => setOpenMenu((s) => !s);

  const handleFullScreen = () => {
    if (!fullscreen) {
      setFullscreen(true);
      const e = document.documentElement;
      e.requestFullscreen();
    } else {
      setFullscreen(false);
      if (!document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className="px-[48px] flex items-center justify-between z-50">
      <div>
        <img
          className="object-cover h-[100px] w-[260px]"
          src="/assets/starbeans-logo.svg"
          alt="logo"
        />
      </div>
      <div className="flex items-center h-full gap-[16px] ">
        {/* Toggle Weather */}
        <button
          className={` relative w-[61px] h-[30px] rounded-full border-none outline-none shadow-xl  ${
            toggled ? "bg-[#f3a952]" : "bg-[#11216d]"
          }`}
          onClick={handleToggle}
        >
          <div
            className={`absolute transition-all ease-linear delay-150 top-[2px] bg-white w-[25px] h-[25px] rounded-full shadow-lg ${
              toggled ? "translate-x-[34px]" : "translate-x-[2px]"
            }`}
          ></div>
          <img
            className={`absolute top-[6px] w-[17px] h-[17px] bg-[] ${
              toggled ? "left-[8px]" : "right-[8px]"
            }`}
            src={
              toggled
                ? "/assets/icon/night-icon.svg"
                : "/assets/icon/day-icon.svg"
            }
            alt="iconWeather"
          />
        </button>
        <div className="hidden md:flex items-center cursor-pointer gap-[8px] bg-gradient-to-l px-[16px] py-[5px] rounded-[8px] from-[#e18660e6] to-[#f4ca5de6]">
          <h3 className="text-[32px] leading-[36px]">🎉</h3>
          <a href="https://zalo.me/351569472972178908" target="_blank" rel="noreferrer noopener">
            <p className="font-bold leading-[16px] text-white text-[12px]">
              ĐĂNG KÝ THÀNH VIÊN
              <br />
              NHẬN VOUCHER 20%
            </p>
          </a>
        </div>
        <button onClick={handleFullScreen}>
          <img
            src="/assets/icon/fullscreen-icon.svg"
            alt="iconMenu"
            className="mt-[6px] cursor-pointer hover:opacity-60 transition-opacity ease-in delay-100"
          />
        </button>
        <div className="relative" onClick={handleOpenMenu}>
          <img
            src="/assets/icon/drag-icon.svg"
            alt="iconMenu"
            className="mt-[6px] cursor-pointer hover:opacity-60 transition-opacity ease-in delay-100"
          />
          {/* Setting Menu */}
          {openMenu && (
            <div className="z-40 absolute top-[40px] left-[-90px] w-[170px] rounded-[8px] overflow-hidden bg-[#070707] text-white pt-2 pb-2">
              {MENU_SETTING.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-[16px] px-[14px] py-[7px] hover:bg-[#f3a952] cursor-pointer"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex gap-[16px]"
                  >
                    <img src={item.icon} alt="iconSetting" />
                    <p className="text-[14px] font-[500]">{item.title}</p>
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
