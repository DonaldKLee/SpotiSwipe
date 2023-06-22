import React from "react";
import styled from "styled-components";

import SpotifyLogin from "../components/spotifyLogin";
import Navbar from "../components/navigationbar";

const HomePageContainer = styled.div`
    background: #191414;
    min-height: 100vh;
    width: 100vw;
`

const HomePage = () => {
    return (
        <HomePageContainer>
            <Navbar />
            <h1>SpotiSwipe</h1>
            <SpotifyLogin />
        </HomePageContainer>
    )
}

export default HomePage;