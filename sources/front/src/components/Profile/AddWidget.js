import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { Dialog, DialogContent, DialogTitle, Fab, Typography } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Card from '@material-ui/core/Card';
import './AddWidget.css';
import youtube from '../../assets/youtube.png';
import spotify from '../../assets/spotify.png';
import github from '../../assets/github.png';
import sun from '../../assets/sun.png';
import euro from '../../assets/euro.png';

const useStyles = makeStyles((theme) => {

})

export default function AddWidget(props) {
  const classes = useStyles();
  const {openWidgetAdder, setOpenWidgetAdder} = props;

    const handleClose = () => {
        setOpenWidgetAdder(false);
    }

    const handleYoutubeClick = () => {
        alert("Youtube service");
    }

    const handleSpotifyClick = () => {
        alert("Spotify service");
    }

    const handleGithubClick = () => {
        alert("github service");
    }

    const handleWeatherClick = () => {
        alert("Weather service");
    }

    const handleMoneyClick = () => {
        alert("Money service");
    }

    return (
        <StylesProvider>
            <Dialog
                open={openWidgetAdder}
                onClose={handleClose}
                fullWidth={true}
            >
                <DialogTitle>
                    <div className="header">
                        <h1 className="title">Add a widget - Services</h1>
                    </div>
                </DialogTitle>
                <DialogTitle dividers>
                    <Card className="youtube" variant="outlined" onClick={handleYoutubeClick}>
                        <img src={youtube} className="yt-icon"/>
                        <Typography className="yt-size">YouTube</Typography>
                    </Card>
                    <Card className="spotify" variant="outlined" onClick={handleSpotifyClick}>
                        <img src={spotify} className="sp-icon"/>
                        <div className="pos-spotify">
                            <Typography className="sp-size">Spotify</Typography>
                        </div>
                    </Card>
                    <Card className="github" variant="outlined" onClick={handleGithubClick}>
                        <img src={github} className="gh-icon"/>
                        <div className="pos-github">
                            <Typography className="gh-size">Github</Typography>
                        </div>
                    </Card>
                    <Card className="weather" variant="outlined" onClick={handleWeatherClick}>
                        <img src={sun} className="w-icon"/>
                        <div className="pos-weather">
                            <Typography className="w-size">Weather</Typography>
                        </div>
                    </Card>
                    <Card className="money" variant="outlined" onClick={handleMoneyClick}>
                        <img src={euro} className="m-icon"/>
                        <div className="pos-money">
                            <Typography className="m-size">Money</Typography>
                        </div>
                    </Card>
                </DialogTitle>
            </Dialog>
        </StylesProvider>
    );
}