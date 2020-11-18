import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import iconSpotify from './../../assets/icons/32/spotify.png'

const useStyles = makeStyles((theme) => ({
    // Card
    card: {
        width: '30%',
        minHeight: '30vh',
        backgroundColor: '#f5f5f5',
        color: '#00000',
        borderRight: '1vh solid springgreen',
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
        right: '94%',
        top: '-8%',
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
}));

// ARTIST TOP SONGS
function SpotifyArtistSongs(props) {
    const classes = useStyles();
    const {artist, canBeDeleted, refreshTime} = props;

    const destroyWidget = async () => {
        alert('vous me le bannez lui!');
    };

    return (
    <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.card}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
            <div className={classes.headerDiv}>
                <img src={iconSpotify} className={classes.icon}/>
                <Typography variant="h6">Artist Top Tracks</Typography>
            </div>
        <Typography variant="h4" style={{marginTop: '1vh'}} >{artist}</Typography>
        </Card>
    </Draggable>
    );
}

// USER PLAYLISTS
function SpotifyUserPlaylists(props) {
    const classes = useStyles();
    const {user, canBeDeleted, refreshTime} = props;

    const destroyWidget = async () => {
        alert('vous me le bannez lui!');
    };

    return (
    <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.card}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
        <Typography variant="h6">{user}</Typography>
        </Card>
    </Draggable>
    );
}

export {
    SpotifyArtistSongs,
    SpotifyUserPlaylists
}