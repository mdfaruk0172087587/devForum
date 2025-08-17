import React from "react";
import { FaRegLightbulb, FaLaptopCode, FaUsers, FaComments } from "react-icons/fa";
import { Link } from "react-router";

const Blog = () => {
  const blogPosts = [
    {
      title: "Why Use DevForum?",
      description: "DevForum ব্যবহার করে তুমি ডেভেলপার কমিউনিটির সাথে যুক্ত হতে পারো, নতুন স্কিল শিখতে পারো, এবং দ্রুত সমাধান পেতে পারো।",
      icon: <FaRegLightbulb className="text-yellow-400 text-4xl mb-4" />,
    },
    {
      title: "Hands-on Learning",
      description: "ডেভেলপাররা বাস্তব প্রকল্পে কাজ করতে পারে, কোড শেয়ার করতে পারে এবং প্র্যাক্টিক্যাল অভিজ্ঞতা অর্জন করতে পারে।",
      icon: <FaLaptopCode className="text-green-500 text-4xl mb-4" />,
    },
    {
      title: "Collaborate with Peers",
      description: "কমিউনিটির মাধ্যমে তুমি অন্যান্য ডেভেলপারদের সাথে collaborate করতে পারো, ফিডব্যাক নিতে পারো এবং সমস্যা সমাধান করতে পারো।",
      icon: <FaUsers className="text-blue-500 text-4xl mb-4" />,
    },
    {
      title: "Share Your Feedback",
      description: "DevForum ব্যবহার করে তুমি নিজের মতামত দিতে পারো, অন্যদের ব্লগ বা পোস্টে comment করতে পারো এবং কমিউনিটি আরও উন্নত করতে সাহায্য করতে পারো।",
      icon: <FaComments className="text-purple-500 text-4xl mb-4" />,
    },
  ];

  return (
    <div className="py-6">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">Why Read Our Blog?</h1>
        <p className="text-gray-700 text-lg">
          এখানে আমরা দেখাবো DevForum ব্যবহার করে তুমি কি উপকার পাবে, কীভাবে কমিউনিটির সাহায্যে দ্রুত শিখতে পারবে এবং ব্যবহারকারীদের অভিজ্ঞতা।
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
