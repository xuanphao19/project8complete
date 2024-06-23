import React, { Fragment, useRef, useState, useLayoutEffect, useCallback, memo, useImperativeHandle, forwardRef } from "react";
import Tippy from "@tippyjs/react/headless";
import { IconSvg } from "@/component";

const TippyCustom = forwardRef(
  (
    {
      content,
      children,
      arrow = "false",
      isFixed = false,
      interactive = "true",
      placement = "bottom-end",
      isShowOverlay = false,
      isTriggerClick = false,
      appendTo = document.body,
      overlayClass = "bg-opacity-50",
      arrowClass = "d-none d-lg-flex align-items-start",
      className = "flex-center bg-body shadow-sm rounded-4",
      ...props
    },
    ref,
  ) => {
    const tippyRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [target, setTarget] = useState(null);
    const toggleModal = useCallback(() => setVisible((prev) => !prev), [visible]);

    useImperativeHandle(ref, () => ({
      show: () => setVisible(true),
      hide: () => {
        if (isTriggerClick) {
          setVisible(false);
        } else {
          tippyRef.current._tippy.hide();
        }
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
      window.addEventListener("resize", onResize);
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

    return (
      <Fragment>
        <Tippy
          ref={tippyRef}
          visible={isTriggerClick ? visible : undefined}
          arrow={arrow}
          appendTo={appendTo}
          placement={placement}
          interactive={interactive}
          popperOptions={
            isFixed && {
              strategy: "fixed",
            }
          }
          onClickOutside={toggleModal}
          {...props}
          render={(attrs) => (
            <Fragment>
              {arrow && (
                <div
                  id="arrow"
                  data-popper-arrow
                  className={`tippy-arrow z-3 ${arrowClass}`}>
                  <IconSvg
                    className="arrow position-relative"
                    link="arrow-up-triangle"
                  />
                </div>
              )}

              <div
                className={`tippy-content mt-5 p-5 ${className}`}
                tabIndex="-1"
                role="tooltip"
                {...attrs}>
                {content && content}
              </div>
            </Fragment>
          )}>
          <div
            className={`btn-toggle-modal cursor-pointer ${!children && !visible ? "d-none" : "d-flex"}`}
            onClick={interactive && toggleModal}>
            {visible && isShowOverlay && <div className={`overlay ${overlayClass}`}></div>}
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
