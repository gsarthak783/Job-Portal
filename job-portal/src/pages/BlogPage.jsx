import React from "react";
import { useEffect } from "react";
 
const BlogPage = () => {

    useEffect(() => {
        window.scrollTo(0,0);
      }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Industry Insights</h1>
        <p className="text-lg text-gray-700 mt-2">
          Stay informed about the latest trends and developments in the job market and various industries.
        </p>
      </div>
      <div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Success Stories</h2>
          <p className="text-lg text-gray-700">
            Read inspiring success stories of professionals who have achieved their career goals.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Expert Interviews</h2>
          <p className="text-lg text-gray-700">
            Gain insights from industry experts and thought leaders through exclusive interviews.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Job Search Tips</h2>
          <p className="text-lg text-gray-700">
            Discover valuable tips and strategies to enhance your job search and application process.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Community Engagement</h2>
          <p className="text-lg text-gray-700">
            Join our community discussions and share insights with fellow professionals.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Latest News</h2>
          <p className="text-lg text-gray-700">
            Stay updated with the latest news and updates from CareerForge and the job market.
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default BlogPage;