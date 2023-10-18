import React from 'react';

export default function DefaultAvatar({ name, width, height, text }) {
  return (
    <div
      className={`w-${width} h-${height}  rounded-full bg-purple-300 font-semibold text-center text-${text} flex justify-center items-center capitalize `}
    >
      {name[0]}
    </div>
  );
}
