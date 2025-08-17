import React from "react";

const CommunityFeedback = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Jhankar Mahbub",
      role: "Full Stack Developer",
      feedback:
        "DevForum has helped me a lot in learning new tech stacks. The community is truly friendly!",
      image: "https://i.ibb.co.com/mC8H5ZcS/jhonkar.jpg",
    },
    {
      id: 2,
      name: "Azizul Islam Milton",
      role: "Frontend Engineer",
      feedback:
        "Here, I have found many ideas for problem-solving. In short, it’s an amazing platform.",
      image: "https://i.ibb.co.com/h1LXfmrB/milton.jpg",
    },
    {
      id: 3,
      name: "Ahmad Tarique Hasan",
      role: "MERN Stack Learner",
      feedback:
        "I have been following the guidelines here from the beginning and practicing. It’s an amazing learning experience.",
      image: "https://i.ibb.co.com/GvgpgYb1/tariq.jpg",
    },
    {
      id: 4,
      name: "Talha Tarique",
      role: "UI/UX Designer",
      feedback:
        "The community’s responsiveness is excellent. I get quick answers whenever I ask questions. Highly recommended!",
      image: "https://i.ibb.co.com/cc8fhhZB/talha.jpg",
    },
   
  ];

  return (
    <div className="pb-12">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-600">Community Feedback</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Here we showcase a summary of the opinions and experiences shared by our users, offering a glimpse into their feedback and suggestions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {feedbacks.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-full mb-4 border-2 border-blue-500"
            />
            <h3 className="text-lg font-semibold text-gray-600">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.role}</p>
            <p className="text-gray-600 italic">“{item.feedback}”</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeedback;
