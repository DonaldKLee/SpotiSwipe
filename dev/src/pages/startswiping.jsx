import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromURL } from "../components/getSpotifyToken";
import Navbar from "../components/navigationbar";

const StartSwipingPageContainer = styled.div`

`

const StartSwipingPage = () => {
    const spotify = new SpotifyWebApi();
    const [accessTokenURL, setAccessTokenURL] = useState("")
    const [spotifyToken, setSpotifyToken] = useState("")

    useEffect(() => {
        const userSpotifyToken = getTokenFromURL().access_token;
        setAccessTokenURL(window.location.hash)
        // so user doesn't see their token in the URL
        // window.location.hash = ""
        if (userSpotifyToken) {
            setSpotifyToken(userSpotifyToken)
            spotify.setAccessToken(userSpotifyToken)
        }

        // Get playlist suggestions

    }, [spotifyToken])

    return (
        <StartSwipingPageContainer>
            <Navbar />
            <br /><br /><br /><br />
            <h1>Swipe!</h1>
        </StartSwipingPageContainer>
    )
}

export default StartSwipingPage;