import * as React from "react";

export default function BackwardArrow(props) {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      onClick={props.onClick}
    >
      <circle cx="16.5" cy="16.5" r="16.5" fill="#202C56" />
      <path
        d="M21.3125 22.7335L15.0682 16.5L21.3125 10.2665L19.9495 8.9375L12.375 16.5L19.9495 24.0625L21.3125 22.7335Z"
        fill="white"
      />
    </svg>
  );
}
