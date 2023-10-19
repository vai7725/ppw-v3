import React from 'react';

export default function DefaultAvatar({ name, classes }) {
  return (
    <div
      className={`${classes} rounded-full bg-purple-300 font-semibold text-center  flex justify-center items-center capitalize `}
    >
      {name[0]}
    </div>
  );
}
