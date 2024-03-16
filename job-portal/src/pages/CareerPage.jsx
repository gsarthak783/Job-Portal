import React from "react";
import { useEffect } from "react";
 
const CareersPage = () => {

    useEffect(() => {
        window.scrollTo(0,0);
      }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Explore Opportunities</h1>
        <p className="text-lg text-gray-700 mt-2">
          Discover exciting career opportunities in various industries and sectors.
        </p>
      </div>
      <div className="">
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Apply with Ease</h2>
          <p className="text-lg text-gray-700">
            Simplify your job search process with our user-friendly platform.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Career Development</h2>
          <p className="text-lg text-gray-700">
            Access resources and tools to advance your career and professional growth.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Company Profiles</h2>
          <p className="text-lg text-gray-700">
            Learn more about potential employers and their company culture.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Networking Opportunities</h2>
          <p className="text-lg text-gray-700">
            Connect with industry professionals and expand your professional network.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Industry Insights</h2>
          <p className="text-lg text-gray-700">
            Stay informed about the latest trends and developments in your field of interest.
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default CareersPage;