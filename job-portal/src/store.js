import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';

export const reduxStore = configureStore({
    reducer:{
        loginState: loginReducer
    }
});