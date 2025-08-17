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
          আমরা গুরুত্বপূর্ণ তথ্য সংগ্রহ করি যেমন তোমার নাম, ইমেইল, এবং ফোরামে করা কার্যক্রম। 
          এই তথ্য ব্যবহার করা হয় personalized experience দেওয়ার জন্য এবং তোমার activities track করার জন্য।
        </p>

        <p>
          <span className="text-xl font-bold">2. Data Usage: </span>
          তোমার তথ্য ব্যবহৃত হয় পোস্ট, কমেন্ট, upvote/downvote এবং অন্যান্য ফোরাম কার্যক্রম পরিচালনা করার জন্য। 
          আমরা তোমার অনুমতি ছাড়া কোন তথ্য বিক্রি বা শেয়ার করি না।
        </p>

        <p>
          <span className="text-xl font-bold">3. Cookies & Analytics: </span>
          লগইন সেশন এবং সাধারণ ব্যবহার উন্নত করার জন্য আমরা কুকিজ এবং মৌলিক analytics ব্যবহার করি। 
          আমরা কোন তৃতীয় পক্ষের ট্র্যাকার বা বিজ্ঞাপন ব্যবহার করি না।
        </p>

        <p>
          <span className="text-xl font-bold">4. Data Security: </span>
          আমরা industry-standard security measures যেমন HTTPS, token-based authentication, এবং encrypted storage ব্যবহার করি তোমার personal data রক্ষা করার জন্য।
        </p>

        <p>
          <span className="text-xl font-bold">5. User Rights: </span>
          তুমি তোমার তথ্যের উপর সম্পূর্ণ control রাখো। 
          চাইলে তোমার data access, change বা delete করতে পারো profile settings থেকে বা support-এর সাথে যোগাযোগ করে।
        </p>

        <p>
          <span className="text-xl font-bold">6. Third-party Services: </span>
          DevForum কোন তৃতীয় পক্ষের commercial service ছাড়া community পরিচালনা করে। 
          কোনো external tool বা service ব্যবহারের আগে তোমার অনুমতি নেয়া হবে।
        </p>
      </div>
    </div>
  );
};

export default Privacy;
