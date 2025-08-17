import React from 'react';

const FAQSection = () => {
  return (
    <div className="py-12">
      {/* Title & Description */}
      <div className="max-w-2xl mx-auto text-center mb-8 ">
        <h2 className="text-3xl font-bold mb-4 text-gray-600">How It Works</h2>
        <p className="text-gray-600">
          DevForum ব্যবহার সংক্রান্ত সাধারণ প্রশ্ন ও উত্তর। এখানে আপনি জানতে পারবেন কিভাবে account
          তৈরি করতে হয়, পোস্ট করতে হয় এবং কমিউনিটি-তে interact করতে হয়।
        </p>
      </div>

      {/* FAQ Items */}
      <div className=" space-y-4">
        <div className="collapse collapse-arrow bg-white border border-base-300">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title font-semibold text-gray-700">
            How do I create an account on DevForum?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            Click the "Sign Up" button at the top-right corner, fill in your details, and verify your
            email to create an account.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-white border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold text-gray-700">
            How can I submit a new post?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            After logging in, click on "Add Post" from your dashboard, fill in the title, description,
            and select relevant tags before submitting.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-white border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold text-gray-700">
            How do I edit or delete my post?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            Go to "My Posts" section, select the post you want to edit or delete, and use the
            available options to update or remove it.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-white border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold text-gray-700">
            How can I upvote or downvote a post?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            Click on the thumbs up or thumbs down icon on any post to express your opinion. Make sure
            you are logged in.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-white border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title font-semibold text-gray-700">
            How do I follow a tag or category?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            Visit the "Tags" section, find your preferred topics, and click "Follow" to get updates
            whenever a new post is added under that tag.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
