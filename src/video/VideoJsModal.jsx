import React, { Fragment, useEffect, useState, memo, useCallback, useRef } from "react";
import { IconSvg } from "@/component/";
import { TippyCustom } from "@/vendor/";
import { useOverlay } from "@/hooks/";
import VideoJs from "./VideoJs";
import { handleFullscreen } from "@/utils/";

const ModalVideo = memo(({ videoId = "video1", children, videoUrl, overlayOpacity, reverseState, isPlayback = true, startVolume = 19 }) => {
  const progressBarRef = useRef(null);
  const intervalIdRef = useRef(null);
  const videoRef = useRef(null);
  const muteRef = useRef(null);

  const [action, setAction] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const { showOverlay, hideOverlay } = useOverlay();
  reverseState = reverseState ? reverseState : () => {};
  const [isMousedown, setIsMousedown] = useState(false);
  const [videoState, setVideoState] = useState({ isMuted: false, isPlay: false, volume: startVolume, duration: 0, timeReplay: 0 });

  useEffect(() => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.getDuration();
      setVideoState((prev) => ({ ...prev, duration: videoDuration }));
    }
  }, [videoState.isPlay]);

  useEffect(() => {
    setIsVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    !!startVolume && setVideoState((prev) => ({ ...prev, volume: startVolume }));
  }, [startVolume]);

  const handleVisible = useCallback(() => {
    setIsVisible(!isVisible);
    if (!!videoState.duration) handleTogglePlayPause();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      showOverlay({ opacity: overlayOpacity });
    } else {
      hideOverlay();
    }
  }, [isVisible, showOverlay, hideOverlay, overlayOpacity]);

  const handleGetStateVideo = (video) => {
    setVideoState((prev) => ({ ...prev, isMuted: video.isMuted, isPlay: video.isPlaying, volume: video.volume }));
  };

  const getTimeUpdate = useCallback(
    (currentTime) => {
      setVideoState((prev) => ({ ...prev, timeUpdate: currentTime }));
    },
    [videoState.isPlay],
  );

  const handleGetVolume = useCallback(
    (action) => {
      const { name, value } = videoRef.current.getVolume(action);
      if (name) setVideoState((prev) => ({ ...prev, volume: value }));
    },
    [isMousedown, action],
  );

  const handleVolumeChange = useCallback(
    (event) => {
      event.preventDefault();
      if (videoState.isMuted) setVideoState((prev) => ({ ...prev, isMuted: false }));
      const volumeBtn = event.target?.closest(".volume-ctrl");
      const btnName = volumeBtn?.getAttribute("name");
      setIsMousedown(event.type === "mousedown");
      event.target.addEventListener("mouseup", () => setIsMousedown(false), { once: true });
      event.target.addEventListener("mouseout", () => setIsMousedown(false), { once: true });
      setAction({ type: event.type, name: btnName });
    },
    [videoState.volume, videoState.isMuted],
  );

  useEffect(() => {
    if (action.type === "click") {
      handleGetVolume(action.name);
    } else if (!isMousedown) {
      clearInterval(intervalIdRef.current);
    } else {
      intervalIdRef.current = setInterval(() => {
        handleGetVolume(action.name);
      }, 50);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isMousedown, action, handleGetVolume]);

  const handleToggleMuted = useCallback(() => {
    if (videoRef.current) {
      const isMuted = !videoState.isMuted;
      videoRef.current.muted = isMuted;
      setVideoState((prev) => ({ ...prev, isMuted: isMuted }));
    }
  }, [videoState.isMuted]);

  const handlePlayback = useCallback(() => {
    if (videoRef.current && isPlayback) {
      videoRef.current.playback();
      setVideoState((prev) => ({ ...prev, isPlay: true }));
    }
  }, [videoRef.current]);

  const handlePrevNext = useCallback(
    (event) => {
      if (videoRef.current && event.target.id === "nextTime") {
        const currTime = videoRef.current.getCurrentTime();
        currTime && videoRef.current.replay(currTime + 10);
      }
    },
    [videoRef.current],
  );

  const handleProgressBar = useCallback(
    (event) => {
      if (videoRef.current && progressBarRef.current) {
        const rect = progressBarRef.current.getBoundingClientRect();
        const clickPosition = (event.clientX - rect.left) / rect.width;
        const progress = clickPosition * videoState.duration;
        progress && videoRef.current.replay(progress);
      }
    },
    [videoRef.current],
  );

  const handleTogglePlayPause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.togglePlayPause();
      setVideoState((prev) => ({ ...prev, isPlay: !videoState.isPlay }));
    }
  }, [videoRef.current]);

  const handleClickOutside = (act) => {
    act.hide();
    setIsVisible(!isVisible);
  };

  const handleVideoFullscreen = () => {
    handleFullscreen(videoId);
  };

  return (
    <Fragment>
      <TippyCustom
        visible={isVisible}
        isFixed
        isTriggerClick
        isShowOverlay
        interactive
        delay={[0, 500]}
        onClickOutside={handleClickOutside}
        className="modal-video-detail position-fixed top-50 start-50 translate-middle z-9 border-3 border-info rounded-5 overflow-hidden shadow-lg bg-body user-select-none"
        content={
          <div className="modal-content position-relative flex-center use">
            <VideoJs
              ref={videoRef}
              id={videoId}
              videoUrl={videoUrl}
              volValue={videoState.volume}
              muted={videoState.isMuted}
              isPlayback={isPlayback}
              getState={handleGetStateVideo}
              onTimeUpdate={getTimeUpdate}
            />

            <div
              className={`flex-center flex-shrink-0 p-2 mb-3 position-absolute start-50 translate-middle-x ${videoState.isPlay ? " bottom-0" : ""}`}>
              <IconSvg
                role="button"
                className={`icon-ctrl text-info fs-11${videoState.isPlay ? " hover-5 opacity-05" : " hover-8 opacity-25"}`}
                onClick={handleTogglePlayPause}
                link={`${videoState.isPlay ? "pause-circle" : "play-circle"}`}
              />
            </div>

            <div
              className={`video-ctrl d-flex flex-column align-items-center position-absolute bottom-0 start-0 h-100 pt-4 p-3 fs-14${
                !videoState.isPlay ? " opacity-0 z-n1" : " z-9"
              }`}>
              <div className="flex-center flex-column gap-2">
                <IconSvg
                  ref={muteRef}
                  className={`icon-ctrl volume-mark text-info filter: `}
                  style={{ filter: `invert(${videoState.volume * 0.01})` }}
                  link={`${videoState.isMuted || videoState.volume === 0 ? "speaker-x-mark" : "speaker-wave"}`}
                  onClick={handleToggleMuted}
                />
                {!!videoState.volume && !videoState.isMuted && (
                  <span
                    style={{ width: "42px" }}
                    className="flex-center fs-5 text-body bg-black bg-opacity-50 rounded-3 px-2 opacity-50">{`${videoState.volume}%`}</span>
                )}
              </div>

              <div
                className={`volume${videoState.isPlay && " hover-100"} gap-5 flex-center flex-column h-100 opacity-0`}
                style={{ transition: "opacity 0.8s ease-in-out" }}>
                <IconSvg
                  role="button"
                  name="increase"
                  className={`icon-ctrl volume-ctrl text-info mt-auto`}
                  onClick={handleVolumeChange}
                  link="plus-circle"
                />
                <IconSvg
                  role="button"
                  name="minus"
                  className={`icon-ctrl volume-ctrl text-info mx-4 mb-4`}
                  onMouseDown={handleVolumeChange}
                  link="minus-circle"
                />
              </div>
            </div>

            {videoState.isPlay && (
              <Fragment>
                <div
                  className="progress-bar pt-3 pb-4 px-5 w-100 position-absolute start-0 bottom-0 cursor-pointer opacity-10 hover-100 z-9"
                  style={{ transition: "opacity 0.35s ease-in-out" }}
                  onClick={handleProgressBar}>
                  <div
                    ref={progressBarRef}
                    className="progress-bg bg-light bg-opacity-10 rounded-pill">
                    <div
                      className="progress-content pt-1 bg-primary bg-opacity-50 rounded-pill"
                      style={{ width: `${(videoState.timeUpdate / videoState.duration) * 100}%` }}
                    />
                  </div>
                </div>

                {isPlayback && (
                  <div
                    className={`flex-center flex-shrink-0 px-2 me-5 mb-5 position-absolute bottom-0 end-0 translate-middle-x${
                      videoState.isPlay ? " opacity-25 hover-100 z-9" : " opacity-0 z-n1"
                    }`}
                    style={{ transition: "opacity 0.8s ease-in-out" }}
                    onClick={handlePlayback}>
                    <IconSvg
                      role="button"
                      className="icon-ctrl text-info fs-1"
                      link="arrow-path"
                    />
                  </div>
                )}

                <div className="flex-center position-absolute bottom-0 end-0 z-9 pb-1 opacity-75 hover-100">
                  <IconSvg
                    role="button"
                    name="minus"
                    link="F8fullscreen"
                    className="icon-ctrl fs-2 volume-ctrl text-info mx-4 mb-5"
                    onClick={handleVideoFullscreen}
                  />
                </div>
              </Fragment>
            )}
          </div>
        }>
        <div
          className=""
          onClick={handleVisible}>
          {children}
        </div>
      </TippyCustom>
    </Fragment>
  );
});

export default ModalVideo;
