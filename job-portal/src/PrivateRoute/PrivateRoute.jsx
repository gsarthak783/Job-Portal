/* eslint-disable react/prop-types */
import React,{useState,useEffect} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const [loading,setLoading] = useState(true);
  const {currentUser,loginStatus,isPending} = useSelector(state => state.loginState)
 
  useEffect(()=>{
    if(loginStatus){
     setLoading(false);
    }
    else{
      setLoading(true);
    }
    
  },[loginStatus])
  
  // if(loading){
  //   return <div className="text-center text-3xl mx-20">Loading...</div>
  //  } 

      return loginStatus ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )
    
  
};

export default PrivateRoute;