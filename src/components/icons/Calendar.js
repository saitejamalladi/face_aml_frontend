import React from "react";

function Calendar(props) {
  return (
    <svg
      width={18}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 17.1V3.8c0-1.048-.897-1.9-2-1.9h-2V0h-2v1.9H6V0H4v1.9H2c-1.103 0-2 .852-2 1.9v13.3C0 18.148.897 19 2 19h14c1.103 0 2-.852 2-1.9zM6 15.2H4v-1.9h2v1.9zm0-3.8H4V9.5h2v1.9zm4 3.8H8v-1.9h2v1.9zm0-3.8H8V9.5h2v1.9zm4 3.8h-2v-1.9h2v1.9zm0-3.8h-2V9.5h2v1.9zm2-4.75H2v-1.9h14v1.9z"
        fill="#4F62AA"
      />
    </svg>
  );
}

export default Calendar;
