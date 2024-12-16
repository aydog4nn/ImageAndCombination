import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "http://localhost:8080/api/users/file"
const BASE_URL2 = "http://localhost:8080/api/products/personal"

export const uploadImage = createAsyncThunk(
    "advice/uploadImage",
    async ({imageFile, id},thunkAPI) => {



        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const response = await axios.post(`${BASE_URL}/${id}`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data",
                }
            });
            await thunkAPI.dispatch(fetchProductsByPersonal(id  ))
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Fotograf yuklenemedi!")
        }
    }
)

export const fetchProductsByPersonal = createAsyncThunk(
    "advice/fetchProductsByPersonal",
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(BASE_URL2 + "/" + id);
            console.log("API Yanıtı (fetchProductsByPersonal):", response.data); // Konsolda kontrol et
            return response.data;
        } catch (error) {
            console.error("API Hatası:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue("Ürünler getirilemedi!");
        }
    }
);

const initialState = {
    imageURL : null,
    personalProducts: [],
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
            .addCase(fetchProductsByPersonal.pending, (state) => {
                state.loading = true;
                state.pending = null;
            })
            .addCase(fetchProductsByPersonal.fulfilled, (state, action) => {
                state.loading = false;
                state.personalProducts = action.payload;
                console.log("yuklendi",action.payload);
            })
            .addCase(fetchProductsByPersonal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error(action.payload);
            })

    }

})

export default AdviceSlice.reducer;