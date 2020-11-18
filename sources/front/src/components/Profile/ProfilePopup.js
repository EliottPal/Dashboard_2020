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
                            <ListItem
                                variant="outlined"
                                button onClick={() => loginYoutube()}
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
                            <LoggedChip logged={false}></LoggedChip>
                            {/* SPOTIFY SERVICE */}
                            <ListItem
                                button onClick={() => loginSpotify()}
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
                            </ListItem>
                            <LoggedChip logged={true}></LoggedChip>
                            {/* GITHUB SPOTIFY */}
                            <ListItem
                                button onClick={() => loginGithub()}
                                className={classes.listItem}
                            >
                                <ListItemIcon>
                                    <img src={iconGithub} />
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography
                                    className={classes.serviceName}
                                    primary="Github"
                                />
                            </ListItem>
                            <LoggedChip logged={false}></LoggedChip>
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