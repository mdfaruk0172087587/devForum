import React from "react";

const featuredPosts = [
  {
    id: 1,
    title: "React 18 New Features",
    author: "Rakib Hasan",
    upvotes: 120,
    image: "https://i.ibb.co.com/L2TqB48/Chat-GPT-Image-Aug-16-2025-11-49-34-AM.png",
  },
  {
    id: 2,
    title: "Node.js Performance Tips",
    author: "Amina Akter",
    upvotes: 95,
    image: "https://i.ibb.co.com/szmzWfc/devforum1.png",
  },
  {
    id: 3,
    title: "Mastering CSS Grid",
    author: "Tanvir Alam",
    upvotes: 87,
    image: "https://i.ibb.co.com/vxpMtyz7/devforum2.png",
  },
  {
    id: 4,
    title: "Understanding MERN Stack",
    author: "Nusrat Jahan",
    upvotes: 110,
    image: "https://i.ibb.co.com/G4pSv39M/devforum3.jpg",
  },
];

const FeaturedPosts = () => {
  return (
    <div className="pb-12">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Posts</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        এখানে আমরা কমিউনিটিতে সবচেয়ে বেশি upvote পাওয়া অথবা pinned পোস্টগুলো highlight করেছি।
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden 
                       hover:shadow-xl hover:bg-blue-50 transform hover:scale-105 
                       transition duration-300"
          >
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">by {post.author}</p>
              <p className="text-sm text-gray-700 font-medium">👍 {post.upvotes} upvotes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
