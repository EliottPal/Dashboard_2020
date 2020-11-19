import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Button, Divider } from '@material-ui/core';
import {List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import iconSpotify from './../../assets/icons/32/spotify.png'
import tmpCover from './../../assets/albumCover.jpg'

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
        backgroundColor: '#f5f5f5',
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
    const {artist, canBeDeleted, refreshTime, widgetsArray, index} = props;
    const [isDeleted, setIsDeleted] = useState(false);

    // DESTORY WIDGET
    const destroyWidget = async () => {
        console.log(index);
        widgetsArray.splice(index, 1);
        setIsDeleted(true);
    };

    // PLAY SONG
    const playSong = async (url) => {
        navigate(url);
    };

    console.log(index);
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
                {/* TRACK 1 */}
                <ListItem
                    button
                    alignItems="flex-start"
                    onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
                >
                    <ListItemAvatar>
                        <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                    </ListItemAvatar>
                    <ListItemText primary="SICKO MODE"
                        secondary={
                            <React.Fragment>
                            <Typography>
                                4mn05
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* TRACK 2 */}
                <ListItem
                    button
                    alignItems="flex-start"
                    onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
                >
                    <ListItemAvatar>
                        <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                    </ListItemAvatar>
                    <ListItemText primary="STOP TRYING TO BE GOD ft LOGIC, J.COLE, NAV & GUNNA"
                    secondary={
                            <React.Fragment>
                            <Typography>
                                4mn05
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* TRACK 3 */}
                <ListItem
                    button
                    alignItems="flex-start"
                    onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
                >
                    <ListItemAvatar>
                        <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                    </ListItemAvatar>
                    <ListItemText primary="YOSEMITE"
                            secondary={
                            <React.Fragment>
                            <Typography>
                                4mn05
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* TRACK 4 */}
                <ListItem
                    button
                    alignItems="flex-start"
                    onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
                >
                    <ListItemAvatar>
                        <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                    </ListItemAvatar>
                    <ListItemText primary="BUTTERFLY EFFECT"
                            secondary={
                            <React.Fragment>
                            <Typography>
                                4mn05
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* TRACK 5 */}
                <ListItem
                    button
                    alignItems="flex-start"
                    onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
                >
                    <ListItemAvatar>
                        <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                    </ListItemAvatar>
                    <ListItemText primary="STARGAZING"
                            secondary={
                            <React.Fragment>
                            <Typography>
                                4mn05
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </Card>
    </Draggable>
    );
}

// USER PLAYLISTS
function SpotifyUserPlaylists(props) {
    const classes = useStyles();
    const {user, canBeDeleted, refreshTime, widgetsArray, index} = props;
    const [isDeleted, setIsDeleted] = useState(false);

    const destroyWidget = async () => {
        widgetsArray.splice(index, 1);
        setIsDeleted(true);
    };

    // PLAY SONG
    const playSong = async (url) => {
        navigate(url);
    };

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
            {/* TRACK 1 */}
            <ListItem
                button
                alignItems="flex-start"
                onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
            >
                <ListItemAvatar>
                    <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                </ListItemAvatar>
                <ListItemText primary="Tokyo Machine le Goat"
                    secondary={
                        <React.Fragment>
                        <Typography>
                            Description de la playlist
                        </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            {/* TRACK 2 */}
            <ListItem
                button
                alignItems="flex-start"
                onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
            >
                <ListItemAvatar>
                    <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                </ListItemAvatar>
                <ListItemText primary="YATOU"
                secondary={
                        <React.Fragment>
                        <Typography>
                            Description de la playlist
                        </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            {/* TRACK 3 */}
            <ListItem
                button
                alignItems="flex-start"
                onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
            >
                <ListItemAvatar>
                    <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                </ListItemAvatar>
                <ListItemText primary="Lofi, chillhop, chill beats to relax / study to 24/24"
                        secondary={
                        <React.Fragment>
                        <Typography>
                            Description de la playlist
                        </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            {/* TRACK 4 */}
            <ListItem
                button
                alignItems="flex-start"
                onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
            >
                <ListItemAvatar>
                    <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                </ListItemAvatar>
                <ListItemText primary="Oldies but goodies"
                        secondary={
                        <React.Fragment>
                        <Typography>
                            Description de la playlist
                        </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            {/* TRACK 5 */}
            <ListItem
                button
                alignItems="flex-start"
                onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
            >
                <ListItemAvatar>
                    <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                </ListItemAvatar>
                <ListItemText primary="EDM"
                        secondary={
                        <React.Fragment>
                        <Typography>
                            Description de la playlist
                        </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            {/* TRACK 5 */}
            <ListItem
                button
                alignItems="flex-start"
                onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
            >
                <ListItemAvatar>
                    <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                </ListItemAvatar>
                <ListItemText primary="Rap tout terrain"
                        secondary={
                        <React.Fragment>
                        <Typography>
                            Description de la playlist
                        </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            {/* TRACK 5 */}
            <ListItem
                button
                alignItems="flex-start"
                onClick={(url) => playSong("https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY")}
            >
                <ListItemAvatar>
                    <Avatar variant="rounded" src={tmpCover} className={classes.albumCover}/>
                </ListItemAvatar>
                <ListItemText primary="OST"
                        secondary={
                        <React.Fragment>
                        <Typography>
                            Description de la playlist
                        </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
        </Card>
    </Draggable>
    );
}

export {
    SpotifyArtistSongs,
    SpotifyUserPlaylists
}