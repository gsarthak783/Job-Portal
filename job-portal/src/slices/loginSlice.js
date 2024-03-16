import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'; 

 
export const userLoginPromiseStatus = createAsyncThunk('user-login',async (userObj,thunkApi)=>{
   try{
     let res = await axios.post('http://localhost:1234/user-api/user-login',userObj)
  
    if(res.data.message==='Login Successful'){
        localStorage.setItem('token',res.data.token)
        
    }
    else{
        return thunkApi.rejectWithValue(res.data.message);
    }
    return res.data;
   }
   catch(err){
return thunkApi.rejectWithValue(err);
   }
   
})

export const refreshCurrentUser = createAsyncThunk('user', async (userObj, thunkApi) => {
    try {
    const res = await axios.post('http://localhost:1234/user-api/user', userObj);
        return res.data;
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});


 
 
export let loginSlice = createSlice({
    name: 'login',
    initialState:{
        currentUser:{},
        loginStatus:false,
        errorMessage:'',
        isPending:false
    },
    reducers: {

        clearState :(state, action) =>{
            state.currentUser = {};
            state.loginStatus = false;
            state.errorMessage = '';
            state.isPending = false;
            localStorage.removeItem('token');
        },


    },
    extraReducers: builder => builder
    .addCase(userLoginPromiseStatus.pending, (state, action) => {
        
        state.isPending = true;
    })
    .addCase(userLoginPromiseStatus.fulfilled, (state, action) => {
       
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        state.errorMessage = '';
        state.isPending = false;
    })
    .addCase(userLoginPromiseStatus.rejected, (state, action) => {
        
        state.currentUser = {};
        state.loginStatus = false;
        state.errorMessage = action.payload;
        state.isPending = false;
    })
    .addCase(refreshCurrentUser.pending, (state, action) => {
        state.loginStatus = '';
        state.isPending = true;
       
    })
    .addCase(refreshCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        state.errorMessage = '';
        state.isPending = false;
    })
    .addCase(refreshCurrentUser.rejected, (state, action) => {
        state.currentUser = {};
        state.loginStatus = false;
        state.errorMessage = action.payload;
        state.isPending = false;
    })
});
 
//export actions
export const {clearState,refreshState} = loginSlice.actions;
//expot root reducer
export default loginSlice.reducer;