import React, { Fragment, forwardRef, useRef, useState, memo, useImperativeHandle } from "react";
import { IconSvg } from "@/component/";

const CountProducts = memo(
  forwardRef(({ onClick, value = 0, ...props }, ref) => {
    const countRef = useRef(null);
    const [count, setCount] = useState(0);

    useImperativeHandle(ref, () => ({
      setCount: (event) => {
        if (countRef.current) {
          const countId = countRef.current.id;
          const countBtn = event.target?.closest(".count-btn");
          if (!countBtn) return {};
          const btnName = countBtn?.getAttribute("name");
          if ((btnName === "increase" && count === 20) || (btnName === "minus" && count === 0)) {
            countBtn?.classList.remove("counting");
            return {};
          } else {
            const newNum = btnName === "increase" ? count + 1 : btnName === "minus" && count - 1;
            countBtn?.classList.add("counting");
            setCount(newNum);
            return { name: countId, value: newNum };
          }
        }
      },
    }));

    return (
      <Fragment>
        <div
          ref={countRef}
          {...props}
          onClick={onClick}>
          <button
            type="button"
            name="minus"
            className="count-btn ctrl-minus flex-center rounded-3 bg-body border">
            <IconSvg
              className="icon icon-ctrl fs-1"
              link="minus-small"
            />
          </button>
          <span className="count">{`${value}`}</span>
          <button
            type="button"
            name="increase"
            className="count-btn ctrl-plus flex-center rounded-3 bg-body border">
            <IconSvg
              className="icon icon-ctrl fs-1"
              link="plus"
            />
          </button>
        </div>

        <div className={`success-message top-0 text-center${count === 20 ? " d-flex" : " d-none"}`}>
          <span className="">
            Mua hàng số lượng lớn <br /> Liên hệ: 0999.999.999 Để nhận ưu đãi!
          </span>
          <button
            type="button"
            className="position-absolute top-0 end-0 btn-close btn-close-success p-3 fs-5"
            onClick={(e) => {
              e.target.parentNode?.classList.remove("d-flex");
              e.target.parentNode?.classList.add("d-none");
            }}></button>
        </div>
      </Fragment>
    );
  }),
);

export default CountProducts;
