import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Button, Divider } from '@material-ui/core';
import {List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import iconSpotify from './../../assets/icons/32/spotify.png'
import tmpCover from './../../assets/albumCover.jpg'
import axios from 'axios';
import userRequests from '../../apiConnector';

const qs = require('qs');

const useStyles = makeStyles((theme) => ({
    // List
    root1: {
        width: '100%',
        maxWidth: '60vh',
      },
    root2: {
        width: '100%',
        maxWidth: '60vh',
        maxHeight: '30vh',
        overflow: 'auto'
    },
    // Card
    card: {
        width: '30%',
        Height: '30vh',
        color: '#00000',
        borderRight: '1vh solid #00d95f',
        textAlign: 'center',
        overflow: 'visible',
    },
    //Divs
    headerDiv: {
        marginTop: '0.5vh',
        marginLeft: '-33vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Buttons
    destroyButton: {
        position: 'absolute',
        height: '4vh',
        width: '4vh',
        right: '98%',
        top: '-3%',
    },
    // Icons
    smallerIcon: {
        height: '2vh',
        width: '2vh',
    },
    icon: {
        height: '4.5vh',
        width: '4.5vh',
        marginRight: '3vh',
    },
    // Track infos
    albumCover: {
        height: '5vh',
        width: '5vh',
    }
}));

// ARTIST TOP SONGS
function SpotifyArtistSongs(props) {
    const classes = useStyles();
    const {artist, canBeDeleted, refreshTime, widgetsArray, index, accessToken, username} = props;
    const [isDeleted, setIsDeleted] = useState(false);
    const [tracks, setTracks] = useState([]);

    // DESTORY WIDGET
    const destroyWidget = async () => {
        console.log(widgetsArray[index]);
        userRequests.affectWidgetsDatabase(username, widgetsArray[index], "remove", index);
        widgetsArray.splice(index, 1);
        setIsDeleted(true);
    };

    // PLAY SONG
    const playSong = async (url) => {
        navigate(url);
    };

    const getSongs = async () => {
        console.log(accessToken);
        var tracksArray = [];
        let itemBody = {
            q: artist,
            type: 'artist'
        }
        const item = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                q: artist,
                type: 'artist',
            },
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        const artistId = item.data.artists.items[0].id;
        console.log(artistId);
        const topTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
            params: {
                market: 'FR'
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                tracksArray = response.data.tracks;
            });
        var tmp = [];
        for (var i = 0; i < 5; i++) {
            tmp.push(tracksArray[i]);
        }
        console.log(tmp);
        setTracks(tmp);
    }

    const toMinutesAndSeconds = (time) => {
        var minutes = Math.floor(time / 60000);
        var seconds = ((time % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    useEffect(()=>{
        getSongs();
        setInterval(getSongs, 60000 * refreshTime);
    }, [])
    return (
    <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.card}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                    disabled={isDeleted}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
            <div className={classes.headerDiv}>
                <img src={iconSpotify} className={classes.icon}/>
                <Typography variant="h6">Artist Top Tracks</Typography>
            </div>
            <Typography variant="h4" style={{marginTop: '1vh'}} >{artist}</Typography>
            <List className={classes.root1}>
                {tracks.map((index, key) => (
                    <div key={key}>
                        <ListItem
                            button
                            alignItems="flex-start"
                            onClick={(url) => playSong(index.external_urls.spotify)}
                        >
                            <ListItemAvatar>
                                <Avatar variant="rounded" src={index.album.images[1].url} className={classes.albumCover}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={index.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography>
                                            {toMinutesAndSeconds(index.duration_ms)}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                    </div>
                ))}
            </List>
        </Card>
    </Draggable>
    );
}

// USER PLAYLISTS
function SpotifyUserPlaylists(props) {
    const classes = useStyles();
    const {user, canBeDeleted, refreshTime, widgetsArray, index, accessToken, username} = props;
    const [isDeleted, setIsDeleted] = useState(false);
    const [playlists, setPlaylists] = useState([])

    const destroyWidget = async () => {
        userRequests.affectWidgetsDatabase(username, widgetsArray[index], "remove", index);
        widgetsArray.splice(index, 1);
        setIsDeleted(true);
    };

    // PLAY SONG
    const playSong = async (url) => {
        navigate(url);
    };

    const getPlaylists = async () => {
        const list = await axios.get(`https://api.spotify.com/v1/users/${user}/playlists`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            console.log(response);
            setPlaylists(response.data.items);
        })
    }

    console.log(accessToken);

    useEffect(()=>{
        getPlaylists();
        setInterval(getPlaylists, 60000 * refreshTime);
    }, []);
    return (
        <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.card}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                    disabled={isDeleted}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
            <div className={classes.headerDiv}>
                <img src={iconSpotify} className={classes.icon}/>
                <Typography variant="h6">Public Playlists</Typography>
            </div>
            <Typography variant="h4" style={{marginTop: '1vh'}} >{user}</Typography>
            <List className={classes.root2}>
                {playlists.map((index, key) => (
                    <div key={key}>
                        <ListItem
                            button
                            align-items="flex-start"
                            onClick={(url) => playSong(index.external_urls.spotify)}
                        >
                            <ListItemAvatar>
                                <Avatar variant="rounded" src={index.images[0].url} className={classes.albumCover}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={index.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography>
                                            {index.description.length === 0 ? "No description" : index.description}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        </Card>
    </Draggable>
    );
}

export {
    SpotifyArtistSongs,
    SpotifyUserPlaylists
}