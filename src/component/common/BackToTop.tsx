import React, { useState, useEffect, memo } from "react";
import { handleListenerEvent, scrollToTop } from "@/utils";
import { IconSvg } from "@/component";

interface BackToTopProps {
  className?: string;
  threshold?: number;
  children?: React.ReactNode;
}
const BackToTop: React.FC<BackToTopProps> = ({ className, threshold = 200, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [appendBtt, setAppendBtt] = useState(false);

  const handleShowHides = (e) => {
    const scrollY = e.currentTarget.scrollY;
    setAppendBtt(scrollY >= threshold - 100);
    setIsVisible(scrollY >= threshold);
  };

  const handleScrollClick = (e) => {
    e.preventDefault();
    scrollToTop(0);
  };

  useEffect(() => {
    handleListenerEvent(true, "scroll", handleShowHides);
    return () => {
      handleListenerEvent(false, "scroll", handleShowHides);
    };
  }, []);

  return (
    <>
      {children ? (
        <div
          className={className}
          onClick={handleScrollClick}>
          {children}
        </div>
      ) : (
        appendBtt && (
          <div
            onClick={handleScrollClick}
            className={`back-to-top position-fixed fs-1 btn btn-outline-info bottom-0 end-0 me-5 mb-5 d-flex px-2 py-2  rounded-4 z-9 text-info bg-transparent ${
              isVisible ? "show" : ""
            }`}>
            <IconSvg
              className="icon-ctrl my-1"
              link="autoScrollTop"
            />
          </div>
        )
      )}
    </>
  );
};
// btn  rounded-4 px-5 py-2 text-primary fs-3
export default memo(BackToTop);
