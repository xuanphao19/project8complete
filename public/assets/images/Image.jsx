import React, { useState, forwardRef } from "react";
import f8 from "./f8.png";

const Image = forwardRef(({ src, alt, className, fallback: customFallback = f8, ...props }, ref) => {
  const [fallback, setFallback] = useState("");

  const handleError = () => {
    setFallback(customFallback);
  };

  return (
    <img
      loading="lazy"
      className={className}
      ref={ref}
      src={fallback || src}
      alt={alt ? alt : "Image"}
      {...props}
      onError={handleError}
    />
  );
});
Image.displayName = "Image";
export default Image;
