import React, { useEffect, useState } from "react";
import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromURL } from "../components/getSpotifyToken";

const Dashboard = () => {
    const spotify = new SpotifyWebApi();
    const [spotifyToken, setSpotifyToken] = useState("")
    const [user, setSpotifyUser] = useState("")
    const [playlists, setPlaylists] = useState([]) 
    useEffect(()=>{
        const userSpotifyToken = getTokenFromURL().access_token;
        // so user doesn't see their token in the URL
        // window.location.hash = ""
        if (userSpotifyToken) {
            setSpotifyToken(userSpotifyToken)
            spotify.setAccessToken(userSpotifyToken)
            spotify.getMe().then((user)=>{
                console.log(user)
                setSpotifyUser(user)
                // alert(user)
            });
        }

        spotify.getUserPlaylists(user.id)
        .then(function(playlists) {
            console.log(playlists.items);
            setPlaylists(playlists.items)
        }, function(err) {
            console.error(err);
        });
    
    },[spotifyToken])

    const renderPlaylists = []
    for (const playlist of playlists) {
        renderPlaylists.push(
            <div>
                <a href={playlist.external_urls["spotify"]} target="_blank">{playlist.name}</a>
            </div>
        )
    }

    return (
        <div>
            <h1>Welcome, {user.display_name}</h1>
            {/* <img src={user.images[0].url} /> */}
            {renderPlaylists}
        </div>
    )
}

export default Dashboard;