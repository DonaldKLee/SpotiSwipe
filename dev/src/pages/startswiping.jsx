import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromURL } from "../components/getSpotifyToken";
import Navbar from "../components/navigationbar";
import { useLocation } from 'react-router-dom'

const StartSwipingPageContainer = styled.div`

`

const SwipeContainer = styled.div`

`

const MusicContainer = styled.div`
`

// DOCS https://jmperezperez.com/spotify-web-api-js/


// validate the option
const StartSwipingPage = () => {
    const spotify = new SpotifyWebApi();
    const [accessTokenURL, setAccessTokenURL] = useState("")
    const [spotifyToken, setSpotifyToken] = useState("")
    const [dataTest, setTestData] = useState("")
    const [songsToDisplay, setDisplaySongs] = useState([])
    const location = useLocation()
    const selectedPlaylists = location.state.playlists

    useEffect(() => {
        const userSpotifyToken = location.state.token.substring(1)
            .split("&")
            .reduce((initial, item)=>{
                let parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1])
                return initial
        }, {}).access_token;

        setAccessTokenURL(location.state.token)
        if (userSpotifyToken) {
            setSpotifyToken(userSpotifyToken)
            spotify.setAccessToken(userSpotifyToken)
        }
        if (selectedPlaylists) {
            const songsInPlaylists = []
            // get multiple albums
            for (const playlist of selectedPlaylists) {
                // console.log(playlist.id)
                spotify.getPlaylist(playlist.id).then(
                    function (playlistInfo) {
                        for (const song of playlistInfo.tracks.items) {
                            if (!(songsInPlaylists.includes(song.track.id))) {
                                songsInPlaylists.push(song.track.id)
                            }
                        }
                    },
                    function (err) {
                        alert("ERROR")
                    }
                );
            }
    
            console.log(songsInPlaylists)
            Object.keys(songsInPlaylists).map(function(key) {
                console.log(songsInPlaylists[key])
                console.log("AHAHAHHA")
            });
    
            const seeds = {
                seed_tracks: "2vemyNxH2DoqQ6e2lOwSzS"
            }
    
            spotify.getRecommendations(seeds).then(
                function (data) {
                    setDisplaySongs(data.tracks)
                },
                function (err) {
                    console.error(err);
                })
        }
    }, [spotifyToken])

    return (
        <StartSwipingPageContainer>
            <Navbar />
            <br /><br /><br /><br />
            <SwipeContainer>
            {songsToDisplay && songsToDisplay.map((song, index) => (
                <MusicContainer key={index}>
                    <p style={{color:"white"}}>{ song["name"] }</p>
                </MusicContainer>
            ))}
          
            </SwipeContainer>
            <h1>Swipe!</h1>
        </StartSwipingPageContainer>
    )
}

export default StartSwipingPage;