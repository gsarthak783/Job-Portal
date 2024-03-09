import React from "react";
import { FiSearch } from "react-icons/fi";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = ({ handleInputChange, query }) => {

  const images = [
    "images/banner1.jpg",
    "images/banner3.jpg",
    "images/banner4.jpg",
   
    
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <div className=" relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <div
              className="bg-cover bg-center h-128"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-screen-2xl container mx-auto xl:px-24 md:py-20 py-14 px-4">
          <h1 className="text-5xl font-bold text-black mb-3 ">
            Your <span className="text-blue-700">new job</span> is waiting for you...
          </h1>
          <p className="text-lg font-semibold text-black/70 mb-8">
            Thousands of jobs in the engineering, finance, designing and technology sectors
            are waiting for you.
          </p>

          <form className="">
            <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
              <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block flex-1  outline-none border-2 border-slate-700 bg-transparent py-1.5 pl-8 text-black placeholder:text-black  focus:ring-0 sm:text-sm sm:leading-6 rounded"
                  placeholder="What position are you looking for ?"
                  onChange={handleInputChange}
                  value={query}
                />
                <FiSearch className="absolute mt-2.5 ml-2 text-black" />
              </div>

              <button
                type="submit"
                className="bg-blue-500 py-2 ml-4 px-8 text-white  rounded"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;