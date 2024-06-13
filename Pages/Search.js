import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, SafeAreaView ,  ScrollView, Button  } from 'react-native';
import { Card, color } from "@rneui/base"
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";

export default function Search({ navigation }) {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then((info) => setData(info.data.products))
            .catch((err) => alert(err))
    }, [])
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = (text) => {
        setSearch(text);
        //console.log(search);
        
        const filtered = data.filter((item) =>
            item.title.toLowerCase().includes(text.toLowerCase())
        );
        if (text==='')
            setFilteredData([]);
        else
        setFilteredData(filtered);
        console.log(filtered) ;
        
    };
    useEffect(() => {
        setFilteredData([]);
         handleSearch(search)
         
        console.log(search);
    }, [search])


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color="#aaa" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        value={search}
                        onChangeText={handleSearch}
                    />
                </View>

                {
                    filteredData.map((movie, index) => {
                        return (
                            <Card>
                                <Card.Title> {movie.title} </Card.Title>
                                <Card.Divider />
                                <Card.Image style={{ width: 300, height: 300 }}
                                    source={{ uri: movie.images[0] }} />
                                <Button title="Details" onPress={() => navigation.navigate("ProductsDetails", { id: movie.id })} />
                                <Icon style={movie.fav ? styles.icon2 : styles.darkIcon} name='heart' onPress={() => updateFavoriteMovies(movie.id)} />
                            </Card>
                        )
                    }
                    )}


            </SafeAreaView>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
    },
    itemText: {
        fontSize: 16,
    },
    icon2: {
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
});
