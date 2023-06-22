import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromURL } from "../components/getSpotifyToken";
import playlistCoverPlaceholder from "../images/playlistCoverPlaceholder.png"

import Navbar from "../components/navigationbar";

const SelectPlaylistsPageContainer = styled.div`
    background: #191414;
    min-height: 100vh;
    width: 80%;
    color: white;
    display: block;
    margin: 40px auto;
    margin-bottom: 80px;
`
const Intro = styled.h1`
    margin-top: 80px;
`
const PlaylistsContainer = styled.div`
    display: grid;
    grid-gap: 10px;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(300px , 1fr));
    margin: 0 auto;
`
const PlaylistContainer = styled.div`
    background: #333;
    width: 300px;
    height: 80px;
    margin: 10px auto;
    border-radius: 10px;
    overflow: hidden;
`
const PlaylistImage = styled.img`
    width: 80px;
    height: 80px;
    float: left;
`
const PlaylistName = styled.a`
    color: white;
    position: relative;
    top: 15px;
    left: 15px;
`

const StartSwipingButton = styled.a`
    background: #1DB954;
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 20px;
    position: relative;
    top: 30px;
    text-align: center;
    margin: 0 auto;
    display: block;
    width: 200px;
    outline: 2px solid #1DB954;
    transition: 0.2s;
    &:hover {
        background: transparent;
        outline: 2px solid #1DB954;
    }
`

const SelectPlaylistsPages = () => {
    const spotify = new SpotifyWebApi();
    const [accessTokenURL, setAccessTokenURL] = useState("")
    const [spotifyToken, setSpotifyToken] = useState("")
    const [user, setSpotifyUser] = useState("")
    const [playlists, setPlaylists] = useState([])
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
            });
        }

        spotify.getUserPlaylists(user.id)
            .then(function (playlists) {
                console.log(playlists.items);
                setPlaylists(playlists.items)
            }, function (err) {
                console.error(err);
            });

    }, [spotifyToken])

    return (
        <>
            <Navbar />
            <SelectPlaylistsPageContainer>
                <Intro>Welcome, {user.display_name}</Intro>
                <PlaylistsContainer>
                    {playlists && playlists.map((playlist, index) => (
                        <PlaylistContainer key={index}>
                            <PlaylistImage src={playlist.images.length > 0 ? playlist.images[0].url : playlistCoverPlaceholder} />
                            <PlaylistName href={playlist.external_urls["spotify"]} target="_blank">
                                {playlist.name}
                            </PlaylistName>
                            {/* <input type="checkbox"></input> */}
                        </PlaylistContainer>
                    ))}
                </PlaylistsContainer>

                <StartSwipingButton href={"/startswiping" + accessTokenURL}>Start Swiping!</StartSwipingButton>
            </SelectPlaylistsPageContainer>
        </>
    )
}

export default SelectPlaylistsPages;