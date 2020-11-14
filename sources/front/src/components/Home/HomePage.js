import './HomePage.css';
import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import defaultImg from './../../assets/bg.jpg'
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Button } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person'
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ProfilePopup from '../Profile/ProfilePopup'

const useStyles = makeStyles((theme) => ({
    // Buttons
    profileButton: {
        position: 'relative',
        marginTop: '30vh',
        marginLeft: theme.spacing(2),
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
        right: '7%'
    },
    coverButton: {
        position: 'absolute',
        marginLeft: '2vh',
        top: '70%',
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
const DraggableCard = ({ text, selected }) => {
    const classes = useStyles();

    const destroyWidget = async () => {
            alert('vous me le bannez lui!');
    };
    return (
      <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.card}>
            {!selected? null :
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
    // HOW TO GET USERNAME
    // STOCK : props.location.state.username
    // console.log(props.location.state.username);
    const classes = useStyles();
    var date = new Date();

    const [toggled, setToggled] = React.useState(false);
    const [openPopup, setOpenPopup] = React.useState(false);

    // CREATE WIDGET FUNC
    const createWidget = async (event) => {
        alert('c\'est un gaté lui ?');
    };

    // TOGGLE DELETE MODE FUNC
    const toggleDeleteMode = async (event) => {
    };

    // CHANGE COVER PIC FUNC
    const changeCover = async () => {
        alert('Pluto x Baby pluto');
    };

    return (
        <StylesProvider injectFirst>
            <div className="mainDiv">
                {/* Image configurable par l'user par la suite */}
                <div className="imgCover" style={{ background: `url(${defaultImg})`}}>
                    {/* CHANGE COVER BUTTON */}
                    <Button
                        variant="contained"
                        color="default"
                        className={classes.coverButton}
                        startIcon={<AddAPhotoIcon />}
                        onClick={() => changeCover()}
                    >
                        Change cover
                    </Button>
                    {/* PROFILE BUTTON */}
                    <Fab
                        color="primary"
                        className={classes.profileButton}
                        onClick={() =>setOpenPopup(true)}
                    >
                        <PersonIcon className={classes.largerIcon}/>
                    </Fab>
                    <h1 className="mainTitle">{date.toDateString()}</h1>
                </div>
                <div className="widgetManageButtons">
                    {/* TOGGLE DELETE MODE BUTTON */}
                    <ToggleButton
                        value="check"
                        selected={toggled}
                        onChange={() => {setToggled(!toggled);}}
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
                {/* DRAGGABLES */}
                <div className="draggableZone">
                    <DraggableCard text="Eliott" selected={toggled}></DraggableCard>
                    <DraggableCard text="Rodo" selected={toggled}></DraggableCard>
                </div>
                {/* PROFILE POPUP DIALOG */}
                <ProfilePopup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    userName={props.location.state.username}
                    coverImg={defaultImg}
                >
                </ProfilePopup>
            </div>
        </StylesProvider>
    );
};

export default HomePage;