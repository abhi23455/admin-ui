import React, { useState } from 'react';

function PostCard({ id, userId, title, body }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="group flex flex-col justify-between bg-white p-4 rounded-lg shadow-sm border border-transparent transition-all duration-300 hover:scale-105 hover:border-defaultBlack hover:bg-pink-50">
      <div className="flex flex-col items-center mb-3">
        <h2 className="text-sm font-bold text-center text-gray-800 leading-tight mb-2 capitalize">
          {title}
        </h2>
      </div>
      
      <div className="flex flex-col items-center mb-4">
        <p className="text-gray-500 text-[10px] text-center leading-relaxed">
          {body}
        </p>
      </div>

      <div className="mt-auto">
        <button
            onClick={() => setIsClicked(true)}
            className={`w-full py-1.5 px-3 rounded-md transition-all duration-300 font-medium text-[10px] text-white
                ${isClicked 
                ? 'bg-special-red2 group-hover:brightness-120' 
                : 'bg-gray-500'
                }`}
            >
            {isClicked ? 'Tombol sudah diklik' : 'Silakan Klik'}
        </button>
      </div>
    </div>
  );
}

export default PostCard;