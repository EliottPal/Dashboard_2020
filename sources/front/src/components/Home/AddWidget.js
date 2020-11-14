import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { Dialog, DialogTitle, DialogContent, Typography, CardActionArea } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import './AddWidget.css';
import iconYoutube from './../../assets/icons/youtube.png'
import iconSpotify from './../../assets/icons/spotify.png'
import iconGithub from './../../assets/icons/github.png'
import iconWeather from './../../assets/icons/weather.png'
import iconMoney from './../../assets/icons/money.png'

const useStyles = makeStyles((theme) => ({
    // Dialog
    dialogCard: {
        position: 'absolute',
        top: '20%',
        width: '55vh',
    },
}));
export default function AddWidget(props) {
  const classes = useStyles();
  const {openWidgetAdder, setOpenWidgetAdder} = props;

    const handleClose = () => {
        setOpenWidgetAdder(false);
    }

    // SELECT YOUTUBE SERVICE
    const handleYoutubeClick = () => {
        alert("Youtube service");
    }

    // SELECT SPOTIFY SERVICE
    const handleSpotifyClick = () => {
        alert("Spotify service");
    }

    // SELECT GITHUB SERVICE
    const handleGithubClick = () => {
        alert("github service");
    }

    // SELECT WEATHER SERVICE
    const handleWeatherClick = () => {
        alert("Weather service");
    }

    // SELECT MONEY SERVICE
    const handleMoneyClick = () => {
        alert("Money service");
    }

    return (
        <StylesProvider>
            <Dialog
                open={openWidgetAdder}
                onClose={handleClose}
                fullWidth={true}
                classes={{paper: classes.dialogCard}}
            >
                {/* TITLE */}
                <DialogTitle>
                    <div className="header">
                        <h1 className="title">Add a new widget</h1>
                        <h2 className="subTitle">Select service</h2>
                    </div>
                </DialogTitle>
                {/* CONTENT */}
                <DialogContent dividers>
                    {/* YOUTUBE SERVICE */}
                    <Card className="serviceCard" variant="outlined" >
                        <CardActionArea className="serviceCardAction" onClick={handleYoutubeClick}>
                            <img src={iconYoutube} className="serviceIcon"/>
                            <div className="servicePos">
                                <Typography className="serviceText">YouTube</Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                    {/* SPOTIFY SERVICE */}
                    <Card className="serviceCard" variant="outlined">
                        <CardActionArea className="serviceCardAction" onClick={handleSpotifyClick}>
                            <img src={iconSpotify} className="serviceIcon"/>
                            <div className="servicePos">
                                <Typography className="serviceText">Spotify</Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                    {/* GITHUB SERVICE */}
                    <Card className="serviceCard" variant="outlined">
                        <CardActionArea className="serviceCardAction" onClick={handleGithubClick}>
                            <img src={iconGithub} className="serviceIcon"/>
                            <div className="servicePos">
                                <Typography className="serviceText">Github</Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                    {/* WEATHER SERVICE */}
                    <Card className="serviceCard" variant="outlined">
                        <CardActionArea className="serviceCardAction" onClick={handleWeatherClick}>
                            <img src={iconWeather} className="serviceIcon"/>
                            <div className="servicePos">
                                <Typography className="serviceText">Weather</Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                    {/* MONEY SERVICE */}
                    <Card className="serviceCard" variant="outlined">
                        <CardActionArea className="serviceCardAction"onClick={handleMoneyClick}>
                            <img src={iconMoney} className="serviceIcon"/>
                            <div className="servicePos">
                                <Typography className="serviceText">Money</Typography>
                            </div>
                        </CardActionArea>
                    </Card>
                </DialogContent>
            </Dialog>
        </StylesProvider>
    );
}