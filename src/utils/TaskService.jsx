import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AutoScrollToTop = (top) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: +top,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
};

export default AutoScrollToTop;
