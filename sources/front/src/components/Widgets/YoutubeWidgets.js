import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import ReactPlayer from 'react-player';
import {Card, Typography, Fab, Button, Hidden } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import iconYoutube from './../../assets/icons/32/youtube.png'

const useStyles = makeStyles((theme) => ({
    // Card
    card: {
        width: '25%',
        minHeight: '22vh',
        backgroundColor: '#f5f5f5',
        borderRight: '1vh solid red',
        color: '#00000',
        textAlign: 'center',
        overflow: 'visible',
    },
    lastVideoCard: {
        width: '25%',
        minHeight: '30vh',
        backgroundColor: '#f5f5f5',
        borderRight: '1vh solid red',
        color: '#00000',
        textAlign: 'center',
        overflow: 'visible',
    },
    //Divs
    headerDiv: {
        marginTop: '0.5vh',
        marginLeft: '-20vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerDiv2: {
        marginTop: '0.5vh',
        marginLeft: '-27vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Texts
    subNbr: {
        fontSize: '3.5vw'
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
    // Player
    wrapper : {
        position: 'relative',
        marginTop: '1vh',

        paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */
    },
    player: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
    }
}));

// SUBSCRIBER COUNT
function YoutubeSubCount(props) {
    const classes = useStyles();
    const {youtuber, canBeDeleted, refreshTime, widgetsArray, index} = props;

    const destroyWidget = async () => {
        console.log(widgetsArray.length);
        widgetsArray.splice(index, 1);
        console.log(widgetsArray.length);
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
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
        <div className={classes.headerDiv}>
            <img src={iconYoutube} className={classes.icon}/>
            <Typography variant="h6">Subscribers count</Typography>
        </div>
        <Typography variant="h4" style={{marginTop: '1vh'}} >{youtuber}</Typography>
        <Typography className={classes.subNbr} >1,050,634</Typography>
        </Card>
    </Draggable>
    );
}

// LAST VIDEO
function YoutubeLastVideo(props) {
    const classes = useStyles();
    const {youtuber, canBeDeleted, refreshTime, widgetsArray, index} = props;

    const destroyWidget = async () => {
        widgetsArray.splice(index, 1);
    };

    return (
    <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.lastVideoCard}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
            <div className={classes.headerDiv2}>
                <img src={iconYoutube} className={classes.icon}/>
                <Typography variant="h6">Last Video</Typography>
            </div>
            <Typography variant="h4" style={{marginTop: '1vh'}} >{youtuber}</Typography>
            <div className={classes.wrapper}>
                <ReactPlayer
                    width='100%'
                    height='100%'
                    controls={true}
                    className={classes.player}
                    url="https://www.youtube.com/watch?v=zbc2LUAP6G4"
                />
            </div>
        </Card>
    </Draggable>
    );
}

export {
    YoutubeSubCount,
    YoutubeLastVideo
}