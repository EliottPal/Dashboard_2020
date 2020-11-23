import './ProfilePopup.css';
import React, { useState } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { Dialog, DialogContent, DialogTitle, Fab, Button, Chip } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import iconYoutube from './../../assets/icons/64/youtube.png'
import iconSpotify from './../../assets/icons/64/spotify.png'
import iconGithub from './../../assets/icons/64/github.png'
import userRequests from '../../apiConnector';
import GoogleLogin from 'react-google-login';
import GithubLogin from './GithubLogin';
import SpotifyLogin from './SpotifyLogin';
import axios from 'axios';

var sendRequest = require('http');

const useStyles = makeStyles((theme) => ({
    // Dialog
    dialogCard: {
        position: 'absolute',
        top: '20%'
    },
    // Icons
    userIcon: {
        width: '6vh',
        height: '6vh',
        color: "darkgrey"
    },
    whiteIcon: {
        color: '#ffffff'
    },
    // List
    listContainer: {
        width: '100%',
        maxWidth: '50vh',
      },
    listHeader: {
        fontSize: '3.5vh',
        color: 'black',
        marginBottom: '1.5vh',
    },
    serviceName: {
        fontSize: '2.5vh',
        marginLeft: '4vh',
    },
    listItem: {
        width: '45vh',
        marginBottom: '1vh',
        boxShadow: '2px 2px 3px rgba(150, 150, 150, 1)',
    },
    // Buttons
    logoutButton: {
        position: 'absolute',
        top: '90%',
        fontSize: '1.5vh',
        fontWeight: 'bold',
        left: '42.5%',
    },
    // Chip
    chip: {
        position: 'absolute',
        marginTop: '-7vh',
        right: '-15%',
        color: 'white',
    },
    loggedChip: {
        position: 'absolute',
        marginTop: '-7vh',
        right: '-15%',
        color: 'white',
        background: 'limegreen'
    },
}));


// LOGGED CHIP
const LoggedChip = ({ logged }) => {
    const classes = useStyles();

    if (logged) {
        return (
            <Chip
                label="LOGGED"
                icon={<CheckIcon className={classes.whiteIcon}/>}
                className={classes.loggedChip}
            />
        );
    }
    return (
        <Chip
            label="LOGGED"
            color="secondary"
            icon={<CloseIcon />}
            className={classes.chip}
        />
    );
  };

export default function ProfilePopup(props) {
    const classes = useStyles();
    const {openPopup, setOpenPopup, userName, coverImg} = props;
    // Logged chips
    const [youtubeLogged, setYoutubeLogged] = useState(false);
    const [spotifyLogged, setSpotifyLogged] = useState(false);
    const [githubLogged, setGithubLogged] = useState(false);
    // Acces tokens
    const [youtubeAccessToken, setYoutubeAccessToken] = useState('');
    const [githubAccessToken, setGithubAccessToken] = useState('');
    const [spotifyAccessToken, setSpotifyAccessToken] = useState('');
    // Client ids
    const youtubeClientId = '77078160299-k9vf37ebaet0k2phpt6s3811vnraau1q.apps.googleusercontent.com';
    const githubClientId = '2abdf5bdc242d6cf071e';
    const spotifyClientId = '7bc91382df86470ca2c58ed007c5efbf';

    // CLOSE POPUP BY CLICKING OUTSIDE
    const handleClose = () => {
        setOpenPopup(false);
    };

    // GOOGLE OAUTH2 RESPONSE
    const responseGoogle = (response) => {
        console.log(response.accessToken);
        setYoutubeAccessToken(response.accessToken);
        setYoutubeLogged(true);
    }

    // SPOTIFY OAUTH2 RESPONSE
    const responseSpotify = async (response) => {
        if (spotifyLogged === true)
            return;
        let req = await userRequests.spotifyAuthentication(response.code);
        console.log(`access = ${req.access}`);
        if (req.access.length !== 0) {
            setSpotifyAccessToken(req.access);
            setSpotifyLogged(true);
        }
        // userRequests.spotifyAuthentication();
        // console.log(response);
        // setSpotifyAccessToken(response.accessToken);
        //TODO: set refresh token
        // setSpotifyLogged(true);
    }

    const errorSpotify = (error) => {
        console.log(error);
    }

    // GITHUB OAUTH2 RESPONSE
    const responseGithub = async (response) => {
        if (githubLogged === true)
            return;
        let req = await userRequests.githubAuthentication(response.code);
        console.log(`access = ${req}`);
        if (req.length !== 0) {
            setGithubAccessToken(req);
            setGithubLogged(true);
        }
        // setGithubAccessToken(response.accessToken);
        // setGithubLogged(true);
    }

    const errorGithub = (error) => {
        console.log(error);
    }

    return (
        <StylesProvider injectFirst>
            <Dialog
                open={openPopup}
                onClose={handleClose}
                fullWidth={true}
                classes={{paper: classes.dialogCard}}
            >
                {/* TOP BAR */}
                <DialogTitle style={{ background: `center url(${coverImg})`}}>
                    <div className="headerDiv" >
                        <Fab className="iconBtn">
                            <PersonIcon className={classes.userIcon}>
                            </PersonIcon>
                        </Fab>
                        <h1 className="userName">{userName}</h1>
                    </div>
                </DialogTitle>
                {/* CONTENT */}
                <DialogContent dividers>
                    <div className="contentDiv">
                        {/* SERVICES LIST */}
                        <List
                            className={classes.listContainer}
                            subheader={
                                <ListSubheader className={classes.listHeader}>
                                Services
                                </ListSubheader>
                            }
                        >
                            {/* YOUTUBE SERVICE */}
                            {/* <GoogleLogin
                                clientId={clientId}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            /> */}
                            <GoogleLogin
                                clientId={youtubeClientId}
                                render={renderProps => (
                                    <ListItem
                                    variant="outlined"
                                    button onClick={renderProps.onClick}
                                    className={classes.listItem}
                                >
                                    <ListItemIcon>
                                        <img src={iconYoutube} />
                                    </ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        className={classes.serviceName}
                                        primary="Youtube"
                                    />
                                </ListItem>
                                )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            <LoggedChip logged={youtubeLogged}></LoggedChip>
                            {/* SPOTIFY SERVICE */}
                            {/* <ListItem
                                button onClick={() => responseSpotify()}
                                className={classes.listItem}
                            >
                                <ListItemIcon>
                                    <img src={iconSpotify} />
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    className={classes.serviceName}
                                    primary="Spotify"
                                />
                            </ListItem> */}
                            <SpotifyLogin
                                clientId={spotifyClientId}
                                onSuccess={responseSpotify}
                                onFailure={errorSpotify}
                            />
                            <LoggedChip logged={spotifyLogged}></LoggedChip>
                            {/* GITHUB SERVICE */}
                            <GithubLogin
                                clientId={githubClientId}
                                onSuccess={responseGithub}
                                onFailure={errorGithub}
                            />
                            <LoggedChip logged={githubLogged}></LoggedChip>
                        </List>
                        {/* LOGOUT BUTTON */}
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.logoutButton}
                            component={Link} to={'/'}
                        >
                            LOGOUT
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </StylesProvider>
    )
}