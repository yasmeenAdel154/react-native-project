import { combineReducers } from "redux";
import FavoriteMoviesReducer from "./FavoriteMoviesReducer";
import cartReducer from "./CartReducer";


export default combineReducers({
    myFavoriteMoviesReducer: FavoriteMoviesReducer,
    cartReducer: cartReducer
})
