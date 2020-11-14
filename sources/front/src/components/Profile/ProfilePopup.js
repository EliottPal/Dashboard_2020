import './ProfilePopup.css';
import React, { useState } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { Dialog, DialogContent, DialogTitle, Fab, Button } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import iconYoutube from './../../assets/icons/youtube.png'
import iconSpotify from './../../assets/icons/spotify.png'
import iconGithub from './../../assets/icons/github.png'


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
    // Buttons
    logoutButton: {
        position: 'absolute',
        top: '90%',
        fontSize: '1.5vh',
        fontWeight: 'bold',
        left: '45%',
    }
}));

export default function ProfilePopup(props) {
    const classes = useStyles();
    const {openPopup, setOpenPopup, userName, coverImg} = props;

    // CLOSE POPUP BY CLICKING OUTSIDE
    const handleClose = () => {
        setOpenPopup(false);
    };

    // REDIRECT TO YOUTUBE OAUTH2
    const loginYoutube = async () => {
        alert('Youtube');
    };

    // REDIRECT TO SPOTIFY OAUTH2
    const loginSpotify = async () => {
        alert('Spotify');
    };

    // REDIRECT TO GITHUB OAUTH2
    const loginGithub = async () => {
        alert('Github');
    };

    return (
        <StylesProvider injectFirst>
            <Dialog
                open={openPopup}
                onClose={handleClose}
                fullWidth={true}
                classes={{paper: classes.dialogCard}}
            >
                {/* TOP BAR */}
                <DialogTitle style={{ background: `url(${coverImg})`}}>
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
                            <ListItem button onClick={() => loginYoutube()}>
                                <ListItemIcon>
                                    <img src={iconYoutube} />
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    className={classes.serviceName}
                                    primary="Youtube"
                                />
                            </ListItem>
                            <ListItem button onClick={() => loginSpotify()}>
                                <ListItemIcon>
                                    <img src={iconSpotify} />
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    className={classes.serviceName}
                                    primary="Spotify"
                                />
                            </ListItem>
                            <ListItem button onClick={() => loginGithub()}>
                                <ListItemIcon>
                                    <img src={iconGithub} />
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    className={classes.serviceName}
                                    primary="Github"
                                />
                            </ListItem>
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