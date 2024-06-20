import React from "react";
// Đang tải preloader
interface LoadingProps {
  className?: string;
  isLoadSite?: boolean;
  children?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ className = "flex-center", isLoadSite = true }) => {
  return (
    isLoadSite && (
      <div className={`loading-site ${className ? className : ""}`}>
        <div className="loader-content container-fluid flex-center flex-column position-relative text-info w-100 vh-100">
          <span className="flex-center h-25 w-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              style={{ transform: "scaleY(-1)" }}>
              <radialGradient
                id="a2"
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
                transform-origin="center"
                fill="none"
                stroke="url(#a2)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="200 1000"
                strokeDashoffset="50"
                cx="100"
                cy="100"
                r="70">
                <animateTransform
                  type="rotate"
                  attributeName="transform"
                  calcMode="spline"
                  dur="2"
                  values="360;0"
                  keyTimes="0;1"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                transform-origin="center"
                fill="none"
                opacity=".2"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
                cx="100"
                cy="100"
                r="70"
              />
            </svg>
            <span className="fs-13 fst-italic position-absolute">Ok!</span>
          </span>
          <p className={`fs-1`}>Loaded 100%</p>
        </div>
      </div>
    )
  );
};

export default Loading;
