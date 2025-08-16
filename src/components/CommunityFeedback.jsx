import React from "react";

const CommunityFeedback = () => {
  const feedbacks = [
    {
      id: 1,
      name: "Rakib Hasan",
      role: "Full Stack Developer",
      feedback:
        "DevForum আমাকে নতুন টেক স্ট্যাক শিখতে অনেক সাহায্য করেছে। কমিউনিটি সত্যিই ফ্রেন্ডলি!",
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      name: "Amina Akter",
      role: "Frontend Engineer",
      feedback:
        "এখানে আমি অনেক সমস্যা সমাধানের আইডিয়া পেয়েছি। এক কথায় অসাধারণ একটি প্ল্যাটফর্ম।",
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      name: "Tanvir Alam",
      role: "MERN Stack Learner",
      feedback:
        "শুরু থেকে এখানে গাইডলাইন ফলো করে প্র্যাকটিস করছি। দারুণ একটা লার্নিং এক্সপেরিয়েন্স।",
      image: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      role: "UI/UX Designer",
      feedback:
        "কমিউনিটির রেসপন্সিভনেস দারুণ। প্রশ্ন করলে দ্রুত উত্তর পাই। Highly recommended!",
      image: "https://i.pravatar.cc/100?img=4",
    },
   
  ];

  return (
    <div className="pb-12">
      <h2 className="text-3xl font-bold text-center mb-4">Community Feedback</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        এই প্রজেক্টের উদ্দেশ্য হলো ডেভেলপারদের জন্য একটি interactive কমিউনিটি তৈরি করা, যেখানে
        সবাই knowledge শেয়ার করতে পারে, প্রশ্ন করতে পারে এবং একে অপরের থেকে শিখতে পারে।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {feedbacks.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-full mb-4 border-2 border-blue-500"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{item.role}</p>
            <p className="text-gray-600 italic">“{item.feedback}”</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeedback;
