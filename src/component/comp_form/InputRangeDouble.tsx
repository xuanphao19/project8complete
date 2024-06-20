import React, { Fragment, useState } from "react";
type props = {
  unit: string;
  rate?: number;
};
const InputRangeDouble: React.FC = ({ unit = "$", rate = 10 }: props) => {
  const [minValue, setMinValue] = useState(19);
  const [maxValue, setMaxValue] = useState(75);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = parseInt(event.target.value);
    setMinValue(newMinValue);
    if (newMinValue > maxValue) {
      setMaxValue(newMinValue);
    }
  };
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = parseInt(event.target.value);
    setMaxValue(newMaxValue);
    if (newMaxValue < minValue) {
      setMinValue(newMaxValue);
    }
  };

  return (
    <Fragment>
      <div className="range-double">
        <div className="range-slide position-relative w-100 my-5">
          <input
            type="range"
            id="range-min"
            min="0"
            max="100"
            value={minValue}
            onChange={handleMinChange}
          />
          <input
            type="range"
            id="range-max"
            min="0"
            max="100"
            value={maxValue}
            onChange={handleMaxChange}
          />
          <div className="slide position-absolute top-0 w-100 h-100 rounded-5">
            <div
              className="line position-absolute top-0 h-100 bg-warning"
              id="line"
              style={{ left: `${minValue}%`, right: `${100 - maxValue}%` }}></div>
            <span
              className="thumb position-absolute rounded-circle bg-body z-2 text-warning"
              id="thumbMin"
              style={{ left: `${minValue}%` }}></span>
            <span
              className="thumb position-absolute rounded-circle bg-body z-2 text-warning"
              id="thumbMax"
              style={{ left: `${maxValue}%` }}></span>
          </div>
        </div>
        <div className="d-flex align-items-center flex-wrap row-gap-3 gap-4 w-100">
          <div className="m-auto">
            <p className="minimum fs-3 pb-2">Minimum:</p>
            <label
              className="range-min w-100 px-4 py-2 fs-5 fst-italic rounded-3"
              htmlFor="range-min">{`${unit} ${minValue * rate} . 000`}</label>
          </div>
          <div className="m-auto">
            <p className="maximum fs-3 pb-2">Maximum:</p>
            <label
              className="range-max w-100 px-4 py-2 fs-5 fst-italic rounded-3"
              htmlFor="range-max">{`${unit} ${maxValue * rate} . 000`}</label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InputRangeDouble;
