import React, { Fragment, useEffect, useState, memo, useCallback, useRef } from "react";
import { IconSvg } from "@/component/";
import { TippyCustom } from "@/vendor/";
import VideoJs from "./VideoJs";
/*

*/
const ModalVideo = memo(({ children, videoUrl, reverseState, playback = true }) => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [volume, setVolume] = useState(5);
  const [isPlay, setIsPlay] = useState(false);
  const [videoState, setVideoState] = useState({});
  const [timeReplay, setTimeReplay] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.getDuration();
      setVideoState((prev) => ({ ...prev, duration: videoDuration }));
    }
  }, [isPlay]);

  useEffect(() => {
    reverseState(isVisible);
  }, [isVisible]);

  const handleVisible = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  const stateOnThumb = useCallback((state) => {
    setIsPlay(state);
  }, []);

  const getTimeUpdate = useCallback(
    (currentTime) => {
      setVideoState((prev) => ({ ...prev, timeUpdate: currentTime }));
    },
    [isPlay],
  );

  const handleVolume = useCallback(
    (event) => {
      event.preventDefault();
      const { name, value } = videoRef.current.volume(event);
      if (!name) return;
      setVolume(value);
    },
    [videoRef.current],
  );

  const handleToggleMute = useCallback(
    (event) => {
      if (videoRef.current && event.target) {
        setVideoState((prev) => ({ ...prev, volume: volume }));
        const speakerMark = event.target.closest(".volume-mark");
        if (speakerMark) setVolume(!!volume ? 0 : videoState.volume);
      }
    },
    [volume],
  );

  const handlePlayback = useCallback(() => {
    if (videoRef.current && playback) {
      videoRef.current.playback();
      setIsPlay(true);
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
      videoRef.current.togglePlay();
      setIsPlay(!isPlay);
    }
  }, [videoRef.current]);

  const handleClickOutside = (act) => {
    act.hide();
    setIsVisible(!isVisible);
  };

  const handleClose = () => {};

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
        className="modal-video-detail position-fixed top-50 start-50 translate-middle z-9 border-3 border-info rounded-5 overflow-hidden shadow-lg user-select-none"
        content={
          <div className="modal-content position-relative flex-center use">
            <VideoJs
              ref={videoRef}
              id="video1"
              videoUrl={videoUrl}
              volValue={volume}
              playback={playback}
              getState={stateOnThumb}
              onTimeUpdate={getTimeUpdate}
            />
            <IconSvg
              role="button"
              className={`icon-ctrl position-absolute top-50 start-50 translate-middle text-primary fs-11${
                isPlay ? " opacity-0" : " hover-8 opacity-25"
              }`}
              style={{ transition: "opacity 0.8s ease-in-out" }}
              onClick={handleTogglePlayPause}
              link="play-circle"
            />
            <div className="flex-center flex-shrink-0 p-2 mb-3 position-absolute bottom-0 start-50 translate-middle-x">
              <IconSvg
                role="button"
                className={`icon-ctrl text-info fs-11${isPlay ? " hover-5 opacity-05" : " opacity-0"}`}
                onClick={handleTogglePlayPause}
                link={`${isPlay ? "pause-circle" : "play-circle"}`}
              />
            </div>

            {playback && (
              <div
                className={`flex-center flex-shrink-0 p-3 mb-4 position-absolute bottom-0 end-0 translate-middle-x${
                  isPlay ? " opacity-25 hover-100 z-9" : " opacity-0 z-n1"
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

            <div
              className={`video-ctrl d-flex flex-column align-items-center position-absolute bottom-0 start-0 h-100 pt-4 p-3 fs-14${
                !isPlay ? " opacity-0 z-n1" : " z-9"
              }`}>
              <div className="flex-center flex-column gap-2">
                <IconSvg
                  className={`icon-ctrl volume-mark text-info`}
                  link={`${volume === 0 ? "speaker-x-mark" : "speaker-wave"}`}
                  onClick={handleToggleMute}
                />
                {!!volume && <span className="fs-5 text-body opacity-50">{`${volume}%`}</span>}
              </div>
              <div
                className={`volume${isPlay && " hover-100"} gap-5 flex-center flex-column h-100 opacity-0`}
                style={{ transition: "opacity 0.8s ease-in-out" }}>
                <IconSvg
                  role="button"
                  name="increase"
                  className={`icon-ctrl volume-ctrl mt-auto`}
                  onClick={handleVolume}
                  link="plus-circle"
                />
                <IconSvg
                  role="button"
                  name="minus"
                  className={`icon-ctrl volume-ctrl mx-4 mb-4`}
                  onClick={handleVolume}
                  link="minus-circle"
                />
              </div>
            </div>

            {isPlay && (
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
