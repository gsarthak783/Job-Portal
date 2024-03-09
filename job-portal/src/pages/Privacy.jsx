import React from 'react';
import { useEffect } from 'react';

const Privacy = () => {

    useEffect(() => {
        window.scrollTo(0,0);
      }, []);
    
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-blue-700">Privacy Policy</h1>
      <p className="text-lg text-gray-700 mt-2">
        Learn more about how we protect your privacy.
      </p>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Our Commitment to Privacy</h2>
      <p className="text-lg text-gray-700">
        At CareerForge, we are committed to protecting your privacy and ensuring the security of your personal
        information.
      </p>
    </div>
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Information We Collect</h2>
      <p className="text-lg text-gray-700">
        We collect information from you when you register on our site, subscribe to our newsletter, respond to a
        survey, or fill out a form.
      </p>
    </div>
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">How We Use Your Information</h2>
      <p className="text-lg text-gray-700">
        We may use the information we collect from you to personalize your experience, improve our website,
        process transactions, and send periodic emails.
      </p>
    </div>
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Changes to This Privacy Policy</h2>
      <p className="text-lg text-gray-700">
        We reserve the right to update or change our Privacy Policy at any time. Any changes will be effective
        immediately upon posting the updated Privacy Policy on our website.
      </p>
    </div>
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Contact Us</h2>
      <p className="text-lg text-gray-700">
        If you have any questions about our Privacy Policy, please contact us.
      </p>
    </div>
  </div>
  );
};

export default Privacy;
