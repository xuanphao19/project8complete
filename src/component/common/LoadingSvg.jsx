import React, { useRef, useEffect } from "react";
import { IconSvg } from "@/component";

const BorderSpinner = ({ spinning = false, success = "", error = "", thumb = "", icon = "", text = "", className = "" }) => {
  const spinRef = useRef(null);
  const svgRef = useRef(null);
  text = text.trim();
  icon = icon === null ? "" : icon ? icon : "Admin";
  icon = thumb ? "" : icon;
  const Loading = "div";
  let spinClass = "flex-center position-relative m-auto fs-2 fst-italic text-info z-3";

  useEffect(() => {
    if (error) {
      spinRef.current.classList.add("text-danger");
    } else {
      spinRef.current.classList.remove("text-danger");
    }
    if (success) {
      spinRef.current.classList.remove("text-info");
      spinRef.current.classList.add("text-success");
    } else {
      spinRef.current.classList.remove("text-success");
      spinRef.current.classList.add("text-info");
    }
  }, [error, success]);

  return (
    <Loading
      ref={spinRef}
      className={`${spinClass}${className ? ` ${className}` : ""}`}>
      {spinning && (
        <svg
          ref={svgRef}
          id="animation"
          style={{ position: "fixed", bottom: "-100vh", width: "0", height: "0" }}>
          <radialGradient
            className="visibility-hidden"
            id="spinner1"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)">
            <stop
              offset="0.1"
              stopColor="currentColor"></stop>
            <stop
              offset=".5"
              stopColor="currentColor"
              stopOpacity=".4"></stop>
            <stop
              offset=".6"
              stopColor="currentColor"
              stopOpacity=".3"></stop>
            <stop
              offset=".8"
              stopColor="currentColor"
              stopOpacity=".2"></stop>
            <stop
              offset="1"
              stopColor="currentColor"
              stopOpacity="0"></stop>
          </radialGradient>
          <circle
            r="70"
            cx="100"
            cy="100"
            fill="none"
            transform-origin="center"
            stroke="url(#spinner1)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="50">
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="1"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"></animateTransform>
          </circle>
        </svg>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        style={{ transform: "scaleY(-1)" }}>
        <use xlinkHref="#animation" />
        <circle
          transform-origin="center"
          fill="none"
          opacity=".2"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          cx="100"
          cy="100"
          r="70"></circle>
      </svg>
      {thumb && (
        <img
          className="rounded-circle position-absolute m-auto"
          style={{ width: "64%", height: "64%", objectFit: "cover" }}
          src={thumb}
          alt="avatar"
        />
      )}
      {text && (
        <span
          className="rounded-circle position-absolute z-3"
          style={{ fontSize: "1em" }}>
          {text}
        </span>
      )}
      {icon && (
        <span className="rounded-circle position-absolute h-50 w-50 m-auto z-3 flex-center">
          <IconSvg
            className="w-75 h-75 mb-2"
            link={icon}
          />
        </span>
      )}
    </Loading>
  );
};

export default BorderSpinner;
