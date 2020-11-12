import './HomePage.css';
import React, { useState } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import defaultImg from './../../assets/bg.jpg'
import Draggable from 'react-draggable';
import {Card, Button, Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    // Buttons
    profileButton: {
        position: 'relative',
        marginTop: theme.spacing(10),
        marginLeft: theme.spacing(1),
        height: '8vh',
        width: '8vh',
    },
    addButton: {
        left: '47%',
        marginTop: theme.spacing(1),
    },
    destroyButton: {
        position: 'absolute',
        height: '4vh',
        width: '4vh',
        right: '94%',
        top: '-8%',
    },
    // Icons
    largerIcon: {
        height: '5vh',
        width: '5vh',
    },
    smallerIcon: {
        height: '2vh',
        width: '2vh',
    },
    // Card
    card: {
        width: '20%',
        minHeight: '20vh',
        backgroundColor: '#f5f5f5',
        color: '#00000',
        textAlign: 'center',
        overflow: 'visible',
    }
}));

/**
 * Material-UI Card that you can drag and drop anywhere.
 */
const DraggableCard = ({ text}) => {
    const classes = useStyles();

    const destroyWidget = async () => {
        alert('vous me le bannez lui!');
    };

    return (
      <Draggable>
        <Card className={classes.card}>
            <Fab
                color="secondary"
                className={classes.destroyButton}
                onClick={(event) => destroyWidget()}
            >
                <CloseIcon className={classes.smallerIcon}/>
            </Fab>
          <Typography variant="h6">{text}</Typography>
        </Card>
      </Draggable>
    );
  };

function HomePage(props) {
    const classes = useStyles();
    var date = new Date();

    const createWidget = async (event) => {
        alert('c\'est un gaté lui ?');
    };

    return (
        <div className="mainDiv">
            {/* Image configurable par l'user par la suite */}
            <div className="imgCover" style={{ background: `url(${defaultImg})`}}>
                <Fab
                    color="primary"
                    className={classes.profileButton}
                    component={Link} to={"/profile"}
                >
                    <PersonIcon className={classes.largerIcon}/>
                </Fab>
                <h1 className="mainTitle">{date.toDateString()}</h1>
            </div>
            <Fab
                color="primary"
                className={classes.addButton}
                onClick={(event) => createWidget(event)}
            >
                <AddIcon />
            </Fab>
            <DraggableCard text="Eliott"></DraggableCard>
            <DraggableCard text="Rodo"></DraggableCard>
        </div>
    );
};

export default HomePage;