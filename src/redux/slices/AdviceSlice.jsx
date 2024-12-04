import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "http://localhost:8080/api/users/file"

export const uploadImage = createAsyncThunk(
    "combinate/uploadImage",
    async ({imageFile, id},thunkAPI) => {



        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const response = await axios.post(`${BASE_URL}/${id}`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data",
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Fotograf yuklenemedi!")
        }
    }
)

const initialState = {
    imageURL : null,
    loading: false,
    error: null,
}

const AdviceSlice = createSlice({
    name:"combinate",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.pending,(state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.loading = false;
                state.imageURL = action.payload;
                console.log("Fotograf basariyla yuklendi",action.payload);
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error("fotograf yuklenirken bir hata olustu",action.payload);
            })
    }
})

export default AdviceSlice.reducer;