import { useState } from "react";
import Context from "./Context";
import { chill } from "../data/dataSong";

function Provider({ children }) {
    const [toggled, setToggled] = useState(true);
    const [volumeRain, setVolumeRain] = useState(0);
    const [enter, setEnter] = useState(false);
    const [rain, setRain] = useState(false);
    const [cityRain, setCityRain] = useState(50);
    const [cityTraffic, setCityTraffic] = useState(50);
    const [volumeTraffic, setVolumeTraffic] = useState(0);
    const [volumeKeyboard, setVolumeKeyboard] = useState(0);
    const [traffic, setTraffic] = useState(false);
    const [keyboard, setKeyboard] = useState(false);
    const [soundKey, setSoundKey] = useState(50);
    const [volumeSong, setVolumeSong] = useState(50);
    const [song, setSong] = useState(chill);
    const [fullscreen, setFullscreen] = useState(false);

    return (
        <Context.Provider
            value={{
                toggled: toggled,
                setToggled: setToggled,
                volumeRain: volumeRain,
                setVolumeRain: setVolumeRain,
                enter: enter,
                setEnter: setEnter,
                rain: rain,
                setRain: setRain,
                cityRain: cityRain,
                setCityRain: setCityRain,
                cityTraffic: cityTraffic,
                setCityTraffic: setCityTraffic,
                volumeTraffic: volumeTraffic,
                setVolumeTraffic: setVolumeTraffic,
                traffic: traffic,
                setTraffic: setTraffic,
                keyboard: keyboard,
                setKeyboard: setKeyboard,
                soundKey: soundKey,
                setSoundKey: setSoundKey,
                volumeKeyboard: volumeKeyboard,
                setVolumeKeyboard: setVolumeKeyboard,
                volumeSong: volumeSong,
                setVolumeSong: setVolumeSong,
                song: song,
                setSong: setSong,
                fullscreen: fullscreen,
                setFullscreen: setFullscreen,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default Provider;
