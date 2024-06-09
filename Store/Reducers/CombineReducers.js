import { combineReducers } from "redux";
import FavoriteMoviesReducer from "./FavoriteMoviesReducer";


export default combineReducers({
    myFavoriteMoviesReducer: FavoriteMoviesReducer
})