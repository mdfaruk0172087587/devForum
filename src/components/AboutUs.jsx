import React from "react";
import { FaUsers, FaLightbulb, FaLaptopCode, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About DevForum</h1>
        <p className="text-gray-700 text-lg">
          DevForum হলো একটি interactive community যেখানে ডেভেলপাররা knowledge share করতে পারে, 
          নতুন technology শিখতে পারে এবং real-world projects নিয়ে collaborate করতে পারে।
        </p>
      </div>

      {/* Our Mission Section */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            আমাদের লক্ষ্য হলো একটি supportive এবং engaging community তৈরি করা, যেখানে
            নতুন ও অভিজ্ঞ ডেভেলপাররা একে অপরের সাথে interact করে নিজেদের skill উন্নত করতে পারে।
          </p>
          <p className="text-gray-700">
            আমরা শুধু knowledge share করি না, বরং practical experience এবং project-based learning-কে
            encourage করি।
          </p>
        </div>
        <img
          src="https://i.ibb.co.com/v6bWLjyS/devforum7.png"
          alt="Community"
          className="rounded-2xl shadow-lg"
        />
      </div>

      {/* Why Join Us Section */}
      <div className=" mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Join DevForum?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <FaUsers className="text-blue-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Active Community</h3>
            <p className="text-gray-600 text-sm">
              Thousands of developers interact daily, helping you learn faster.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <FaLightbulb className="text-yellow-400 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Innovative Ideas</h3>
            <p className="text-gray-600 text-sm">
              Explore new technologies, tips, and solutions from experts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <FaLaptopCode className="text-green-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Hands-on Projects</h3>
            <p className="text-gray-600 text-sm">
              Work on real-world projects and build your portfolio with guidance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <FaHandshake className="text-purple-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2">Networking</h3>
            <p className="text-gray-600 text-sm">
              Connect with like-minded developers and grow your professional network.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className=" text-center bg-blue-50 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
        <p className="text-gray-700 mb-6">
          Start your journey with DevForum today and be part of an engaging developer community.
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
