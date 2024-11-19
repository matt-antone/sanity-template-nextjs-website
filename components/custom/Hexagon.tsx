"use client";
import * as React from "react";

interface IHexagonProps {
  className?: string;
  color?: string;
  textColor?: string;
  number?: number;
}

const Hexagon: React.FunctionComponent<IHexagonProps> = ({
  className,
  color,
  textColor = "white",
  number = null,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill={color}
        d="M17.1 220c-12.9 22.3-12.9 49.7 0 72l88.3 152.9c12.9 22.3 36.6 36 62.4 36l176.6 0c25.7 0 49.5-13.7 62.4-36L494.9 292c12.9-22.3 12.9-49.7 0-72L406.6 67.1c-12.9-22.3-36.6-36-62.4-36l-176.6 0c-25.7 0-49.5 13.7-62.4 36L17.1 220z"
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="144px" fill={textColor} className="font-bold text-center flex items-center justify-center">
        {number}
      </text>
    </svg>
  );
};

export default Hexagon;
