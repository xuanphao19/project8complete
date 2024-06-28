import React, { useRef, useEffect, useState, useCallback } from "react";
import { useImperativeHandle, forwardRef, memo } from "react";
import { useOverlay } from "@/hooks/";
import "./_toast.min.css";

const DreamsFly = forwardRef(
  (
    {
      resetState,
      timer = 3000,
      duration = 500,
      width = "50rem",
      overlayPosition = "fixed",
      overlayOpacity = 0,
      showForever = false,
      outsideCtrl = false,
      variant = "success", // [warning, success, danger] border-success
      direction = "top-right", // Vào từ ["top","right","bottom","left"]
      className = "flex-center p-5 rounded-4",
      children,
    },
    ref,
  ) => {
    const toastRef = useRef(null);
    const overlayRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { showOverlay, hideOverlay } = useOverlay();

    useEffect(() => {
      let timeout;
      if (!showForever) {
        timeout = setTimeout(() => {
          if (isClicked && toastRef.current) handleClose();
        }, timer);
      }

      return () => {
        if (timeout) clearTimeout(timeout);
      };
    }, [timer, isClicked, showForever]);

    useImperativeHandle(ref, () => ({
      toggleToast: toggleVisibility,
    }));
    const handleClose = () => {
      if (toastRef.current) {
        requestAnimationFrame(() => {
          toastRef.current?.classList.add("slide-out");
        });
      }
      setIsClicked(false);
      if (overlayRef.current) {
        overlayRef.current?.classList.add("opacity-out");
      }
      const hideTimeout = setTimeout(() => {
        if (overlayRef.current) {
          document.body.removeChild(overlayRef.current);
          overlayRef.current = null;
        }
        setIsVisible(false);
        reverseToastState(false);
        clearTimeout(hideTimeout);
      }, duration);
    };
    const toggleVisibility = () => {
      if (isClicked) {
        handleClose();
      } else {
        setIsClicked(true);
        setIsVisible(true);
        reverseToastState(true);
      }
    };

    const outsideClose = (event) => {
      if (!event.target.closest(".popup-toast")) {
        toggleVisibility();
      }
    };

    const reverseToastState = (state) => {
      if (typeof resetState === "function") {
        resetState(state);
      }
    };

    useEffect(() => {
      if (isVisible) {
        showOverlay({ position: overlayPosition, opacity: overlayOpacity });
      } else {
        hideOverlay();
      }
    }, [isVisible, showOverlay, overlayPosition, overlayOpacity]);

    const toastClass = `${variant} border-${variant} ${className}${direction ? ` appear-${direction}` : " center"}`;

    return (
      isVisible && (
        <div
          className="toast-container"
          onClick={outsideCtrl ? outsideClose : () => {}}>
          <div
            ref={toastRef}
            className={`popup-toast dreams-fly ${toastClass}`}
            style={{ "--width": width, "--duration": `${duration}ms` }}>
            <div className="toast-content">{children}</div>
          </div>
        </div>
      )
    );
  },
);

export default memo(DreamsFly);
