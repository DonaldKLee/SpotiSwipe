import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromURL } from "../components/getSpotifyToken";
import Navbar from "../components/navigationbar";
import Option from "../components/option";

const OptionPageContainer = styled.body`
    background: #191414;
    // min-height: 100vh;
    width: 100%;
    color: white;
    position: relative;
    display: block;
    height: auto;
    margin: 0;
`
const Intro = styled.h2`
    font-size: 1.5em;
    text-align: center;
    position: relative;
    top: 100px;
`

const OptionsContainer = styled.div`
    width: 90%;
    display: grid;
    grid-gap: 60px;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(300px , 1fr));
    margin: 0 auto;
    position: relative;
    margin-top: 140px;
    margin-bottom: 60px;
}

`

const OptionPage = () => {
    const spotify = new SpotifyWebApi();
    const [accessTokenURL, setAccessTokenURL] = useState("")
    const [spotifyToken, setSpotifyToken] = useState("")
    const [user, setSpotifyUser] = useState("")
    const [userData, setUserData] = useState([])

    useEffect(() => {
        const userSpotifyToken = getTokenFromURL().access_token;
        setAccessTokenURL(window.location.hash)
        // so user doesn't see their token in the URL
        // window.location.hash = ""
        if (userSpotifyToken) {
            setSpotifyToken(userSpotifyToken)
            spotify.setAccessToken(userSpotifyToken)
            spotify.getMe().then((user) => {
                console.log(user)
                setSpotifyUser(user)
                // setUserData(userData.append(user.display_name.split(" ")[0]))
            });
        }
    }, [spotifyToken])

    return (
        <OptionPageContainer>
            <Navbar />
            {user && <Intro>Hi {user.display_name.split(" ")[0]}, how would you like to tell us what songs you want?</Intro>}

            <OptionsContainer>
                <Option
                    button="Fill out a quick form"
                    redirect={"/musicpreferences" + accessTokenURL}
                    image="https://storage.googleapis.com/pr-newsroom-wp/1/2020/12/triangle_burst2-pink-nocopy-1920x733.png"
                />
                <Option
                    button="Based on my playlist(s)"
                    redirect={"/selectplaylists" + accessTokenURL}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ_AcFeKXj4Te5hmGXKGxhqugaeIiXLG_BaF7_jW9kw4N8vbxr3gMbaR4lc-Y62y47YNY&usqp=CAU"
                />
                <Option
                    button="Describe it to our AI"
                    redirect={"/tellourai" + accessTokenURL}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSheMHmxESf4MHSGInCEe5-VAObBAMzxE3VAdbEGtLvAF2aR51Ry3kLtytEO_lNH0NFUcE&usqp=CAU"
                />
            </OptionsContainer>
        </OptionPageContainer>
    )
}

export default OptionPage;