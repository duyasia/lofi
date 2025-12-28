import { useContext, useState } from "react";
import images from "../../../assets/images/images";
import './LateralMenu.scss'

import ReactAudioPlayer from "react-audio-player";
import Slider from "@mui/material/Slider";
import { StoreContext } from "../../../store";
import { chill, jazzy, sleep } from "../../../data/dataSong";


const LateralMenu = () => {
    const [mood, setMood] = useState(false)
    const [playlist, setPlaylist] = useState(false)
    const [change, setChange] = useState(false)
    const [product, setProduct] = useState(false)
    const [clickSleep, setClickSleep] = useState(false)
    const [clickJazzy, setClickJazzy] = useState(false)
    const [clickChill, setClickChill] = useState(true)
    const valueCT = useContext(StoreContext)
    const volumeRain = valueCT.volumeRain
    const setVolumeRain = valueCT.setVolumeRain
    const setRain = valueCT.setRain
    const setCityRain = valueCT.setCityRain
    const setCityTraffic = valueCT.setCityTraffic
    const volumeTraffic = valueCT.volumeTraffic
    const setVolumeTraffic = valueCT.setVolumeTraffic
    const setTraffic = valueCT.setTraffic
    const volumeKeyboard = valueCT.volumeKeyboard
    const setVolumeKeyboard = valueCT.setVolumeKeyboard
    const setSoundKey = valueCT.setSoundKey
    const setKeyboard = valueCT.setKeyboard
    const volumeSong = valueCT.volumeSong
    const setVolumeSong = valueCT.setVolumeSong
    const setSong = valueCT.setSong

    const handleMood = () => {
        setMood((s) => !s)
        setPlaylist(false)
        setChange(false)
        setProduct(false)
    }
    const handlePlaylist = () => {
        setPlaylist((s) => !s)
        setMood(false)
        setChange(false)
        setProduct(false)
    }
    const handleChange = () => {
        setChange((s) => !s)
        setPlaylist(false)
        setMood(false)
        setProduct(false)
    }
    const handleProduct = () => {
        setProduct((s) => !s)
        setPlaylist(false)
        setChange(false)
        setMood(false)
    }
    const handleChangeRain = (e) => {
        setVolumeRain(e.target.value)
        setCityRain(e.target.value)
        if (e.target.value > 0) {
            setRain(true)
        } else {
            setRain(false)
        }
    }
    const handleChangeTraffic = (e) => {
        setVolumeTraffic(e.target.value)
        setCityTraffic(e.target.value)
        if (e.target.value > 0) {
            setTraffic(true)
        } else {
            setTraffic(false)
        }
    }
    const handleChangeKeyboard = (e) => {
        setVolumeKeyboard(e.target.value)
        setSoundKey(e.target.value)
        if (e.target.value > 0) {
            setKeyboard(true)
        } else {
            setKeyboard(false)
        }
    }
    const handleChangeVolumeSong = (e) => {
        setVolumeSong(e.target.value)
    }
    const handleClickSleep = () => {
        setSong(sleep)
        setClickSleep((s) => !s)
        setClickJazzy(false)
        setClickChill(false)
    }
    const handleClickJazzy = () => {
        setSong(jazzy)
        setClickJazzy((s) => !s)
        setClickSleep(false)
        setClickChill(false)
    }
    const handleClickChill = () => {
        setSong(chill)
        setClickChill((s) => !s)
        setClickJazzy(false)
        setClickSleep(false)
    }

    return (
        <div>
            {/* Lateral */}
            <div className="absolute right-[20px] top-[30%] flex flex-col items-center justify-center rounded-full bg-[rgba(0,0,0,0.6)] h-[280px] w-[70px]">
                <div className="w-[100px] h-[70px] flex justify-center items-center relative cursor-pointer ">
                    <button className={`w-[70px] h-[70px] bg-transparent outline-none overflow-hidden transition-all duration-150 ease-in-out z-20  ${mood ? 'opacity-100' : 'opacity-20 brightness-200'}`}
                        onClick={handleMood}
                    >
                        <img className="scale-150" src={images.mood} alt="mood" />
                    </button>
                    <div className={`-scale-y-100 absolute top-[-23px] right-[10px] h-[120px] w-[80px] z-10 ${mood ? '' : 'hidden'}`}>
                        <img className="" src='./assets/img/menu/lateral_bottom.svg' alt="lateraltop" />
                    </div>
                    <div className="border-b-[2px] border-solid border-[#fff3] absolute bottom-0 h-[100%] left-[24px] top-0 w-[50px] pointer-events-none">

                    </div>
                </div>
                <div className="w-[100px] h-[70px] flex justify-center items-center relative cursor-pointer">
                    <button className={`w-[70px] h-[70px] outline-none z-10 overflow-hidden transition-all duration-150 ease-in-out  ${playlist ? 'opacity-100 bg-[#070707]' : 'opacity-20 brightness-200 bg-transparent'}`}
                        onClick={handlePlaylist}
                    >
                        <img className="scale-150 ml-[-2px]" src={images.playlist} alt="playlist" />
                    </button>
                    <div className="border-b-[2px] border-solid border-[#fff3] absolute bottom-0 h-[100%] left-[24px] top-0 w-[50px] pointer-events-none">

                    </div>
                </div>
                <div className="w-[100px] h-[70px] flex justify-center items-center relative cursor-pointer">
                    <button className={`w-[70px] h-[70px] z-10 outline-none overflow-hidden transition-all duration-150 ease-in-out  ${change ? 'opacity-100 bg-[#070707]' : 'opacity-20 brightness-200 bg-transparent'}`}
                        onClick={handleChange}
                    >
                        <img className="scale-150" src={images.change} alt="change" />
                    </button>
                    <div className="border-b-[2px] border-solid border-[#fff3] absolute bottom-0 h-[100%] left-[24px] top-0 w-[50px] pointer-events-none">

                    </div>
                </div>
                <div className="w-[100px] h-[70px] flex justify-center items-center relative cursor-pointer">
                    <button className={`w-[70px] h-[70px] z-20 bg-transparent outline-none overflow-hidden ${product ? 'opacity-100' : 'opacity-20 brightness-200'}`}
                        onClick={handleProduct}
                    >
                        <img className="scale-[0.4]" src={images.product} alt="product" />
                    </button>
                    <div className={` absolute top-[-26px] right-[10px] h-[120px] w-[80px] z-10 ${product ? '' : 'hidden'}`}>
                        <img src='./assets/img/menu/lateral_bottom.svg' alt="lateraltop" />
                    </div>
                </div>
            </div>
            {/* More Menu*/}
            {/* Mood */}
            <div className={`absolute top-[17%] right-[90px] w-[345px] rounded-[24px] z-10 overflow-hidden bg-[#070707] ${mood ? '' : 'hidden'}`}>
                <div className="mx-[32px] py-[10px]">
                    <div className="h-[54px] flex items-center justify-between">
                        <h4 className="font-[700] text-[20px] text-white leading-[24px]">Mood</h4>
                    </div>
                    <div className="flex justify-center items-center gap-[12px] my-[16px]">
                        <div className="relative flex items-center flex-col cursor-pointer h-[84px] w-[84px] bg-[hsla(0,0%,100%,.05)] rounded-[8px]"
                            onClick={handleClickSleep}
                        >
                            <div className={`absolute top-[-14%] left-2 bg-transparent ${clickSleep ? '' : 'opacity-10 brightness-200'}`}>
                                <img className="scale-[1.8]" src={images.sleep} alt="sleep" />
                            </div>
                            <p className={`absolute bottom-[10px] text-[#fff] text-[16px] ${clickSleep ? 'opacity-100' : 'opacity-30'}`}>Sleepy</p>
                        </div>
                        <div className="relative flex items-center flex-col cursor-pointer h-[84px] w-[84px] bg-[hsla(0,0%,100%,.05)] rounded-[8px]"
                            onClick={handleClickJazzy}
                        >
                            <div className={`absolute top-[-14%] left-2 bg-transparent ${clickJazzy ? '' : 'opacity-10 brightness-200'}`}>
                                <img className="scale-[1.8]" src={images.jazzy} alt="jazzy" />
                            </div>
                            <p className={`absolute bottom-[10px] text-[#fff] text-[16px] ${clickJazzy ? 'opacity-100' : 'opacity-30'}`}>Jazzy</p>
                        </div>
                        <div className="relative flex items-center flex-col cursor-pointer h-[84px] w-[84px] bg-[hsla(0,0%,100%,.05)] rounded-[8px]"
                            onClick={handleClickChill}
                        >
                            <div className={`absolute top-[-14%] left-2 bg-transparent ${clickChill ? '' : 'opacity-10 brightness-200'}`}>
                                <img className="scale-[1.8]" src={images.chill} alt="chill" />
                            </div>
                            <p className={`absolute bottom-[10px] text-[#fff] text-[16px] ${clickChill ? 'opacity-100' : 'opacity-30'}`}>Chill</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-[10px] my-[32px]">
                        <img src={images.volumemin} alt="volumemin" />
                        <div className="px-[16px] mt-[5px]">
                            <ReactAudioPlayer
                                preload="auto"
                                autoPlay
                                loop
                                volume={volumeSong / 100}
                            />
                            <Slider
                                style={{ padding: 0 }}
                                className="volume-slider"
                                value={volumeSong}
                                onChange={handleChangeVolumeSong}
                            />
                        </div>
                        <img src={images.volumemax} alt="volumemax" />
                    </div>
                    <div className="h-[24px] mt-[30px] mb-[8px] flex items-center justify-between">
                        <h4 className="font-[700] text-[20px] text-white leading-[24px]">Background noises</h4>
                    </div>
                    <div>
                        <div className="flex items-center justify-between py-[8px]">
                            <p className="text-[14px] text-white opacity-40">City traffic</p>
                            <div>
                                <ReactAudioPlayer
                                    preload="auto"
                                    autoPlay
                                    loop
                                    src="./assets/audio/city_traffic.mp3"
                                    volume={volumeTraffic / 100}
                                />
                                <Slider
                                    style={{ padding: 0 }}
                                    className="volume-noise--traffic opacity-100"
                                    value={volumeTraffic}
                                    onChange={handleChangeTraffic}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-[8px]">
                            <p className="text-[14px] text-white opacity-40">City rain</p>
                            <div>
                                <ReactAudioPlayer
                                    preload="auto"
                                    autoPlay
                                    loop
                                    volume={volumeRain / 100}
                                />
                                <Slider
                                    style={{ padding: 0 }}
                                    className="volume-noise--rain"
                                    value={volumeRain}
                                    onChange={handleChangeRain}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-[8px]">
                            <p className="text-[14px] text-white opacity-40">Keyboard</p>
                            <div>
                                <ReactAudioPlayer
                                    preload="auto"
                                    autoPlay
                                    loop
                                    src="./assets/audio/key_board.mp3"
                                    volume={volumeKeyboard / 100}
                                />
                                <Slider
                                    style={{ padding: 0 }}
                                    className="volume-noise--keyboard"
                                    value={volumeKeyboard}
                                    onChange={handleChangeKeyboard}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Playlist */}
            <div className={`absolute top-[26%] right-[90px] w-[360px] rounded-[24px] z-10 overflow-hidden bg-[#070707] ${playlist ? '' : 'hidden'}`}>
                <div className="mx-[16px] py-[10px]">
                    <div className="h-[54px] flex items-center justify-between">
                        <h4 className="font-[700] text-[20px] text-white leading-[24px]">Playlists</h4>
                    </div>
                    <div className="flex justify-between items-center">
                        <img className="h-[120px]" src="./assets/img/playlist/chill.svg" alt="chill" />
                        <img className="h-[120px]" src="./assets/img/playlist/focus.svg" alt="focus" />
                        <img className="h-[120px]" src="./assets/img/playlist/sleep.svg" alt="sleep" />
                    </div>
                    <div className="h-[54px] flex items-center justify-between">
                        <h4 className="font-[700] text-[20px] text-white leading-[24px]">Templates</h4>
                    </div>
                    <div>
                        <p className="opacity-50 text-[14px] text-white">You haven't saved any template yet, open the mixer to save one.</p>
                    </div>
                </div>
            </div>
            {/* ChangeSet */}
            <div className={` absolute top-[7%] right-[90px] w-[350px] max-h-[632px] rounded-[24px] z-[-1]  bg-[#070707] ${change ? '' : 'hidden'}`}>
                <div className="change-set m-[16px] max-h-[600px] rounded-[16px] overflow-y-auto">
                    <div className="h-[42px] flex items-center justify-between">
                        <h4 className="font-[700] text-[20px] text-white leading-[24px]">Change Set</h4>
                    </div>
                    <div className="mb-[16px] cursor-pointer bg-[#0005]">
                        <img className="h-[190px] object-cover w-[100%] rounded-[16px] aspect-video" src="./assets/img/changeset/bookcafe.png" alt="bookcafe" />
                    </div>
                    <div className="my-[16px] cursor-pointer bg-[#0005] relative">
                        <div className="flex flex-col h-[60px] justify-center absolute right-[-3%] top-[4px] w-[60px] z-40">
                            <div>
                                <img src={images.premium} alt="premium" />
                            </div>
                        </div>
                        <img className="h-[190px] object-cover w-[100%] rounded-[16px] aspect-video opacity-50" src="./assets/img/changeset/dreamin.png" alt="dreamin" />
                    </div>
                    <div className="my-[16px] cursor-pointer bg-[#0005] relative">
                        <div className="flex flex-col h-[60px] justify-center absolute right-[-3%] top-[4px] w-[60px] z-40">
                            <div>
                                <img src={images.premium} alt="premium" />
                            </div>
                        </div>
                        <img className="h-[190px] object-cover w-[100%] rounded-[16px] aspect-video opacity-50" src="./assets/img/changeset/chill.png" alt="chill" />
                    </div>
                    <div className="my-[16px] cursor-pointer bg-[#0005] relative">
                        <div className="flex flex-col h-[60px] justify-center absolute right-[-3%] top-[4px] w-[60px] z-40">
                            <div>
                                <img src={images.premium} alt="premium" />
                            </div>
                        </div>
                        <img className="h-[190px] object-cover w-[100%] rounded-[16px] aspect-video opacity-50" src="./assets/img/changeset/cottage.png" alt="cottage" />
                    </div>
                    <div className="my-[16px] cursor-pointer bg-[#0005] relative">
                        <div className="flex flex-col h-[60px] justify-center absolute right-[-3%] top-[4px] w-[60px] z-40">
                            <div>
                                <img src={images.premium} alt="premium" />
                            </div>
                        </div>
                        <img className="h-[190px] object-cover w-[100%] rounded-[16px] aspect-video opacity-50" src="./assets/img/changeset/kyoto.png" alt="kyoto" />
                    </div>
                    <div className=" cursor-pointer bg-[#0005] relative">
                        <div className="flex flex-col h-[60px] justify-center absolute right-[-3%] top-[4px] w-[60px] z-40">
                            <div>
                                <img src={images.premium} alt="premium" />
                            </div>
                        </div>
                        <img className="h-[190px] object-cover w-[100%] rounded-[16px] aspect-video opacity-50" src="./assets/img/changeset/lofidesk.png" alt="lofidesk" />
                    </div>
                </div>
            </div>
            {/* Productivity */}
            <div className={`absolute top-[42%] right-[90px] w-[300px] rounded-[24px] z-10 overflow-hidden bg-[#070707] ${product ? '' : 'hidden'}`}>
                <div className="mx-[16px] py-[10px]">
                    <div className="h-[54px] flex items-center justify-between">
                        <h4 className="font-[700] text-[20px] text-white leading-[24px]">Productivity</h4>
                    </div>
                    <div className="relative">
                        <div>
                            <div className="bg-[hsla(0,0%,100%,.05)] flex items-center rounded-[13px] cursor-pointer flex-row mb-[12px] py-[8px] pl-[16px] pr-[8px]">
                                <img className="brightness-[9] opacity-20 w-[28px] h-[28px]" src="./assets/img/product/play.svg" alt="play" />
                                <h6 className="text-[16px] font-[500] leading-[16px] mx-[16px] text-white flex-1">Start Session</h6>
                                <img className="w-[24px] h-[24px] opacity-10" src="./assets/img/product/lock.svg" alt="lock" />
                            </div>
                        </div>
                        <div>
                            <div className="bg-[hsla(0,0%,100%,.05)] flex items-center rounded-[13px] cursor-pointer flex-row mb-[12px] py-[8px] pl-[16px] pr-[8px]">
                                <img className="brightness-[9] opacity-20 w-[28px] h-[28px]" src="./assets/img/product/tomato.svg" alt="tomato" />
                                <h6 className="text-[16px] font-[500] leading-[16px] mx-[16px] text-white flex-1">Timer and Tasks</h6>
                                <img className="w-[24px] h-[24px] opacity-10" src="./assets/img/product/lock.svg" alt="lock" />
                            </div>
                        </div>
                        <div>
                            <div className="bg-[hsla(0,0%,100%,.05)] flex items-center rounded-[13px] cursor-pointer flex-row mb-[12px] py-[8px] pl-[16px] pr-[8px]">
                                <img className="brightness-[9] opacity-20 w-[28px] h-[28px]" src="./assets/img/product/notes.svg" alt="notes" />
                                <h6 className="text-[16px] font-[500] leading-[16px] mx-[16px] text-white flex-1">Notes</h6>
                                <img className="w-[24px] h-[24px] opacity-10" src="./assets/img/product/lock.svg" alt="lock" />
                            </div>
                        </div>
                        <div>
                            <div className="bg-[hsla(0,0%,100%,.05)] flex items-center rounded-[13px] cursor-pointer flex-row mb-[12px] py-[8px] pl-[16px] pr-[8px]">
                                <img className="brightness-[9] opacity-20 w-[28px] h-[28px]" src="./assets/img/product/history.svg" alt="history" />
                                <h6 className="text-[16px] font-[500] leading-[16px] mx-[16px] text-white flex-1">History</h6>
                                <img className="w-[24px] h-[24px] opacity-10" src="./assets/img/product/lock.svg" alt="lock" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LateralMenu;
