import './HomePage.css';
import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import defaultImg from './../../assets/bg.jpg'
import Draggable from 'react-draggable';
import {Card, Typography, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person'
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleButton from '@material-ui/lab/ToggleButton';

var selected

const useStyles = makeStyles((theme) => ({
    // Buttons
    profileButton: {
        position: 'relative',
        marginTop: theme.spacing(10),
        marginLeft: theme.spacing(1),
        height: '8vh',
        width: '8vh',
    },
    destroyButton: {
        position: 'absolute',
        height: '4vh',
        width: '4vh',
        right: '94%',
        top: '-8%',
    },
    addButton: {
        marginLeft: '1vh',
        marginRight: '3vh',
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
    whiteIcon: {
        color: '#ffffff'
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

// DRAGGABLE CARD
const DraggableCard = ({ text }) => {
    const classes = useStyles();

    const destroyWidget = async () => {
            alert('vous me le bannez lui!');
    };
    return (
      <Draggable>
        <Card className={classes.card}>
            {selected? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
          <Typography variant="h6">{text}</Typography>
        </Card>
      </Draggable>
    );
  };

// HOME PAGE
function HomePage(props) {
    const classes = useStyles();
    var date = new Date();
    const [selected, setSelected] = React.useState(false);

    // CREATE WIDGET FUNC
    const createWidget = async (event) => {
        alert('c\'est un gaté lui ?');
    };

    // TOGGLE DELETE MODE FUNC
    const toggleDeleteMode = async (event) => {
    };

    return (
        <StylesProvider injectFirst>
            <div className="mainDiv">
                {/* Image configurable par l'user par la suite */}
                <div className="imgCover" style={{ background: `url(${defaultImg})`}}>
                    {/* PROFILE BUTTON */}
                    <Fab
                        color="primary"
                        className={classes.profileButton}
                        component={Link} to={"/profile"}
                    >
                        <PersonIcon className={classes.largerIcon}/>
                    </Fab>
                    <h1 className="mainTitle">{date.toDateString()}</h1>
                </div>
                <div className="widgetManageButtons">
                    {/* TOGGLE DELETE MODE BUTTON */}
                    <ToggleButton
                        value="check"
                        selected={selected}
                        onChange={() => {setSelected(!selected);}}
                        onClick={(event) => toggleDeleteMode(event)}
                        className="toggleBtn"
                    >
                        <DeleteIcon className={classes.whiteIcon}/>
                    </ToggleButton>
                    {/* ADD WIDGET BUTTON */}
                    <Fab
                        color="primary"
                        className={classes.addButton}
                        onClick={(event) => createWidget(event)}
                    >
                        <AddIcon />
                    </Fab>
                </div>
                <DraggableCard text="Eliott"></DraggableCard>
                <DraggableCard text="Rodo"></DraggableCard>
            </div>
        </StylesProvider>
    );
};

export default HomePage;