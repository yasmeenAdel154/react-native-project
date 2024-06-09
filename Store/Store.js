import { createStore } from "redux";
// import RootReducer from "./Reducers/CombineReducers";
import CombineReducers from "./Reducers/CombineReducers";


const store = createStore(CombineReducers)

export default store;