import React, { useEffect } from "react";

const TermsOfServicePage = () => {
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Terms of Service</h1>
        <p className="text-lg text-gray-700 mt-2">
          Learn more about our terms and conditions.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Acceptance of Terms</h2>
        <p className="text-lg text-gray-700">
          By using our website, you agree to comply with and be bound by these Terms of Service.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">User Conduct</h2>
        <p className="text-lg text-gray-700">
          You agree not to use the website for any unlawful purpose or to violate any applicable laws.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Intellectual Property Rights</h2>
        <p className="text-lg text-gray-700">
          The content on this website, including text, graphics, logos, and images, is the property of
          JobPortal and is protected by copyright laws.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Limitation of Liability</h2>
        <p className="text-lg text-gray-700">
          JobPortal shall not be liable for any damages arising out of the use or inability to use the
          website, even if we have been advised of the possibility of such damages.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Governing Law</h2>
        <p className="text-lg text-gray-700">
          These Terms of Service shall be governed by and construed in accordance with the laws of your
          country.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
