import { ScrollView, Text, View, Button, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, color } from "@rneui/base"
//import { Icon } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { FavoriteMovies } from '../Store/Actions/FavoriteMoviesAction'

export default function FavoriteMoviesList({ navigation }) {
    let favMovies = useSelector((state) => state.myFavoriteMoviesReducer.FavoriteMovies);
    const dispatch = useDispatch();
    console.log(favMovies);
    const updateFavoriteMovies = (id) => {

        console.log("updata")
        favMovie = favMovies.find(movie => movie.id === id);
        
        favMovie.fav = 0
        dispatch(FavoriteMovies(favMovies.filter(movie => movie.id !== id)))  
    };
    return (
        <ScrollView>
        {
            favMovies.map((movie, index) => {
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