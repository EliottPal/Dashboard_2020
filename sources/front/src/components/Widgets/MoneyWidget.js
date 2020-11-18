import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowIcon from '@material-ui/icons/TrendingFlat';
import iconMoney from './../../assets/icons/32/money.png'

const useStyles = makeStyles((theme) => ({
    // Card
    card: {
        width: '20%',
        minHeight: '17vh',
        backgroundColor: '#f5f5f5',
        borderRight: '1vh solid gold',
        color: '#00000',
        textAlign: 'center',
        overflow: 'visible',
    },
    //Divs
    headerDiv: {
        marginTop: '0.5vh',
        marginLeft: '-15vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentDiv: {
        marginTop: '3vh',
        marginBottom: '1vh'
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
    arrowIcon: {
        height: '3.5vh',
        width: '3.5vh',
        marginTop: '1vh'
    },
    // Inputs
    moneyInput1: {
        width: '10vh',
        marginRight: '2vh',
    },
    moneyInput2: {
        width: '10vh',
        marginLeft: '2vh',
    }
}));

// MONEY COUNVERTER
export default function MoneyConverter(props) {
    const classes = useStyles();
    const {currency1, currency2, canBeDeleted, refreshTime} = props;

    const destroyWidget = async () => {
        alert('vous me le bannez lui!');
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
            <div className={classes.headerDiv}>
                <img src={iconMoney} className={classes.icon}/>
                <Typography variant="h6">Money Converter</Typography>
            </div>
            <div className={classes.contentDiv}>
                <TextField variant="outlined" className={classes.moneyInput1} label={currency1}/>
                <ArrowIcon className={classes.arrowIcon}></ArrowIcon>
                <TextField variant="outlined" disabled className={classes.moneyInput2} label={currency2}/>
            </div>
        </Card>
    </Draggable>
    );
}
