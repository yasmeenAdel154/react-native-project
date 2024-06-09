import { ScrollView, Text, View, Button, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, color } from "@rneui/base"
//import { Icon } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { FavoriteMovies } from '../Store/Actions/FavoriteMoviesAction'
export default function Movies({ navigation }) {
    const [movies, setMovies] = useState([])
    //const [favMovies,setfavMovies] = useState([])
    let favMovies = useSelector((state) => state.myFavoriteMoviesReducer.FavoriteMovies);
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/movie/popular?api_key=aa6fc65fcedb7431af3ac2fbe6484cd0&language=en-US&page=1")
            .then((info) => setMovies(info.data.results))
            .catch((err) => alert(err))
    }, [])
    console.log(movies)
    console.log(favMovies);
    const updateFavoriteMovies = (id) => {

        console.log("updata")
        favMovie = favMovies.find(movie => movie.id === id);
        if (favMovie) {
            favMovie.fav = 0
            dispatch(FavoriteMovies(favMovies.filter(movie => movie.id !== id)))
        }

        else {
            favMovie = movies.find(movie => movie.id === id);
            favMovie.fav = 1
            dispatch(FavoriteMovies([...favMovies, favMovie]))
        }


        //favMovies = useSelector((state) => state.myFavoriteMoviesReducer.FavoriteMovies) ;
        // const todoToEdit = todos.find(item => item.id === id);
        // console.log(todoToEdit) ;
        // setEditId(id);
        // setTodo(todoToEdit.text);
    };


    return (
        <ScrollView>

            <Text>Companies</Text>
            {
                movies.map((movie, index) => {
                    return (
                        <Card>
                            <Card.Title> {movie.title} </Card.Title>
                            <Card.Divider />
                            <Card.Image
                                source={{ uri: movie.backdrop_path }} />
                            <Button title="Details" onPress={() => navigation.navigate("MovieDetails", { id: movie.id })} />
                            <Icon style={movie.fav ? styles.icon : styles.darkIcon} name='heart' onPress={() => updateFavoriteMovies(movie.id)} />
                        </Card>
                    )
                }
                )}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    icon: {
        color: 'red',
        fontSize: 40,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    darkIcon: {
        color: 'black',
        fontSize: 40,
        alignItems: 'center',
        //justifyContent: 'center',
    }

})

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });