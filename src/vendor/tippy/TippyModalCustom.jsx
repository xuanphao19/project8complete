import React, { memo, forwardRef } from "react";
import Tippy from "@tippyjs/react/headless";

const TippyModalCustom = forwardRef(({ content, className, children, ...props }, ref) => {
  //  appendTo={document.body}
  return (
    <Tippy
      ref={ref}
      render={(attrs) => (
        <div
          className={className}
          tabIndex="-1"
          {...attrs}>
          {content}
        </div>
      )}
      {...props}>
      {children && children}
    </Tippy>
  );
});

export default memo(TippyModalCustom);
