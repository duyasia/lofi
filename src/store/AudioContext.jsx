import { createContext, useState, useContext, useCallback, useMemo } from "react";
import { chill } from "../data/dataSong";

const AudioContext = createContext();

/**
 * AudioProvider - Manages all audio-related state (rain, traffic, keyboard, song)
 */
export function AudioProvider({ children }) {
  // Rain state
  const [rain, setRain] = useState(false);
  const [volumeRain, setVolumeRain] = useState(0);
  const [cityRain, setCityRain] = useState(50);

  // Traffic state
  const [traffic, setTraffic] = useState(false);
  const [volumeTraffic, setVolumeTraffic] = useState(0);
  const [cityTraffic, setCityTraffic] = useState(50);

  // Keyboard state
  const [keyboard, setKeyboard] = useState(false);
  const [volumeKeyboard, setVolumeKeyboard] = useState(0);
  const [soundKey, setSoundKey] = useState(50);

  // Song state
  const [volumeSong, setVolumeSong] = useState(50);
  const [song, setSong] = useState(chill);

  // Toggle handlers with volume sync
  const toggleRain = useCallback(() => {
    setRain((prev) => {
      if (prev) {
        setVolumeRain(0);
      } else {
        setVolumeRain(50);
        setCityRain(50);
      }
      return !prev;
    });
  }, []);

  const toggleTraffic = useCallback(() => {
    setTraffic((prev) => {
      if (prev) {
        setVolumeTraffic(0);
      } else {
        setVolumeTraffic(50);
        setCityTraffic(50);
      }
      return !prev;
    });
  }, []);

  const toggleKeyboard = useCallback(() => {
    setKeyboard((prev) => {
      if (prev) {
        setVolumeKeyboard(0);
      } else {
        setVolumeKeyboard(50);
        setSoundKey(50);
      }
      return !prev;
    });
  }, []);

  // Volume change handlers
  const changeRainVolume = useCallback((value) => {
    setCityRain(value);
    setVolumeRain(value);
    setRain(value > 0);
  }, []);

  const changeTrafficVolume = useCallback((value) => {
    setCityTraffic(value);
    setVolumeTraffic(value);
    setTraffic(value > 0);
  }, []);

  const changeKeyboardVolume = useCallback((value) => {
    setSoundKey(value);
    setVolumeKeyboard(value);
    setKeyboard(value > 0);
  }, []);

  const value = useMemo(
    () => ({
      // Rain
      rain,
      volumeRain,
      cityRain,
      toggleRain,
      changeRainVolume,
      setVolumeRain,
      setCityRain,
      setRain,
      // Traffic
      traffic,
      volumeTraffic,
      cityTraffic,
      toggleTraffic,
      changeTrafficVolume,
      setVolumeTraffic,
      setCityTraffic,
      setTraffic,
      // Keyboard
      keyboard,
      volumeKeyboard,
      soundKey,
      toggleKeyboard,
      changeKeyboardVolume,
      setVolumeKeyboard,
      setSoundKey,
      setKeyboard,
      // Song
      volumeSong,
      setVolumeSong,
      song,
      setSong,
    }),
    [
      rain,
      volumeRain,
      cityRain,
      toggleRain,
      changeRainVolume,
      traffic,
      volumeTraffic,
      cityTraffic,
      toggleTraffic,
      changeTrafficVolume,
      keyboard,
      volumeKeyboard,
      soundKey,
      toggleKeyboard,
      changeKeyboardVolume,
      volumeSong,
      song,
    ]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

/**
 * useAudio - Custom hook for consuming audio context
 */
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}

export default AudioContext;
