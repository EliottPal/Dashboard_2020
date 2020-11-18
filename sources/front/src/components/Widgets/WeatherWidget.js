import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Divider } from '@material-ui/core';
import {List, ListItem, ListItemText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ArrowIcon from '@material-ui/icons/TrendingFlat';
import iconWeather from './../../assets/icons/32/weather.png'
import iconSun from './../../assets/icons/weather/sun.png'
import iconCloudy from './../../assets/icons/weather/cloud.png'
import iconRain from './../../assets/icons/weather/rain.png'
import iconThunder from './../../assets/icons/weather/thunder.png'

const useStyles = makeStyles((theme) => ({
    // List
    root: {
        width: '100%',
        maxWidth: '45vh',
        },
    item: {
        alignItems: 'flex-start',
        marginLeft: '6vh',
    },
    // Card
    card: {
        width: '25%',
        minHeight: '30vh',
        backgroundColor: '#f5f5f5',
        color: '#00000',
        textAlign: 'center',
        overflow: 'visible',
        borderRight: '1vh solid cornflowerblue'
    },
    //Divs
    headerDiv: {
        marginTop: '0.5vh',
        marginLeft: '-20vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Buttons
    destroyButton: {
        position: 'absolute',
        height: '4vh',
        width: '4vh',
        right: '95%',
        top: '-7%',
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
        position: 'absolute',
        height: '3.5vh',
        width: '3.5vh',
        marginTop: '0.5vh',
        marginLeft: '10vh'
    },
    forecastIcon: {
        position: 'relative',
        marginTop: '0.5vh',
        right: '20%',
        height: '4vh',
        width: '4vh',
    },
    // Texts
    hour: {
        fontSize: '3vh',
    },
    temperature: {
        fontSize: '3vh',
        fontWeight: 'bold',
        marginLeft: '-3vh'
    }
}));

// WEATHER FORECAST
export default function WeatherForecast(props) {
    const classes = useStyles();
    const {city, canBeDeleted, refreshTime} = props;
    const date = new Date();
    const hour1 = date.getHours();
    const hour2 = date.getHours() + 1;
    const hour3 = date.getHours() + 2;

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
                <img src={iconWeather} className={classes.icon}/>
                <Typography variant="h6">Weather Forecast</Typography>
            </div>
            <Typography variant="h4" style={{marginTop: '1vh'}} >{city}</Typography>
            <List className={classes.root}>
                {/* HOUR 1 */}
                <ListItem className={classes.item}>
                    <ListItemText disableTypography className={classes.hour}>{hour1} H</ListItemText>
                    <ArrowIcon className={classes.arrowIcon}></ArrowIcon>
                    <ListItemText disableTypography className={classes.temperature}>30 °C</ListItemText>
                    <img src={iconSun} className={classes.forecastIcon}/>
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* HOUR 2 */}
                <ListItem className={classes.item}>
                    <ListItemText disableTypography className={classes.hour}>{hour2} H</ListItemText>
                    <ArrowIcon className={classes.arrowIcon}></ArrowIcon>
                    <ListItemText disableTypography className={classes.temperature}>30 °C</ListItemText>
                    <img src={iconRain} className={classes.forecastIcon}/>
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* HOUR 3 */}
                <ListItem className={classes.item}>
                    <ListItemText disableTypography className={classes.hour}>{hour3} H</ListItemText>
                    <ArrowIcon className={classes.arrowIcon}></ArrowIcon>
                    <ListItemText disableTypography className={classes.temperature}>30 °C</ListItemText>
                    <img src={iconCloudy} className={classes.forecastIcon}/>
                </ListItem>
            </List>
        </Card>
    </Draggable>
    );
}
