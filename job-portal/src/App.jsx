import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthService from './authService/AuthService';
import ErrorBoundry from './components/ErrorBoundary';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshCurrentUser } from './slices/loginSlice';

function App() {
  
  const authservice = AuthService();
  const dispatch = useDispatch();

  useEffect( () => {
    const checkAuth = async () => {
      const isValidToken = await authservice.userVerification();
      console.log("isValid",isValidToken);
      
      if(isValidToken){
        dispatch(refreshCurrentUser(isValidToken));

      }
     
    }
    checkAuth();
  },[dispatch])

  return (
    <div>
      <ErrorBoundry>
        
        <Navbar/>
      <div className='min-h-64 mt-16'>
       <Outlet/>
      </div>
       <Footer />
      </ErrorBoundry>
    
    </div>
  )
}

export default App
