import { configureStore } from "@reduxjs/toolkit";

import CartReducer from './Cart/CartReducer';
import OrderReducer from './order/OrderReducer'
import RecommendedDishReducer from "./RecommendedDish/RecommendedDishReducer";


export default configureStore({
    reducer:{
      CartReducer,
      OrderReducer,
      RecommendedDishReducer
    }
})
