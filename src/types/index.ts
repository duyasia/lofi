// Core application types for lofi app
import type { Dispatch, SetStateAction } from 'react';

// Song type - matches dataSong.js structure
export interface Song {
  name: string;
  src: string;
}

// Video set type for background videos
export interface VideoSet {
  day: string;
  rainyDay: string;
  night: string;
  rainyNight: string;
}

// Mood type for playlist selection
export type MoodType = 'chill' | 'jazzy' | 'sleep';

// Audio Context types
export interface AudioContextType {
  // Rain state
  rain: boolean;
  volumeRain: number;
  cityRain: number;
  toggleRain: () => void;
  changeRainVolume: (value: number) => void;
  setVolumeRain: Dispatch<SetStateAction<number>>;
  setCityRain: Dispatch<SetStateAction<number>>;
  setRain: Dispatch<SetStateAction<boolean>>;
  // Traffic state
  traffic: boolean;
  volumeTraffic: number;
  cityTraffic: number;
  toggleTraffic: () => void;
  changeTrafficVolume: (value: number) => void;
  setVolumeTraffic: Dispatch<SetStateAction<number>>;
  setCityTraffic: Dispatch<SetStateAction<number>>;
  setTraffic: Dispatch<SetStateAction<boolean>>;
  // Keyboard state
  keyboard: boolean;
  volumeKeyboard: number;
  soundKey: number;
  toggleKeyboard: () => void;
  changeKeyboardVolume: (value: number) => void;
  setVolumeKeyboard: Dispatch<SetStateAction<number>>;
  setSoundKey: Dispatch<SetStateAction<number>>;
  setKeyboard: Dispatch<SetStateAction<boolean>>;
  // Song state
  volumeSong: number;
  setVolumeSong: Dispatch<SetStateAction<number>>;
  song: Song[];
  setSong: Dispatch<SetStateAction<Song[]>>;
}

// Video Context types
export interface VideoContextType {
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  fullscreen: boolean;
  setFullscreen: Dispatch<SetStateAction<boolean>>;
  // Scene navigation
  currentScene: string;
  currentVideos: VideoSet;
  changeScene: (sceneId: string) => void;
}

// UI Context types
export interface UIContextType {
  enter: boolean;
  setEnter: Dispatch<SetStateAction<boolean>>;
}

// Component prop types
export interface VideoBackgroundProps {
  videos: VideoSet;
  className?: string;
}

export interface ActionPopoverProps {
  label: string;
  audioSrc?: string;
  isActive: boolean;
  volume: number;
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
  position: string;
  zIndex?: string;
}

export interface MoodPanelProps {
  isOpen: boolean;
  clickSleep: boolean;
  clickJazzy: boolean;
  clickChill: boolean;
  volumeSong: number;
  volumeTraffic: number;
  volumeRain: number;
  volumeKeyboard: number;
  onClickSleep: () => void;
  onClickJazzy: () => void;
  onClickChill: () => void;
  onChangeVolumeSong: (e: Event, value: number | number[]) => void;
  onChangeTraffic: (e: Event, value: number | number[]) => void;
  onChangeRain: (e: Event, value: number | number[]) => void;
  onChangeKeyboard: (e: Event, value: number | number[]) => void;
}

export interface PanelProps {
  isOpen: boolean;
}
