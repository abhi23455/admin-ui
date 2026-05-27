import React, { useState } from "react";

const PostCard = ({ id, userId, title, body }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="group flex flex-col justify-between p-4 bg-white rounded-lg shadow-sm border-2 border-transparent transition-all duration-300 hover:scale-105 hover:bg-pink-100 hover:border-black hover:brightness-105 hover:shadow-md w-full aspect-square overflow-hidden">
      {/* Top: Title */}
      <div className="text-center h-[30%] flex items-center justify-center">
        <h2 className="text-sm md:text-base lg:text-lg font-bold text-[#1f2937] capitalize leading-tight line-clamp-2 px-1">
          {title}
        </h2>
      </div>

      {/* Middle: Body */}
      <div className="flex-grow flex items-center justify-center text-center px-1 my-1 overflow-hidden">
        <p className="text-[11px] md:text-xs lg:text-sm text-[#4b5563] leading-snug line-clamp-5">
          {body}
        </p>
      </div>

      {/* Bottom: Button */}
      <div className="w-full mt-auto">
        <button
          onClick={handleClick}
          style={{
            backgroundColor: isClicked ? "var(--color-special-red2)" : "#4b5563",
          }}
          className="w-full py-2 px-1 rounded-md text-xs md:text-sm text-white font-bold transition-all duration-300 group-hover:brightness-110 cursor-pointer shadow-sm"
        >
          {isClicked ? "Tombol sudah diklik" : "Silakan Klik"}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
