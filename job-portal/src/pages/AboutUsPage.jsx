import React from "react";
import { LuDot } from "react-icons/lu";

const AboutUsPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">About Us</h1>
        <p className="text-lg text-gray-700 mt-2">
          Learn more about our company and our mission.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            At JobPortal, our mission is to connect job seekers with the right opportunities
            and empower them to achieve their career goals. We strive to make the job search
            process easier, faster, and more effective for everyone.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            Our vision is to become the leading platform for job seekers and employers,
            providing innovative solutions and exceptional service. We aim to create a
            positive impact on the lives of millions by helping them find meaningful employment.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Face of the Comapny</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">A</h3>
            <p className="text-lg text-gray-700">CEO & Co-Founder</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">B</h3>
            <p className="text-lg text-gray-700">CTO & Co-Founder</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-2">C</h3>
            <p className="text-lg text-gray-700">Head of Operations</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Our Values</h2>
        <ol className="list-disc list-inside text-lg text-gray-700">
          <li className="flex flex-cols"> <span className="flex "> <LuDot /></span> Customer Focus</li>
          <li className="flex flex-cols"> <span className="flex "> <LuDot /></span> Innovation</li>
          <li className="flex flex-cols"> <span className="flex "> <LuDot /></span> Integrity</li>
          <li className="flex flex-cols"> <span className="flex "> <LuDot /></span> Teamwork</li>
          <li className="flex flex-cols"> <span className="flex "> <LuDot /></span> Continuous Improvement</li>
        </ol>
      </div>
    </div>
  );
};

export default AboutUsPage;