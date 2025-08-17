import React from "react";
import { FaRegLightbulb, FaLaptopCode, FaUsers, FaComments } from "react-icons/fa";
import { Link } from "react-router";

const Blog = () => {
  const blogPosts = [
    {
      title: "Why Use DevForum?",
      description: "By using DevForum, you can connect with the developer community, learn new skills, and get solutions quickly.",
      icon: <FaRegLightbulb className="text-yellow-400 text-4xl mb-4" />,
    },
    {
      title: "Hands-on Learning",
      description: "Developers can work on real projects, share code, and gain practical experience.",
      icon: <FaLaptopCode className="text-green-500 text-4xl mb-4" />,
    },
    {
      title: "Collaborate with Peers",
      description: "Through the community, you can collaborate with other developers, receive feedback, and solve problems.",
      icon: <FaUsers className="text-blue-500 text-4xl mb-4" />,
    },
    {
      title: "Share Your Feedback",
      description: "By using DevForum, you can share your opinions, comment on others’ blogs or posts, and help improve the community.",
      icon: <FaComments className="text-purple-500 text-4xl mb-4" />,
    },
  ];

  return (
    <div className="py-6">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">Why Read Our Blog?</h1>
        <p className="text-gray-700 text-lg">
          Here, we will show how you can benefit from using DevForum, how you can learn quickly with the help of the community, and users’ experiences.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center text-center min-h-[350px]"
          >
            {post.icon}
            <h3 className="font-semibold text-xl mb-3 text-gray-600">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <Link to='/' className="btn btn-primary rounded-full px-6 py-2 mt-auto hover:scale-105 transition-transform duration-200">
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
