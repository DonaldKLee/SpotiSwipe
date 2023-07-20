import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SpotifyWebApi from 'spotify-web-api-js';
import { getTokenFromURL } from "../components/getSpotifyToken";
import Navbar from "../components/navigationbar";
import { useLocation } from 'react-router-dom'

const StartSwipingPageContainer = styled.div`

`

const SwipeContainer = styled.div`
    width: 1000%;
`

const MusicContainer = styled.div`
    background: #333;
    height: 400px;
    width: 250px;
    border-radius: 20px;
    display: inline-block;
    margin: 10px;
    overflow: hidden;
`

const MusicImage = styled.img`
    height: 240px;
    width: 100%;
`

const MusicName = styled.h3`
`

// DOCS https://jmperezperez.com/spotify-web-api-js/


// validate the option
const StartSwipingPage = () => {
    const spotify = new SpotifyWebApi();
    const [accessTokenURL, setAccessTokenURL] = useState("")
    const [spotifyToken, setSpotifyToken] = useState("")
    const [dataTest, setTestData] = useState("")
    const [songIDs, setSongIDs] = useState([])
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
            let songsInPlaylists = [];
            // get multiple albums
            for (const playlist of selectedPlaylists) {
                // console.log(playlist.id)
                spotify.getPlaylist(playlist.id).then(
                    function (playlistInfo) {
                        for (const song of playlistInfo.tracks.items) {
                            if (!(songsInPlaylists.includes(song.track.id))) {
                                // console.log(song.track.id)
                                songsInPlaylists.push(song.track.id)
                            }
                        }
                        // Updates songsID state
                        setSongIDs(songsInPlaylists)
                    },
                    function (err) {
                        alert("ERROR")
                    }
                );
            }
        }
    }, [spotifyToken])

    // runs if songIDs is updated
    useEffect(() => {
        let recommendations = [];
        // console.log(songIDs[0])
        // console.log({songsInPlaylists}["songsInPlaylists"]["0"])
        const randomlySelectedSongs = []
        for (let i = 0; i<5; i++) {
            randomlySelectedSongs.push(songIDs[Math.floor(Math.random() * songIDs.length)]);
        }

        for (const songID of randomlySelectedSongs) {
            const seeds = {
                seed_tracks: songID
            }

            // waits for all requests to be finished before updating the state
            const fetchRecommendations = async () => {
                const promises = randomlySelectedSongs.map((songID) => {
                  const seeds = {
                    seed_tracks: songID,
                  };
          
                  return spotify.getRecommendations(seeds);
                });
          
                try {
                  const responses = await Promise.all(promises);
                  const recommendations = responses.flatMap((data) => data.tracks);
                  setDisplaySongs(recommendations);
                } catch (err) {
                  console.error(err);
                }
              };
          
              fetchRecommendations();
        }

        // console.log(recommendations)
        setDisplaySongs(recommendations)
    }, [songIDs])

    useEffect(() => {
        console.log(songsToDisplay)
    }, [songsToDisplay])

    return (
        <StartSwipingPageContainer>
            <Navbar />
            <br /><br /><br /><br />
            <SwipeContainer>
                {/* <h1>{Object.keys(songsToDisplay).length}</h1> */}
                {Object.keys(songsToDisplay).length > 0 ? (
                    songsToDisplay.map((song, index) => (
                    <MusicContainer key={index}>
                        <MusicImage src={song["album"]["images"][0].url} />
                        <MusicName style={{ color: "white" }}>{song["name"]}</MusicName>

                        <audio controls>
                        <source src={song["preview_url"]} type="audio/ogg" />
                        Your browser does not support the audio element.
                        </audio>
                    </MusicContainer>
                    ))
                ) : (
                    <p>No songs to display</p>
                )}
            </SwipeContainer>
      
        </StartSwipingPageContainer>
    )
}

export default StartSwipingPage;