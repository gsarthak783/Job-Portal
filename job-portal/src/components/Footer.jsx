import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useForm} from 'react-hook-form';
import Swal from 'sweetalert2';



const Footer = () => {

  const { register, handleSubmit,reset } = useForm();
 

  const onSubmit = async (userObj) => {
    try{
      console.log(userObj)
      const res = await axios.post("http://localhost:1234/newsletter-api/newsletter-create", userObj)
      console.log(res.data)

      if(res.status===201){
      
        Swal.fire({
          title: 'Success',
          text: 'You have successfully subscribed to the Newsletter',
          icon: 'success',
        });
      }

      if(res.data.message==='Already Subscribed'){
      
       
        Swal.fire({
          title: 'Already Subscribed',
          text: 'You are already subscribed to the Newsletter',
          icon: 'warning',
        });
      }
     
      reset();
    }
    catch(err){

    }
  }
  


  return (
    <footer className="bg-slate-200 text- py-6 ">
      <div className="max-w-screen-2xl container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div className="">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="mt-2">Email: gsarthak783@gmail.com</p>
            <p>Phone: +919897000838</p>
            <p className="mt-4">Subscribe to our newsletter:</p>
            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                className="block w-full border-gray-700 rounded-md py-2 px-3 text-gray-500 bg-gray-100 focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                {...register("email")}
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
            <p className="mt-2">Hyderabad, India</p>
            <p className="mt-4">Connect with us:</p>
            <div className="flex mt-2">
              <a href="https://www.x.com/" target="_blank" className="text- mr-4 hover:text-black">
                Twitter
              </a>
              <a href="https://www.linkedin.com/" target="_blank" className="text- mr-4 hover:text-black">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/" target="_blank" className="text- hover:text-black">
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
              <Link to="/careers"  className="text- hover:text-black">
                  Careers
                </Link>
              </li>
              <li>
              <Link to="/blog"  className="text- hover:text-black">
                  Blog
                </Link>
              </li>
              <li>
              <Link to="/terms"  className="text- hover:text-black">
                 Terms of service
                </Link>
              </li>
              <li>
              <Link to="/privacy-policy"  className="text- hover:text-black">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-m mt-6 border-t border-gray-700 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} CareerForge. All rights reserved.</p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;