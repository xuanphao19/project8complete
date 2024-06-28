import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const OverlayContext = createContext();

const useOverlay = () => useContext(OverlayContext);

const OverlayProvider = ({ children }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [classOverlay, setClassOverlay] = useState([]);
  const [opacity, setOpacity] = useState({});
  const [style, setStyle] = useState({});

  const showOverlay = useCallback((style) => {
    if (style) setStyle(style);
    setIsOverlayVisible(true);
  }, []);

  const hideOverlay = useCallback(() => {
    setClassOverlay([]);
    setOpacity({});
    setStyle({});
    setIsOverlayVisible(false);
  }, []);

  useEffect(() => {
    const newClassOverlay = [];
    const newOpacity = {};

    Object.keys(style).forEach((key) => {
      if (key === "opacity") {
        let opacity = Number(style[key]);
        opacity = opacity > 1 ? opacity * 0.01 : opacity;
        newOpacity["--bs-bg-opacity"] = opacity;
      } else {
        newClassOverlay.push(`${key}-${style[key]}`);
      }
    });

    setClassOverlay(newClassOverlay);
    setOpacity(newOpacity);
  }, [style]);

  const newClass = `overlay${classOverlay.length ? ` ${classOverlay.join(" ")}` : ""}`;

  return (
    <OverlayContext.Provider value={{ isOverlayVisible, showOverlay, hideOverlay }}>
      {children}
      {isOverlayVisible && (
        <div
          className={newClass}
          style={opacity}
        />
      )}
    </OverlayContext.Provider>
  );
};

export { useOverlay, OverlayProvider };
