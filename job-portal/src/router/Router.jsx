import React from 'react'
import {createBrowserRouter} from "react-router-dom";

import App from '../App';
import Home from '../pages/Home';
import MyJobs from '../pages/MyJobs';
import SalaryPage from '../pages/SalaryPage';
import CreateJob from '../pages/CreateJob';
import JobDetails from '../pages/JobDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AboutUsPage from '../pages/AboutUsPage';
import TermsOfServicePage from '../pages/Terms';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ErrorPage from '../pages/ErrorPage';
import Privacy from '../pages/Privacy';
import CareersPage from '../pages/CareerPage';
import BlogPage from '../pages/BlogPage';


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/my-job",
            element: <PrivateRoute>
                  <MyJobs/>
            </PrivateRoute>
            
        },
        {
            path: "/salary",
            element: <SalaryPage/>
        },
        {
          path: "/post-job",
          element: <PrivateRoute>
                 <CreateJob/>
          </PrivateRoute>
         
        },
        {
          path:"/jobs/:id",
          element: <JobDetails/>,
        },
        {
          path: "/about-us",
          element: <AboutUsPage/>
        },
        {
          path: "/privacy-policy",
          element: <Privacy/>
        },
        {
          path: "/blog",
          element: <BlogPage/>
        },
        {
          path: "/terms",
          element: <TermsOfServicePage/>
        },
        {
          path: "/profile-page",
          element:<PrivateRoute>
                 <ProfilePage />
          </PrivateRoute>
          
        },
        {
          path: "/careers",
          element: <CareersPage/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        
       
      ],
      
    },

    {
      path: "*",
      element: <ErrorPage />
    }
    
    
  ]);

  



  export default router;