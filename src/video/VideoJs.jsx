import React, { useEffect, useState, memo, useCallback, useRef, forwardRef, useImperativeHandle } from "react";

const VideoJs = forwardRef(
  (
    {
      id = "",
      videoUrl,
      width = "746",
      height = "519",
      volValue = 10,
      classVideo,
      playback = false,
      getState = () => {},
      onTimeUpdate = () => {},
      srcThumb = "https://files.fullstack.edu.vn/f8-prod/public-images/65b67e8b9f5a4.png",
    },
    ref,
  ) => {
    const videoRef = useRef(null);
    const [isPlay, setIsPlay] = useState(false);
    const [volume, setVolume] = useState(100);

    useEffect(() => {
      setVolume(volValue);
      if (videoRef.current) videoRef.current.volume = volValue * 0.01;
    }, [volValue]);

    useImperativeHandle(ref, () => ({
      play() {
        handlePlay();
      },
      pause() {
        handlePause();
      },
      playback() {
        handlePlayback();
      },
      replay(timeReplay) {
        if (timeReplay) videoRef.current.currentTime = timeReplay;
      },
      togglePlay() {
        handleTogglePlay();
      },
      getCurrentTime() {
        return videoRef.current ? videoRef.current.currentTime : 0;
      },
      getDuration() {
        return videoRef.current ? videoRef.current.duration : 0;
      },
      volume(event) {
        if (!videoRef.current || !event) return;
        videoRef.current.volume = volume * 0.01;
        const videoId = videoRef.current.id;
        const volumeBtn = event.target?.closest(".volume-ctrl");
        if (!volumeBtn) return {};
        const btnName = volumeBtn?.getAttribute("name");
        const currVolume = videoRef.current.volume;
        if ((btnName === "increase" && volume === 100 && currVolume === 1) || (btnName === "minus" && volume === 0 && currVolume === 0)) {
          volumeBtn?.classList.remove("counting");
          return {};
        } else {
          const newNum = btnName === "increase" ? volume + 1 : btnName === "minus" && volume - 1;
          volumeBtn?.classList.add("counting");
          setVolume(newNum);
          return { name: btnName, value: newNum, videoId: videoId };
        }
      },
    }));

    const handlePlay = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume * 0.01;
        videoRef.current.play();
        setIsPlay(true);
        getState(true);
      }
    }, [videoRef.current, volume]);

    const handlePause = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlay(false);
        getState(false);
      }
    }, [videoRef.current]);

    const handlePlayback = useCallback(() => {
      if (videoRef.current && playback) {
        videoRef.current.currentTime = 0;
        handlePlay();
      }
    }, [videoRef.current, playback]);

    const handleOnEnded = useCallback(() => {
      if (videoRef.current && playback) {
        videoRef.current.currentTime = 0;
        handlePlay();
      } else {
        videoRef.current.currentTime = 0;
        handlePause();
      }
    }, [videoRef.current, playback]);

    const handleTogglePlay = useCallback(() => {
      if (!videoRef.current) return;
      if (isPlay) {
        handlePause();
      } else {
        handlePlay();
      }
    }, [videoRef.current, isPlay, handlePause, handlePlay]);

    const getTimeUpdate = useCallback(() => {
      if (onTimeUpdate) {
        onTimeUpdate(videoRef.current.currentTime);
      }
    }, [videoRef.current, onTimeUpdate]);

    return (
      <div className="video-js position-relative flex-center user-select-none">
        <video
          id={id}
          ref={videoRef}
          className={classVideo}
          src={videoUrl}
          width={width}
          height={height}
          onEnded={handleOnEnded}
          onTimeUpdate={getTimeUpdate}
        />
        {srcThumb && (
          <div className="thumb-video position-absolute inset-full">
            <img
              src={srcThumb}
              alt="thumbnail"
              style={{ transition: "opacity 0.8s ease-in-out" }}
              className={`thumb-img w-100 h-100 object-fit-cover ${isPlay ? " opacity-0" : ""}`}
              onClick={handleTogglePlay}
            />
          </div>
        )}
      </div>
    );
  },
);
export default memo(VideoJs);
