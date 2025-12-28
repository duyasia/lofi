import { useEffect, useRef, useState } from "react";
import { useAudio } from "../../../store";

const Player = () => {
  const { song, volumeSong } = useAudio();
  const [currentSong, setCurrentSong] = useState(song[0]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();

  const handlePlay = () => setPlaying((s) => !s);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  useEffect(() => {
    audioRef.current.volume = volumeSong / 100;
  }, [volumeSong]);

  useEffect(() => {
    setCurrentSong(song[0]);
  }, [song]);

  const handleClickPrev = () => {
    const index = song.findIndex((x) => x.name === currentSong.name);
    if (index === 0) {
      setCurrentSong(song[song.length - 1]);
    } else {
      setCurrentSong(song[index - 1]);
    }
    setPlaying(true);
  };

  const handleClickNext = () => {
    const index = song.findIndex((x) => x.name === currentSong.name);
    if (index === song.length - 1) {
      setCurrentSong(song[0]);
    } else {
      setCurrentSong(song[index + 1]);
    }
    setPlaying(true);
  };

  return (
    <div className="flex items-center">
      <div className="absolute bottom-[4%] left-[10%] text-[20px] font-[600] text-white">
        {currentSong.name}
      </div>
      <div className="absolute flex items-center justify-center bottom-[4%] z-50 w-full">
        <audio loop src={currentSong.src} ref={audioRef}></audio>
        <div className="flex items-center gap-[20px]">
          <button className="w-[36px] h-[36px]">
            <img
              src="./assets/icon/prev-song.svg"
              alt="prev"
              onClick={handleClickPrev}
            />
          </button>
          <button className="w-[54px] h-[54px]" onClick={handlePlay}>
            {playing ? (
              <img src="./assets/icon/pause-icon.svg" alt="" />
            ) : (
              <img src="./assets/icon/play-icon.svg" alt="" />
            )}
          </button>
          <button className="w-[36px] h-[36px] ml-3">
            <img
              src="./assets/icon/next-song.svg"
              alt="next"
              onClick={handleClickNext}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
