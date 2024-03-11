/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../slices/loginSlice';
import Logo from '../assets/Logo.png';
import Logo2 from '../assets/Logo2.png';
const Navbar = () => {

  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(0);

  const { currentUser, loginStatus, errorMessage, isPending } = useSelector(state => state.loginState)
  let userType = currentUser?.userType;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearState());
    navigate('/');

  }


  // menu toggle btn
  const handleMenuToggler = () => {

    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Home" },
    { path: "/salary", title: "Estimates" },

  ];
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-20 px-4 bg-slate-100 fixed w-full top-0 left-0 z-10">
      <nav className="flex justify-between items-center py-4 ">
        <NavLink to="/" className="flex items-center gap-2 ml-8 ">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg> */}
          <img src={Logo2} className="h-10" alt="CareerForge" />
          {/* <span>JobPortal</span> */}
        </NavLink>

        {/* nav items */}
        <ul className="hidden md:flex gap-10">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          {userType === 'user' ? (
            <li>
              <NavLink to="/my-job" className="text-base text-primary">
              Jobs
            </NavLink>
            </li>
            
          ) : (
            <>
              {userType === 'company' ? (
                <>
                <li>
                <NavLink to="/my-job" className="text-base text-primary">
                    Applications
                  </NavLink>
                </li>
                 <li>
                 <NavLink to="/post-job" className="text-base text-primary">
                    Post Job
                  </NavLink>
                 </li>
                  
                </>
              ) : (
                <>
                </>)}
            </>

          )}
        </ul>

        {/* sign up signout btn */}
        <div className="text-base text-primary md:flex font-medium space-x-5 hidden lg:block">
          {loginStatus ? (
            <>
              <div className="flex gap-4 items-center">
                <div class="flex flex-cols space-x-2 overflow-hidden">
                  <div className="">
                    <Link to='/profile-page'>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={currentUser?.imageUrl}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="gap-4 mx-4 font-bold">
                    {currentUser?.username}
                  </div>

                </div>
                <button onClick={handleLogout} className="bg-blue-500 py-2 px-5 text-white rounded hover:bg-blue-700">Logout</button>
              </div>
            </>
          ) : (
            <>

              <Link to="/login" className="bg-blue-500 py-2 px-5 text-white rounded hover:bg-blue-700">
                Login
              </Link>
              <Link to="/register"
                className="bg-blue-500 py-2 px-5 text-white rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* mobile menu */}
        <div className="md:hidden block flex flex-cols">
          <div className="flex mx-4">
            {loginStatus ? (
              <div className="flex flex-cols mx-4">
                <div class="flex space-x-2 overflow-hidden">
                  <Link to='/profile-page'>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={currentUser.imageUrl}
                      alt=""
                    />
                  </Link>
                </div>
                <div className="flex font-semibold mx-2">
                  {currentUser.username}
                </div>
              </div>
            ) : (<></>)}
          </div>
          <button className="flex" onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <>
                <FaXmark className="w-5 h-5 text-primary/75" />
              </>
            ) : (

              <FaBarsStaggered className=" flex w-5 h-5 text-primary/75" />

            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      <div
        className={`md:hidden block px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden" }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          {userType === 'user' ? (
            <li className="text-base text-white first:text-white py-1">
              <NavLink to="/my-job" className={({ isActive }) => (isActive ? "active" : "")}>
                Jobs
              </NavLink>
            </li>

          ) : (
            <>
              {userType === 'company' ? (
                <>
                  <li className="text-base text-white first:text-white py-1">
                    <NavLink to="/my-job" className={({ isActive }) => (isActive ? "active" : "")}>
                      Applications
                    </NavLink>
                  </li>
                  <li className="text-base text-white first:text-white py-1">
                    <NavLink to="/post-job" className={({ isActive }) => (isActive ? "active" : "")}>
                      Create Job
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                </>)}
            </>

          )}

          {loginStatus ? (
            <li className="text-white py-1">
              <Link to="/" onClick={handleLogout}
                className={({ isActive }) => (isActive ? "active" : "")}>Logout</Link>
            </li>

          ) : (
            <>
              <li className="text-white py-1">
                <Link to="/login">Login</Link>
              </li>

              <li className="text-white py-1">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Navbar;
