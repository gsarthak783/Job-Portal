import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthService from './authService/AuthService';
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
    <Navbar/>
    <div className='min-h-64'>
    <Outlet/>
    </div>
    <Footer />
    </div>
  )
}

export default App
