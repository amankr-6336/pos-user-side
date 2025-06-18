import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cartSlice",
    initialState:{
        cart:[],
    },

    reducers:{
        addToCart:(state,action)=>{
            const dish=action.payload;
            console.log(dish);
            const curItem=dish ? {
               name:dish.name,
               price:dish.price,
               _id:dish._id 
            }:action.payload;

            const index=state.cart.findIndex(
                (item)=>item._id===curItem._id
            )

            if(index===-1){
                state.cart.push({...curItem,quantity:1});
            }
            else{
                state.cart[index].quantity+=1;
            }
        },

        removeFromCart:(state,action)=>{
            console.log(action.payload);
            const curKey=action.payload._id;

            const index=state.cart.findIndex(
                (item)=>item._id===curKey
            );
            console.log(index);
            if(index===-1){
                return;
            }

            if(state.cart[index].quantity===1){
                state.cart=state.cart.filter(
                    (item)=>item._id!==curKey 
                )
            }
            else{
                state.cart[index].quantity-=1;
            }
        },

        resetCart:(state,action)=>{
            state.cart=[];
        }



    }
})

export default cartSlice.reducer;
export const{addToCart,removeFromCart,resetCart}=cartSlice.actions;