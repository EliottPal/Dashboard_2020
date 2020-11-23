// React imports
import React, { useState } from 'react';
// Material imports
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { Dialog, DialogTitle, DialogContent, Typography, Card, CardActionArea, Button, DialogContentText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TimerIcon from '@material-ui/icons/Timer';
// Style & icons imports
import './AddWidget.css';
import iconYoutube from './../../assets/icons/64/youtube.png'
import iconSpotify from './../../assets/icons/64/spotify.png'
import iconGithub from './../../assets/icons/64/github.png'
import iconWeather from './../../assets/icons/64/weather.png'
import iconMoney from './../../assets/icons/64/money.png'
// Widgets Imports
import {YoutubeSubCount, YoutubeLastVideo} from '../Widgets/YoutubeWidgets';
import {SpotifyArtistSongs, SpotifyUserPlaylists} from '../Widgets/SpotifyWidgets';
import {GithubUserRepos, GithubRepoPushs} from '../Widgets/GithubWidgets';
import MoneyConverter from '../Widgets/MoneyWidget';
import WeatherForecast from '../Widgets/WeatherWidget';

const useStyles = makeStyles((theme) => ({
    // Dialog
    dialogCard: {
        position: 'absolute',
        top: '20%',
        width: '55vh',
    },
    errorDialog: {
        position: 'absolute',
        top: '20%',
        width: '25vh',
        justifyContent: 'center',
        textAlign: 'center'
    },
    // Icons
    iconTimer: {
        width: '6vh',
        height: '6vh',
        marginRight: '5vh',
        marginLeft: '2vh',
        marginTop: '0.5vh',
        marginBottom: '-0.5vh',
    }
}));

// CHOOSE WIDGET
function WidgetSelection(props) {
    const {title, subtitle, widget1, widget2, icon, displayWidgets, setDisplayWidgets, handleClose} = props;

    const [openConfig, setOpenConfig] = useState(false);
    const [type, setType] = useState(0);

    const handleConfig = (newType) => {
        setType(newType);
        setOpenConfig(true);
    }

    return (
        <div>
            {openConfig === false && (
                <div>
                    {/* HEADER */}
                    <DialogTitle>
                    <div className="header">
                        <h1 className="title">{title}</h1>
                        <h2 className="subTitle">{subtitle}</h2>
                    </div>
                    </DialogTitle>
                    {/* 1ST WIDGET */}
                    <DialogContent dividers>
                        <Card className="serviceCard" variant="outlined" >
                            <CardActionArea className="serviceCardAction" onClick={() => handleConfig(0)}>
                                <img src={icon} className="widgetIcon"/>
                                <Typography className="serviceText">{widget1}</Typography>
                            </CardActionArea>
                        </Card>
                    {/* 2ND WIDGET */}
                        <Card className="serviceCard" variant="outlined">
                            <CardActionArea className="serviceCardAction" onClick={() => handleConfig(1)}>
                                <img src={icon} className="widgetIcon"/>
                                <Typography className="serviceText">{widget2}</Typography>
                            </CardActionArea>
                        </Card>
                    </DialogContent>
                </div>
            )}
            {openConfig === true && (
                <WidgetConfig
                    type={type}
                    title={title}
                    subtitle="Configure Widget"
                    icon={icon}
                    global={title}
                    displayWidgets={displayWidgets}
                    setDisplayWidgets={setDisplayWidgets}
                    handleClose={handleClose}
                />
            )}
        </div>
    )
}

// CONFIG MONEY WIDGET
function MoneyWidgetConfig(props) {
    const classes = useStyles();
    const {title, subtitle, icon, displayWidgets, setDisplayWidgets, handleClose} = props;
    const [refreshTime, setTime] = useState('');
    const [first, setFirst] = useState();
    const [second, setSecond] = useState();

    var tmp = [...displayWidgets];

    const createMoney = (first, second, refreshTime) => {
        tmp.push({name: "money-converter", content: <MoneyConverter currency1={first} currency2={second} refreshTime={refreshTime}/>})
        setDisplayWidgets(tmp);
        handleClose();
    };

    return (
        <div>
            {/* HEADER */}
            <DialogTitle>
                <div className="header">
                    <h1 className="title">{title}</h1>
                    <h2 className="subTitle">{subtitle}</h2>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {/* INPUT CONFIG */}
                <Card className="serviceCard" variant="outlined">
                    <img src={icon} className="moneyIcon"/>
                    <TextField
                        required
                        id="name"
                        label="Currency to convert:"
                        value={first}
                        className="configInput"
                        onChange={(e) => setFirst(e.target.value)}
                    />
                </Card>
                <Card className="serviceCard" variant="outlined">
                    <img src={icon} className="moneyIcon"/>
                    <TextField
                        required
                        id="name"
                        label="Currency to convert to:"
                        value={second}
                        className="configInput"
                        onChange={(e) => setSecond(e.target.value)}
                    />
                </Card>
                {/* REFRESH TIME CONFIG */}
                <Card className="serviceCard" variant="outlined">
                    <TimerIcon className={classes.iconTimer}/>
                    <TextField
                        required
                        type="number"
                        id="refreshTime"
                        label="Refresh Time (in minutes)"
                        value={refreshTime}
                        className="configInput"
                        onChange={(e) => setTime(e.target.value)}
                    />
                    {/* CREATE BUTTON */}
                </Card>
                <div className="createButton">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => createMoney(first, second, refreshTime)}
                    >
                        Create widget
                    </Button>
                </div>
            </DialogContent>
        </div>
    )
}

// CONFIG SELECTED WIDGET
function WidgetConfig(props) {
    const classes = useStyles();
    const {type, title, subtitle, icon, global, displayWidgets, setDisplayWidgets, handleClose} = props;
    const [refreshTime, setTime] = useState('');
    const [name, setName] = useState();
    var label = null;

    var tmp = [...displayWidgets];

    // SELECT INPUT LABEL
    if (title === "YouTube")
        label = "Youtube channel";
    if (title === "Spotify") {
        if (type === 0)
            label = "Artist";
        if (type === 1)
            label = "Spotify user";
    }
    if (title === "Github") {
        if (type === 0)
            label = "Github user";
        if (type === 1)
            label = "Github Repository";
    }
    if (title === "Weather")
        label = "City";

    // CREATE FUNCTION
    const createWidget = (type, title, name, refreshTime) => {
        if (refreshTime.trim() == "")
            return;
        if (title === "YouTube") {
            if (type === 0) {
                label = "Youtube channel";
                tmp.push({name: "youtube-subcount", content: <YoutubeSubCount refreshTime={refreshTime} youtuber={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
            if (type === 1) {
                label = "Youtube channel";
                tmp.push({name: "youtube-video", content: <YoutubeLastVideo refreshTime={refreshTime} youtuber={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
        }
        if (title === "Spotify") {
            if (type === 0) {
                label = "Artist";
                tmp.push({name: "spotify-artist", content: <SpotifyArtistSongs refreshTime={refreshTime} artist={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
            if (type === 1) {
                label = "Spotify user";
                tmp.push({name: "spotify-playlist", content: <SpotifyUserPlaylists refreshTime={refreshTime} user={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
        }
        if (title === "Github") {
            if (type === 0) {
                label = "Github user";
                tmp.push({name: "github-user", content: <GithubUserRepos refreshTime={refreshTime} user={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
            if (type === 1) {
                label = "Github Repository";
                tmp.push({name: "github-repo", content: <GithubRepoPushs refreshTime={refreshTime} repo={name} canBeDeleted={false}/>})
                setDisplayWidgets(tmp);
            }
        }
        if (title === "Weather") {
            label = "City";
            tmp.push({name: "weather-city", content: <WeatherForecast refreshTime={refreshTime} city={name} canBeDeleted={false}/>});
            setDisplayWidgets(tmp);
        }
        console.log(displayWidgets.length);
        handleClose();
    }

    return (
        <div>
            {/* HEADER */}
            <DialogTitle>
                <div className="header">
                    <h1 className="title">{title}</h1>
                    <h2 className="subTitle">{subtitle}</h2>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {/* INPUT CONFIG */}
                <Card className="serviceCard" variant="outlined">
                    <img src={icon} className="serviceIcon"/>
                    <TextField
                        required
                        id="name"
                        label={label}
                        value={name}
                        className="configInput"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Card>
                {/* REFRESH TIME CONFIG */}
                <Card className="serviceCard" variant="outlined">
                    <TimerIcon className={classes.iconTimer}/>
                    <TextField
                        required
                        type="number"
                        id="refreshTime"
                        label="Refresh Time (in minutes)"
                        value={refreshTime}
                        className="configInput"
                        onChange={(e) => setTime(e.target.value)}
                    />
                    {/* CREATE BUTTON */}
                </Card>
                <div className="createButton">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => createWidget(type, title, name, refreshTime)}
                    >
                        Create widget
                    </Button>
                </div>
            </DialogContent>
        </div>
    )
}

// ERROR POPUP
function ErrorPopup(props) {
    const classes = useStyles();
    const {openPopup, setOpenPopup, service} = props;

    // CLOSE POPUP BY CLICKING OUTSIDE
    const handleClose = () => {
        setOpenPopup(false);
    };

    return(
    <Dialog
        open={openPopup}
        onClose={handleClose}
        fullWidth={true}
        classes={{paper: classes.errorDialog}}
    >
        <DialogTitle >Error</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                Seems that you are not registered to the {service} service.
            </DialogContentText>
        </DialogContent>
    </Dialog>
    );
}


// MAIN POPUP
export default function AddWidget(props) {
    const classes = useStyles();
    const {
        openWidgetAdder,
        setOpenWidgetAdder,
        displayWidgets,
        setDisplayWidgets
    } = props;

    const [showYoutube, setShowYoutube] = useState(false);
    const [showSpotify, setShowSpotify] = useState(false);
    const [showGithub, setShowGithub] = useState(false);
    const [showWeather, setShowWeather] = useState(false);
    const [showMoney, setShowMoney] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [serviceError, setServiceError]= useState('');
    const [mainView, setMainView] = useState(true);

    // CLOSE POPUP
    const handleClose = () => {
        setShowYoutube(false);
        setShowSpotify(false);
        setShowGithub(false);
        setShowWeather(false);
        setShowMoney(false);
        setOpenWidgetAdder(false);
        setMainView(true);
    }

    // SELECT YOUTUBE SERVICE
    const handleYoutubeClick = () => {
        setShowYoutube(true);
        setMainView(false);
    }

    // SELECT SPOTIFY SERVICE
    const handleSpotifyClick = () => {
        setShowSpotify(true);
        setMainView(false);
    }

    // SELECT GITHUB SERVICE
    const handleGithubClick = () => {
        setShowGithub(true);
        setMainView(false);
    }

    // SELECT WEATHER SERVICE
    const handleWeatherClick = () => {
        setShowWeather(true);
        setMainView(false);
    }

    // SELECT MONEY SERVICE
    const handleMoneyClick = () => {
        setShowMoney(true);
        setMainView(false);
    }

    return (
        <StylesProvider>
            <Dialog
                open={openWidgetAdder}
                onClose={handleClose}
                fullWidth={true}
                classes={{paper: classes.dialogCard}}
            >
                { mainView === true && (
                    <div>
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
                </div>
                )}
                {/* SELECT WIDGETS TO DISPLAY */}
                {showYoutube === true && (
                    <WidgetSelection
                        title="YouTube"
                        subtitle="Select Widget"
                        widget1="Subscribers count"
                        widget2="Last video"
                        icon={iconYoutube}
                        displayWidgets={displayWidgets}
                        setDisplayWidgets={setDisplayWidgets}
                        handleClose={handleClose}
                    />
                )}
                {showSpotify === true && (
                    <WidgetSelection
                        title="Spotify"
                        subtitle="Select Widget"
                        widget1="Artist's top songs"
                        widget2="User's public playlists"
                        icon={iconSpotify}
                        displayWidgets={displayWidgets}
                        setDisplayWidgets={setDisplayWidgets}
                        handleClose={handleClose}
                    />
                )}
                {showGithub === true && (
                    <WidgetSelection
                        title="Github"
                        subtitle="Select Widget"
                        widget1="User's public repositories"
                        widget2="Repository last commits"
                        icon={iconGithub}
                        displayWidgets={displayWidgets}
                        setDisplayWidgets={setDisplayWidgets}
                        handleClose={handleClose}
                    />
                )}
                {showWeather === true && (
                    <WidgetConfig
                        type={0}
                        title="Weather"
                        subtitle="Configure Widget"
                        icon={iconWeather}
                        displayWidgets={displayWidgets}
                        setDisplayWidgets={setDisplayWidgets}
                        handleClose={handleClose}
                    />
                )}
                {showMoney === true && (
                    <MoneyWidgetConfig
                        title="Money"
                        subtitle="Configure Widget"
                        icon={iconMoney}
                        displayWidgets={displayWidgets}
                        setDisplayWidgets={setDisplayWidgets}
                        handleClose={handleClose}
                    />
                )}
            </Dialog>
            <ErrorPopup
                service={serviceError}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            />
        </StylesProvider>
    );
}