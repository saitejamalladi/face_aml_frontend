import * as React from "react";

function Timer(props) {
  return (
    <svg
      width={18}
      height={18}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 16.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        stroke="#11172E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 12l-1.81-1.81A1.5 1.5 0 019 9.129V4.5"
        stroke="#11172E"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Timer;
