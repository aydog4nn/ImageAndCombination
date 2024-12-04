import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {

    user:[],
    loading:false,
    error:null,
    isLoggedIn:false,
}

const BASE_URL = "http://localhost:8080/api/auth/login";
const REGISTER_URL = "http://localhost:8080/api/auth/register";

export const postUser = createAsyncThunk(
    "postUser",
    async(userData,thunkAPI) =>{
        try {
            const response = await axios.post(BASE_URL, userData);
            console.log(response.data);
            return response.data;

        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const registerUser = createAsyncThunk(
    "registerUser",
    async (userData,thunkAPI) => {
        try {
            const response = await axios.post(REGISTER_URL, userData);
            return response.data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || "Bir seyler sikintili baba");
        }
    }
)


export const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserData(state, action){
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logoutUser(state ){
            state.user = [];
            state.isLoggedIn = false;
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(postUser.pending,(state) => {
                state.loading=true;
                state.error=null;
            })
            .addCase(postUser.fulfilled,(state,action) => {
                state.loading=false;
                state.user = {
                    userId : action.payload.userId,
                    fullName : action.payload.fullName,
                }
                state.isLoggedIn = true;
                localStorage.setItem("userID",action.payload.userId);
                localStorage.setItem("fullName",action.payload.fullName);
                localStorage.setItem("isLoggedIn","true");
            })
            .addCase(postUser.rejected,(state,action) => {
                state.loading=false;
                state.error=action.payload;

            })
            .addCase(registerUser.pending,(state) => {
                state.loading=true;
                state.error=null;
            })
            .addCase(registerUser.fulfilled,(state,action) => {
                state.loading=false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected,(state,action) => {
                state.loading=false;
                state.error = action.payload;
            })
    }
})

export const {setUserData,logoutUser} = UserSlice.actions;
export default UserSlice.reducer;