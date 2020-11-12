import './HomePage.css';
import React, { useState } from 'react';
import { Link } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import defaultImg from './../../assets/bg.jpg'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person'

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
    // Icons
    profileIcon: {
        height: '5vh',
        width: '5vh',
    }
}));


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
                    <PersonIcon className={classes.profileIcon}/>
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
        </div>
    );
};

export default HomePage;