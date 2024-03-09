import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-200 text- py-6 ">
      <div className="max-w-screen-2xl container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="mt-2">Email: gsarthak783@gmail.com</p>
            <p>Phone: +1234567890</p>
            <p className="mt-4">Subscribe to our newsletter:</p>
            <form className="mt-2">
              <input
                type="email"
                className="block w-full border-gray-700 rounded-md py-2 px-3 text-gray-500 bg-gray-100 focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Location</h2>
            <p className="mt-2">123 Ghaziabad, Uttar Pradesh, India</p>
            <p className="mt-4">Connect with us:</p>
            <div className="flex mt-2">
              <a href="#" className="text- mr-4 hover:text-black">
                Facebook
              </a>
              <a href="#" className="text- mr-4 hover:text-black">
                Twitter
              </a>
              <a href="#" className="text- mr-4 hover:text-black">
                LinkedIn
              </a>
              <a href="#" className="text- hover:text-black">
                Instagram
              </a>
            </div>
          </div>
          <div className="text-justify">
            <h2 className="text-2xl font-bold">Useful Links</h2>
            <ul className="mt-2">
              <li>
                <Link to="/about-us"  className="text- hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <a href="#" className="text- hover:text-black">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text- hover:text-black">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text- hover:text-black">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text- hover:text-black">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-m mt-6 border-t border-gray-700 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;