
const INITIAL_VALUE = {
    FavoriteMovies: [],
}
export default function FavoriteMoviesReducer(state=INITIAL_VALUE, action){

        switch(action.type){
            case "CHANGE_FAV_MOVIES":
                return{
                    ...state,
                    FavoriteMovies: action.payload
                }
            default: 
                return state;
        }
}