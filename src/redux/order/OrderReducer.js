import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:"orderSlice",
    initialState:{
        order:{}
    },

    reducers:{
        orderConfirmed:(state,action)=>{
            state.order=action.payload;
        }
    }
})

export default orderSlice.reducer;
export const{orderConfirmed}=orderSlice.actions;