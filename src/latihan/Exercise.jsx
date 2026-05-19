import PostCard from "./PostCard";
import postsData from "../data/postsData";

function Exercise() {
  return (
    <>
      <div className="min-h-screen bg-gray-06 p-10 pl-20 pr-20">
        <h1 className="text-3xl font-bold text-center mb-10 text-special-red2">
          Post Cards
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full mx-auto px-4">
          {postsData.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>    
    </>
  );
}

export default Exercise;