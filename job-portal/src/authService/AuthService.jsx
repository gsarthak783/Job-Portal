import React from 'react';
import axios from 'axios';

const AuthService = () => {

    const userVerification = async () => {
        try{
            const token = localStorage.getItem('token');
            console.log(token);
            if(!token){
                return null;
            }
            const res = await axios.post('http://localhost:1234/user-api/user-login-refresh',{token:token
            });
            console.log(res.data.payload);
            let data = res.data.payload
            return data;
            

        }
        catch (err){
            console.error('Error Validation token:', err);
            return null
        }
    }

    return {
        userVerification
    }
}



export default AuthService;
