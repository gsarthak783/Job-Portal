import React from 'react';
import { useEffect } from 'react';

const PrivacyPolicy = () => {

    useEffect(() => {
        window.scrollTo(0,0);
      }, []);
    
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-500 mb-6">Privacy Policy</h1>
        <div className="prose max-w-none">
          <h2>Introduction</h2>
          <p>
            Welcome to our job portal application's Privacy Policy. Your privacy is important to us. It is our policy to
            respect your privacy regarding any information we may collect from you across our website.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We only collect information about you if we have a reason to do so for example, to provide our services, to
            communicate with you, or to make our services better.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
            </ul>
          </p>
          <h2>Sharing Your Information</h2>
          <p>
            We may disclose your personal information to third parties. However, we will never sell your personal
            information to third parties.
          </p>
          <h2>Security of Your Information</h2>
          <p>
            We are committed to protecting your personal information and use appropriate technical and organizational
            measures to ensure its security.
          </p>
          <h2>Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
