import React from "react";
import { FaUsers, FaLightbulb, FaLaptopCode, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-600">About DevForum</h1>
        <p className="text-gray-700 text-lg">
          DevForum is an interactive community where developers can share knowledge, learn new technologies, and collaborate on real-world projects.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-600">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Our goal is to create a supportive and engaging community where both new and experienced developers can interact with each other and improve their skills.
          </p>
          <p className="text-gray-700">
           We not only share knowledge but also encourage practical experience and project-based learning.
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
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-600">Why Join DevForum?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <FaUsers className="text-blue-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-600">Active Community</h3>
            <p className="text-gray-600 text-sm">
              Thousands of developers interact daily, helping you learn faster.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <FaLightbulb className="text-yellow-400 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-600">Innovative Ideas</h3>
            <p className="text-gray-600 text-sm">
              Explore new technologies, tips, and solutions from experts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <FaLaptopCode className="text-green-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-600">Hands-on Projects</h3>
            <p className="text-gray-600 text-sm">
              Work on real-world projects and build your portfolio with guidance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center text-center">
            <FaHandshake className="text-purple-500 text-4xl mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-600">Networking</h3>
            <p className="text-gray-600 text-sm">
              Connect with like-minded developers and grow your professional network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
