import './HomePage.css';
import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
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
import WarningIcon from '@material-ui/icons/Warning';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ProfilePopup from '../Profile/ProfilePopup';
import AddWidget from './AddWidget';

var coverImg = defaultImg

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
    },
    // Error Page
    errorCard: {
        width: '20%',
        minHeight: '30vh',
        backgroundColor: '#f5f5f5',
        marginTop: '20vh',
        color: '#00000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    errorIcon: {
        height: '10vh',
        width: '10vh',
        marginTop: '1vh',
        marginBottom: '1vh',
    },
    errorButton: {
        marginTop: '3vh',
    },
    errorTitle: {
        marginTop: '1vh',
    },
    errorText: {
        textAlign: 'center',
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

// ERROR NOT-LOGGED-IN PAGE
const ErrorPage = ({ text, selected }) => {
    const classes = useStyles();
    return (
        <div className="mainDiv">
            <Card className={classes.errorCard}>
                <Typography variant="h4" className={classes.errorTitle} >Woops!</Typography>
                <WarningIcon className={classes.errorIcon}></WarningIcon>
                <Typography variant="p" className={classes.errorText}>
                    Seems that you try to access Dashboard without being logged in.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.errorButton}
                    component={Link} to={'/'}
                >
                    Back to Login page
                </Button>
            </Card>
        </div>
    );
};


// HOME PAGE
function HomePage(props) {
    // HOW TO GET USERNAME
    // STOCK : props.location.state.username
    // PRINT: console.log(props.location.state.username);

    const classes = useStyles();
    var date = new Date();

    const [toggled, setToggled] = React.useState(false);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [openWidgetAdder, setOpenWidgetAdder] = React.useState(false);

    // CHECK IF USER IS LOGGED IN
    if (!props.location.state) {
        navigate(`/error`);
        return(<ErrorPage></ErrorPage>);
    }
    // CREATE WIDGET FUNC
    const createWidget = async (event) => {
        setOpenWidgetAdder(true);
    };

    // TOGGLE DELETE MODE FUNC
    const toggleDeleteMode = async (event) => {
    };

    // CHANGE COVER PIC FUNC
    const changeCover = async (event) => {
        console.log(event.target.files[0])
        // coverImg= event.target.files[0];
        coverImg = URL.createObjectURL(event.target.files[0])
        document.getElementById('coverImage').style.backgroundImage=`url(${coverImg})`;
    };

    return (
        <StylesProvider injectFirst>
            <div className="mainDiv">
                {/* Image configurable par l'user par la suite */}
                <div id="coverImage" className="imgCover" style={{ background: `center url(${defaultImg})`}}>
                    {/* CHANGE COVER BUTTON */}
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        name="image"
                        id="contained-button-file"
                        style={{ display: 'none' }}
                        onChange={changeCover}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="contained"
                            color="default"
                            component="span"
                            className={classes.coverButton}
                            startIcon={<AddAPhotoIcon />}
                        >
                        Change cover
                        </Button>
                    </label>
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
                    coverImg={coverImg}
                >
                </ProfilePopup>
                <AddWidget
                    openWidgetAdder={openWidgetAdder}
                    setOpenWidgetAdder={setOpenWidgetAdder}
                ></AddWidget>
            </div>
        </StylesProvider>
    );
};

export default HomePage;