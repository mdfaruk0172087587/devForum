import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const posts = [
  {
    id: 1,
    title: "React 18 New Features",
    author: "Rakib Hasan",
    authorImg: "https://i.pravatar.cc/40?img=1",
    createdAt: "2 hours ago",
    description: "React 18 introduces concurrent rendering, automatic batching, and more.",
    tag: "React",
    upvotes: 120,
    downvotes: 10,
  },
  {
    id: 2,
    title: "Node.js Performance Tips",
    author: "Amina Akter",
    authorImg: "https://i.pravatar.cc/40?img=2",
    createdAt: "1 day ago",
    description: "Optimize your Node.js apps with clustering, caching, and async patterns.",
    tag: "Node.js",
    upvotes: 95,
    downvotes: 5,
  },
  {
    id: 3,
    title: "Mastering CSS Grid",
    author: "Tanvir Alam",
    authorImg: "https://i.pravatar.cc/40?img=3",
    createdAt: "3 days ago",
    description: "Learn advanced CSS Grid techniques for modern responsive layouts.",
    tag: "CSS",
    upvotes: 87,
    downvotes: 7,
  },
  {
    id: 4,
    title: "Understanding MERN Stack",
    author: "Nusrat Jahan",
    authorImg: "https://i.pravatar.cc/40?img=4",
    createdAt: "5 days ago",
    description: "Step by step guide to build fullstack applications using MERN.",
    tag: "MERN",
    upvotes: 110,
    downvotes: 12,
  },
];

const LatestPost = () => {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            {/* Author info */}
            <div className="flex items-center mb-4">
              <img
                src={post.authorImg}
                alt={post.author}
                className="w-10 h-10 rounded-full mr-3 border-2 border-blue-500"
              />
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-gray-500">{post.createdAt}</p>
              </div>
            </div>

            {/* Post Title */}
            <h4 className="font-bold text-xl mb-2">{post.title}</h4>

            {/* Description */}
            <p className="text-gray-600 mb-3">{post.description}</p>

            {/* Tag */}
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
              {post.tag}
            </span>

            {/* Upvote / Downvote */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <FaArrowUp /> {post.upvotes}
              </div>
              <div className="flex items-center gap-1 text-red-600 font-semibold">
                <FaArrowDown /> {post.downvotes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPost;
