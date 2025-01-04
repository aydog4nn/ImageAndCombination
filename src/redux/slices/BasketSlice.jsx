import {createSlice} from "@reduxjs/toolkit";


const basketSlice = createSlice({
    name: "basket",
    initialState: {
        items : [],
    },
    reducers: {
        addToBasket: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({...action.payload,quantity:1});
            }
        },
        removeFromBasket: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        clearBasket:(state) => {
            state.items = [];
        }
    }
})

