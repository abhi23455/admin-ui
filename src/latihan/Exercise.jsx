import React from "react";
import PostCard from "./PostCard";
import { posts } from "./data/posts";

function Exercise() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] py-10 px-4 md:px-10">
      <h1 
        className="text-2xl font-bold text-center mb-10"
        style={{ color: "var(--color-special-red2)" }}
      >
        Post Cards
      </h1>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full mx-auto px-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}

export default Exercise;
