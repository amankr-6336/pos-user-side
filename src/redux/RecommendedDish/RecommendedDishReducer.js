import { createSlice } from "@reduxjs/toolkit";



const RecommendedDishSlice=createSlice({
    name:"recommendedDishSlice",
    initialState:{
        r_dishes:[]
    },

    reducers:{
        setRecommendedDish:(state,action)=>{
            state.r_dishes=[...action.payload];
            console.log(state.r_dishes);
        }
    }
})

export default RecommendedDishSlice.reducer;

export const {setRecommendedDish} =RecommendedDishSlice.actions;
