import React, { useState } from 'react';
import './HomePage.css';
import defaultImg from './../../assets/bg.jpg'
import { makeStyles } from "@material-ui/core/styles";
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

    return (
        <div className="mainDiv">
            {/* Image configurable par l'user par la suite */}
            <div className="imgCover" style={{ background: `url(${defaultImg})`}}>
                <Fab color="primary"  className={classes.profileButton} >
                    <PersonIcon className={classes.profileIcon}/>
                </Fab>
                <h1 className="mainTitle">{date.toDateString()}</h1>
            </div>
            <Fab color="primary" className={classes.addButton}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default HomePage;