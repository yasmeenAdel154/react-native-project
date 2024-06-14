import React, { useLayoutEffect } from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "@rneui/base";
import Icon from 'react-native-vector-icons/Ionicons';
import { FavoriteMovies } from '../Store/Actions/FavoriteMoviesAction';
import { addToCart } from '../Store/Actions/CartActions';

export default function Movies({ navigation }) {
    const [movies, setMovies] = useState([]);
    const cartItems = useSelector((state) => state.cartReducer.cart);
    let favMovies = useSelector((state) => state.myFavoriteMoviesReducer.FavoriteMovies);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then((info) => setMovies(info.data.products))
            .catch((err) => alert(err));
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.cartContainer}>
                    <Icon name="cart" size={30} color="black" onPress={() => navigation.navigate("Cart")} />
                    {cartItems.length > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{cartItems.length}</Text>
                        </View>
                    )}
                </View>
            ),
        });
    }, [navigation, cartItems]);

    const updateFavoriteMovies = (id) => {
        let favMovie = favMovies.find(movie => movie.id === id);
        if (favMovie) {
            favMovie.fav = 0;
            dispatch(FavoriteMovies(favMovies.filter(movie => movie.id !== id)));
        } else {
            favMovie = movies.find(movie => movie.id === id);
            favMovie.fav = 1;
            dispatch(FavoriteMovies([...favMovies, favMovie]));
        }
    };

    const handleAddToCart = (movie) => {
        dispatch(addToCart(movie));
    };

    return (
        <ScrollView>
            <Text>Products</Text>
            <View style={{ display: "flex" }}>
                {movies.map((movie, index) => (
                    <Card key={index}>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Divider />
                        <Card.Image style={{ width: 300, height: 300 }}
                            source={{ uri: movie.images[0] }} />
                        <Button title="Details" onPress={() => navigation.navigate("ProductsDetails", { id: movie.id })} />
                        <Icon style={movie.fav ? styles.icon : styles.darkIcon} name='heart' onPress={() => updateFavoriteMovies(movie.id)} />
                        <Button title="Add to Cart" onPress={() => handleAddToCart(movie)} />
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    icon: {
        color: 'red',
        fontSize: 40,
        alignItems: 'center',
    },
    darkIcon: {
        color: 'black',
        fontSize: 40,
        alignItems: 'center',
    },
    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 3,
        minWidth: 20,
        minHeight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
