import React from "react";

function CorrectSymbol(props) {
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
        d="M8.25 0a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zm3.576 6.855a.75.75 0 10-1.152-.96l-3.225 3.87-1.669-1.67a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.106-.05l3.75-4.5z"
        fill="#4F62AA"
      />
    </svg>
  );
}

export default CorrectSymbol;
