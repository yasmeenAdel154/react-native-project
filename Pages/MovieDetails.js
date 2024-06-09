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
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=aa6fc65fcedb7431af3ac2fbe6484cd0`)

            .then((res) => { setMovieDetails(res.data) })
            .catch((err) => { alert(JSON.stringify(err)) })

    }, [])
    console.log(movieDetails)
    return (
        <View>
            <Card>
                <Card.Title> {movieDetails.original_title 
                } </Card.Title>
                <Card.Divider />
                <Card.Image source={{
                    uri: movieDetails.backdrop_path
                }} />
                <View>
                    <Text>{movieDetails.overview
                    }</Text>
                    <Text style={{ fontWeight: "bold" }}> Rate: {movieDetails.vote_average
                    } </Text>
                </View>
            </Card>
        </View>

    )

}