import React from "react";
import styled from 'styled-components'

const Login = styled.a`
    background: #1DB954;
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 20px;
    position: relative;
    top: 200px;
    text-align: center;
    margin: 0 auto;
    display: block;
    width: 200px;
`

const SpotifyLogin = () => {
    // Reference: https://javascript.plainenglish.io/how-to-include-spotify-authorization-in-your-react-app-577b63138fd7
    const authEndpoint = "https://accounts.spotify.com/authorize"
    const redirectURI = "http://localhost:3000/options"
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID

    const scopes = [
        "user-read-currently-playing",
        "user-read-playback-state",
        "user-read-recently-played",
        "user-modify-playback-state",
        "user-top-read",
    ]

    const loginURL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`
    // alert(clientId)
    return (
        <Login href={loginURL}>Login with Spotify</Login>
    )
}

export default SpotifyLogin;