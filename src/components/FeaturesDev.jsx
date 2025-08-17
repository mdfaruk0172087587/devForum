import React from 'react';
import { FaUsers, FaThumbsUp, FaComments, FaSearch } from 'react-icons/fa';

const FeaturesDev = () => {
  // Feature data
  const features = [
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: 'User Authentication',
      description: 'Implemented secure login and registration system with JWT tokens. Users can register, log in, and access personalized content safely.',
    },
    {
      icon: <FaThumbsUp className="text-4xl text-green-500" />,
      title: 'Post Voting System',
      description: 'Users can upvote or downvote posts. The most popular posts are sorted dynamically based on vote difference, encouraging community interaction.',
    },
    {
      icon: <FaComments className="text-4xl text-red-500" />,
      title: 'Commenting & Feedback',
      description: 'Users can leave comments on posts, enabling discussions and feedback. Comment count is displayed for each post for better visibility.',
    },
    {
      icon: <FaSearch className="text-4xl text-purple-500" />,
      title: 'Search & Tag Filtering',
      description: 'Implemented a tag-based search system. Users can filter posts by categories, tags, or popularity for a smooth browsing experience.',
    },
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-600">DevForum Features</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Explore the key features implemented in the DevForum project. These features enhance user experience, engagement, and accessibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 flex flex-col items-start gap-4"
          >
            <div>{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-600">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesDev;
