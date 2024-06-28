import React, { Fragment, useRef, useState, useLayoutEffect, useCallback, memo, useImperativeHandle, forwardRef } from "react";
import Tippy from "@tippyjs/react/headless";
import { IconSvg } from "@/component";

const TippyCustom = forwardRef(
  (
    {
      content,
      children,
      arrow = false,
      onHide,
      isFixed = false,
      interactive = true,
      placement = "bottom-end",
      isShowOverlay = false,
      isTriggerClick = false,
      appendTo = document.body,
      overlayClass = "bg-opacity-50",
      arrowClass = "d-none  d-lg-inline-flex align-items-start",
      className = "flex-center bg-body shadow-sm rounded-4",
      ...props
    },
    ref,
  ) => {
    const tippyRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [target, setTarget] = useState(null);

    const toggleModal = useCallback(() => {
      setVisible((prev) => !prev);
    }, [visible]);

    useImperativeHandle(ref, () => ({
      show: () => setVisible(true),
      hide: () => {
        setVisible(false);
        tippyRef.current._tippy.hide();
      },
      getReference: (newTarget) => {
        if (isTriggerClick) {
          updatePosition(newTarget, tippyRef);
          setTarget(newTarget);
        }
      },
    }));

    useLayoutEffect(() => {
      if (!target || !isTriggerClick) return;
      const onResize = () => {
        updatePosition(target, tippyRef);
      };
      window.addEventListener("resize", onResize, { passive: true });
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, [target]);

    const updatePosition = useCallback(
      (target, tippyRef) => {
        if (target && tippyRef.current && tippyRef.current._tippy) {
          const rect = target.getBoundingClientRect();
          tippyRef.current._tippy.setProps({
            getReferenceClientRect: () => rect,
          });
          tippyRef.current._tippy.popperInstance?.update();
        }
      },
      [target, tippyRef],
    );

    // const Content = typeof content === "function" ? content() : content;

    return (
      <Fragment>
        <Tippy
          ref={tippyRef}
          visible={isTriggerClick ? visible : undefined}
          arrow={arrow}
          appendTo={appendTo}
          placement={placement}
          interactive={interactive}
          onHide={onHide}
          popperOptions={
            isFixed && {
              strategy: "fixed",
            }
          }
          onClickOutside={toggleModal}
          {...props}
          render={(attrs) => (
            <Fragment>
              <div
                className={`tippy-content mt-5 ${className}`}
                tabIndex="-1"
                role="tooltip"
                {...attrs}>
                {arrow && (
                  <div
                    id="arrow"
                    data-popper-arrow
                    className={`tippy-arrow z-3 ${arrowClass ? ` ${arrowClass}` : ""}`}>
                    <IconSvg
                      className={`arrow position-relative`}
                      link="arrow-up-triangle"
                    />
                  </div>
                )}
                {content && content}
              </div>
            </Fragment>
          )}>
          <div
            className={`btn-toggle-modal cursor-pointer ${!children && !visible ? "d-none" : ` ${!children ? "w-0 h-0" : "d-flex"}`}`}
            onClick={interactive && toggleModal}>
            {children}
          </div>
        </Tippy>
      </Fragment>
    );
  },
);

// Điều khiển Modal từ bên ngoài thông qua tham chiếu!
const closeModal = (event, tippyReference, attr) => {
  const modal = attr ? attr : event.currentTarget.getAttribute("data-reference");
  if (tippyReference && modal) tippyReference[modal]?.hide();
  else tippyReference?.hide();
};
const setNewReference = (tippyReference, reference, modal) => {
  // Khởi tạo tham chiếu mới cho Popper
  tippyReference[reference]?.getReference(modal);
  tippyReference[reference]?.show();
};

export { closeModal, setNewReference };
export default memo(TippyCustom);
