import React, { useState } from "react";

const PostCard = ({ id, userId, title, body }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-md border border-transparent transition-all duration-300 hover:scale-105 hover:bg-pink-50 hover:border-pink-200 h-full">
      {/* Top: Title */}
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold text-gray-800 capitalize leading-tight">
          {title}
        </h2>
      </div>

      {/* Middle: Body */}
      <div className="flex-grow mb-6 text-center">
        <p className="text-sm text-gray-600 leading-relaxed">
          {body}
        </p>
      </div>

      {/* Bottom: Button */}
      <div className="mt-auto">
        <button
          onClick={handleClick}
          style={{
            backgroundColor: isClicked ? "var(--color-special-red2)" : "#878787",
          }}
          className="w-full py-2 px-4 rounded text-white font-medium transition-all duration-300 hover:brightness-125 cursor-pointer"
        >
          {isClicked ? "Tombol sudah diklik" : "Silakan Klik"}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
