import React, { useEffect, useState } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromURL } from "../components/getSpotifyToken";

const Dashboard = () => {
    const spotify = new SpotifyWebApi();
    const [spotifyToken, setSpotifyToken] = useState("")

    useEffect(()=>{
        const userSpotifyToken = getTokenFromURL().access_token;
        // so user doesn't see their token in the URL
        window.location.hash = ""
        if (userSpotifyToken) {
            setSpotifyToken(userSpotifyToken)
            spotify.setAccessToken(userSpotifyToken)
            spotify.getMe().then((user)=>{
                console.log(user)
                // alert(user)
            });
        }
    })

    return (
        <div>
            <h1>Welcome, USER</h1>
        </div>
    )
}

export default Dashboard;