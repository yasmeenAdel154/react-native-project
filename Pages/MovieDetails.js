import { Card } from "@rneui/base"
import axios from "axios"
import { useEffect, useState } from "react"
import { View, Text, Image } from "react-native"

export default function MovieDetails({ navigation, route }) {
    const movieID = route.params.id
    // alert(companyID)
    const [movieDetails, setMovieDetails] = useState({})
    console.log(movieID);

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${movieID}?`)

            .then((res) => { setMovieDetails(res.data) })
            .catch((err) => { alert(JSON.stringify(err)) })

    }, [])
    console.log(movieDetails)
    return (
        <View>
            { movieDetails.images && movieDetails.images.length > 0 }
            
            <Card>
                <Card.Title> {movieDetails.title 
                } </Card.Title>
                <Card.Divider />
                {/* <Card.Image style={{width:300,height:300}}
                                source={{ uri: movieDetails.images[0] }} /> */}
                {movieDetails.images && movieDetails.images.length > 0 ? (
                    <Card.Image
                        style={{ width: 300, height: 300 }}
                        source={{ uri: movieDetails.images[0] }}
                    />
                ) : (
                    <Text>No image available</Text>
                )}
                <View>
                    <Text>{movieDetails.description

                    }</Text>
                    <Text style={{ fontWeight: "bold" }}> Price: {movieDetails.price
                    } </Text>
                </View>
            </Card>
        </View>

    )

}