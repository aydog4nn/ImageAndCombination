import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {

    user:[],
    loading:false,
    error:null,
}

const BASE_URL = "http://localhost:8080/api/auth/login";
const REGISTER_URL = "http://localhost:8080/api/auth/register";

export const postUser = createAsyncThunk(
    "postUser",
    async(userData,thunkAPI) =>{
        try {
            const response = await axios.post(BASE_URL, userData);
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
            state.data = action.payload;
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
                state.user = action.payload;
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

export const {setUserData} = UserSlice.actions;
export default UserSlice.reducer;