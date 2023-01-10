import * as React from "react";

function ForwardArrow(props) {
  return (
    <svg
      width={33}
      height={33}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      onClick={props.onClick}
    >
      <circle cx={16.5} cy={16.5} r={16.5} fill="#202C56" />
      <path
        d="M12.375 10.267l6.244 6.233-6.244 6.233 1.363 1.33 7.575-7.563-7.575-7.563-1.363 1.33z"
        fill="#fff"
      />
    </svg>
  );
}

export default ForwardArrow;
