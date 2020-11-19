import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    // Card
    card: {
        width: '20%',
        minHeight: '20vh',
        backgroundColor: '#f5f5f5',
        color: '#00000',
        textAlign: 'center',
        overflow: 'visible',
        borderRight: '1vh solid dimgrey'
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
}));

// USER PUBLIC REPOSITORIES
function GithubUserRepos(props) {
    const classes = useStyles();
    const {user, canBeDeleted, refreshTime, widgetsArray, index} = props;

    const destroyWidget = async () => {
        widgetsArray.splice(index, 1);
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

// REPOSITORY LAST PUSHS
function GithubRepoPushs(props) {
    const classes = useStyles();
    const {repo, canBeDeleted, refreshTime, widgetsArray, index} = props;

    const destroyWidget = async () => {
        widgetsArray.splice(index, 1);
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
        <Typography variant="h6">{repo}</Typography>
        </Card>
    </Draggable>
    );
}

export {
    GithubUserRepos,
    GithubRepoPushs
}