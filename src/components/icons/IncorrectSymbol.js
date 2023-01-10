import React from "react";

function InCorrectSymbol(props) {
  return (
    <svg
      width={17}
      height={17}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25.5a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zm2.78 6.53a.75.75 0 00-1.06-1.06L8.25 7.69 6.53 5.97a.75.75 0 10-1.06 1.06l1.72 1.72-1.72 1.72a.749.749 0 101.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 001.06-1.06L9.31 8.75l1.72-1.72z"
        fill="#D80038"
      />
    </svg>
  );
}

export default InCorrectSymbol;
