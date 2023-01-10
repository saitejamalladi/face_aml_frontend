import * as React from "react";

function GreyUpArrow(props) {
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
        d="M11.96 9.48a.277.277 0 00-.082-.2L8.68 6.084A.283.283 0 008.48 6a.282.282 0 00-.201.082L5.083 9.276a.28.28 0 00-.083.2c0 .076.03.147.083.2l.235.235a.28.28 0 00.2.083c.076 0 .147-.029.2-.083l2.761-2.758 2.764 2.764a.277.277 0 00.2.083c.076 0 .147-.03.2-.083l.235-.235a.282.282 0 00.083-.202z"
        fill="#fff"
      />
    </svg>
  );
}

export default GreyUpArrow;
