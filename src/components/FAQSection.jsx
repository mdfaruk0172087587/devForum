import React from 'react';

const FAQSection = () => {
  return (
    <div className="pb-12">
      {/* Title & Description */}
      <div className="max-w-2xl mx-auto text-center mb-6 ">
        <h2 className="text-3xl font-bold mb-2 text-gray-600">How It Works</h2>
        <p className="text-gray-600">
         Common questions and answers about using DevForum. Here, you can learn how to create an account, make posts, and interact within the community.
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
