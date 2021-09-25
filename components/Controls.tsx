import React, { useState } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Controls = ({
  onChange,
  currentMonthIndex,
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentMonthIndex: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white p-4">
      <label htmlFor="months">
        Where to go kite surfing in{" "}
        <span className="text-blue-600 font-bold">
          {months[parseInt(currentMonthIndex)]}
        </span>{" "}
        around Europe?
      </label>
      <div className="flex align-baseline">
        {months[0]}
        <input
          name="months"
          type="range"
          value={currentMonthIndex}
          onChange={onChange}
          min={0}
          max={11}
          step={1}
        />
        {months[11]}
      </div>
    </div>
  );
};

export default Controls;
