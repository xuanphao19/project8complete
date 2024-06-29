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
      muted = false,
      isPlayback = false,
      getState = () => {},
      onTimeUpdate = () => {},
      srcThumb = "https://files.fullstack.edu.vn/f8-prod/public-images/65b67e8b9f5a4.png",
    },
    ref,
  ) => {
    const videoRef = useRef(null);
    const [isPlay, setIsPlay] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(muted);
    const [volume, setVolume] = useState(volValue);

    useEffect(() => {
      setVolume(volValue);
    }, [volValue]);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.muted = muted;
        setIsMuted(muted);
      }
    }, [muted]);

    useImperativeHandle(ref, () => ({
      play,
      pause,
      playback,
      replay,
      getVolume,
      togglePlayPause,
      getCurrentTime: () => videoRef.current?.currentTime || 0,
      getDuration: () => videoRef.current?.duration || 0,
    }));

    const play = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume / 100;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, [volume]);

    const pause = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, []);

    const playback = useCallback(() => {
      if (videoRef.current && isPlayback) {
        videoRef.current.currentTime = 0;
        play();
      }
    }, [videoRef.current, isPlayback]);

    const replay = useCallback(
      (time) => {
        if (videoRef.current && typeof time === "number") {
          videoRef.current.currentTime = time;
          play();
        }
      },
      [play],
    );

    const togglePlayPause = useCallback(() => {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    }, [isPlaying, play, pause]);

    const getVolume = useCallback(
      (action) => {
        let newVolume;
        const videoId = videoRef.current?.id;
        if (action === "increase") {
          newVolume = Math.min(volume + 1, 100);
        } else if (action === "minus") {
          newVolume = Math.max(volume - 1, 0);
        } else return {};

        setVolume(newVolume);
        videoRef.current.volume = newVolume / 100;
        return { name: action, value: Math.floor(newVolume), videoId: videoId };
      },
      [volume],
    );

    useEffect(() => {
      const video = videoRef.current;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleVolumeChange = () => {
        setVolume(video.volume * 100);
        setIsMuted(video.muted);
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("volumechange", handleVolumeChange);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("volumechange", handleVolumeChange);
      };
    }, []);

    const handleOnEnded = useCallback(() => {
      if (videoRef.current && isPlayback) {
        videoRef.current.currentTime = 0;
        play();
      } else {
        videoRef.current.currentTime = 0;
        pause();
      }
    }, [videoRef.current, isPlayback]);

    const getTimeUpdate = useCallback(() => {
      if (onTimeUpdate) {
        onTimeUpdate(videoRef.current.currentTime);
      }
    }, [videoRef.current, onTimeUpdate]);

    useEffect(() => {
      if (videoRef.current) videoRef.current.volume = volume / 100;
    }, [volume]);

    useEffect(() => {
      const video = videoRef.current;

      const handlePlay = () => setIsPlay(true);
      const handlePause = () => setIsPlay(false);
      const handleVolumeChange = () => {
        setVolume(video.volume * 100);
        setIsMuted(video.muted);
      };

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("volumechange", handleVolumeChange);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("volumechange", handleVolumeChange);
      };
    }, []);

    useEffect(() => {
      getState({ isPlaying: isPlay, volume: Math.floor(volume), isMuted: isMuted });
    }, [isPlay, volume, isMuted]);

    return (
      <div className="video-js position-relative flex-center user-select-none">
        <video
          id={id}
          ref={videoRef}
          className={`object-fit-cover ${classVideo}`}
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
              onClick={togglePlayPause}
            />
          </div>
        )}
      </div>
    );
  },
);

export default memo(VideoJs);
