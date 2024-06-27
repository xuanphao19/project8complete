import React, { useEffect, memo, useState, forwardRef } from "react";
import { SVG_STORE } from "@/assets/icons/svg/svgStones.js";
import { loadedIdSvg, appendSymbol } from "@/utils";

const IconSvg = forwardRef(({ className, link, onClick, ...props }, ref) => {
  IconSvg.displayName = "IconSvg";
  link = link ? link.replace(/\s/g, "") : "GitHub";
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (loadedIdSvg.includes(link)) return;
    const samp = appendSymbol(link, SVG_STORE);
    setErrorMsg(samp);
  }, [link]);

  if (errorMsg) {
    return <span className="error-message">{`${errorMsg}`}</span>;
  }

  return (
    <svg
      ref={ref}
      name={link}
      className={`svg-icon${className ? ` ${className}` : ""}`}
      onClick={onClick}
      {...props}>
      <use xlinkHref={`#${link}`} />
    </svg>
  );
});

export default memo(IconSvg);
