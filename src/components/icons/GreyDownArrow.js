import * as React from "react";

function GreyDownArrow(props) {
  return (
    <svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={8} cy={8} r={8} fill="#B6BCD1" />
      <path
        d="M5 6.52c0 .075.03.147.083.2l3.198 3.197a.283.283 0 00.2.083c.078 0 .15-.03.202-.082l3.195-3.194a.28.28 0 00.083-.2.277.277 0 00-.083-.2l-.235-.235a.28.28 0 00-.2-.083.277.277 0 00-.2.083L8.482 8.847 5.718 6.083a.277.277 0 00-.2-.083.277.277 0 00-.2.083l-.235.235A.283.283 0 005 6.52z"
        fill="#fff"
      />
    </svg>
  );
}

export default GreyDownArrow;
