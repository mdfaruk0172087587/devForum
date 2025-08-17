import React from 'react';

const Privacy = () => {
  return (
    <div className=" py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">
        DevForum - Privacy Policy
      </h1>

      <div className="space-y-5 text-gray-700 dark:text-gray-300 text-justify leading-relaxed px-2">
        <p>
          <span className="text-xl font-bold">1. Information Collection: </span>
          We collect important information such as your name, email, and activities on the forum. This information is used to provide a personalized experience and to track your activities.
        </p>

        <p>
          <span className="text-xl font-bold">2. Data Usage: </span>
          Your information is used to manage posts, comments, upvotes/downvotes, and other forum activities. We do not sell or share any information without your consent.
        </p>

        <p>
          <span className="text-xl font-bold">3. Cookies & Analytics: </span>
          We use cookies and basic analytics to improve login sessions and overall user experience. We do not use any third-party trackers or advertisements.
        </p>

        <p>
          <span className="text-xl font-bold">4. Data Security: </span>
          We use industry-standard security measures such as HTTPS, token-based authentication, and encrypted storage to protect your personal data.
        </p>

        <p>
          <span className="text-xl font-bold">5. User Rights: </span>
          You have full control over your information. You can access, modify, or delete your data through your profile settings or by contacting support.
        </p>

        <p>
          <span className="text-xl font-bold">6. Third-party Services: </span>
          DevForum operates the community without any third-party commercial services. Your permission will be obtained before using any external tool or service.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
