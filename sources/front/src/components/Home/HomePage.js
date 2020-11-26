// React imports
import { Link, navigate } from '@reach/router';
import React, { useState, useEffect } from 'react';
// Style imports
import './HomePage.css';
import defaultImg from './../../assets/bg.jpg'
// Material imports
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import {Card, Typography, Fab, Button, Paper, Switch } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person'
import DeleteIcon from '@material-ui/icons/Delete';
import WarningIcon from '@material-ui/icons/Warning';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Brightness4Icon from '@material-ui/icons/Brightness4';
// Popup imports
import ProfilePopup from '../Profile/ProfilePopup';
import AddWidget from './AddWidget';
import userRequests from '../../apiConnector';
// Widgets Imports
import {YoutubeSubCount, YoutubeLastVideo} from '../Widgets/YoutubeWidgets';
import {SpotifyArtistSongs, SpotifyUserPlaylists} from '../Widgets/SpotifyWidgets';
import {GithubUserRepos, GithubRepoPushs} from '../Widgets/GithubWidgets';
import MoneyConverter from '../Widgets/MoneyWidget';
import WeatherForecast from '../Widgets/WeatherWidget';
import fx from 'money';

var coverImg = defaultImg

const useStyles = makeStyles((theme) => ({
    emptyTitle: {
        color: 'darkgrey',
        marginTop: '15vh',
    },
    // Dark mode
    cardDarkMode: {
        position: 'absolute',
        marginLeft: '2vh',
        width: '10vh',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkModeIcon: {
        color: 'black',
        position: 'absolute',
        marginTop: '0.7vh',
        marginLeft: '0.5vh',
    },
    darkModeSwitch: {
        marginLeft: '4vh',
    },
    // Buttons
    profileButton: {
        position: 'relative',
        marginTop: '30vh',
        marginLeft: theme.spacing(2),
        height: '8vh',
        width: '8vh',
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
    whiteIcon: {
        color: '#ffffff'
    },
    // Error Page
    errorCard: {
        width: '20%',
        minHeight: '30vh',
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

    React.useEffect(() => {
        async function getUserData() {
            const getTokens = await userRequests.loadUserData(props.location.state.username);
            console.log(getTokens);
            console.log(`widgets list length = ${getTokens.widgets.length}`)
            if (getTokens.google.accessToken.length !== 0) {
                var tmp = [];
                tmp.push(getTokens.google.accessToken);
                console.log(`youtube : ${tmp}`);
                setYoutube(tmp);
            }
            if (getTokens.spotify.accessToken.length !== 0) {
                var tmp = [];
                tmp.push(getTokens.spotify.accessToken);
                tmp.push(getTokens.spotify.refreshToken);
                tmp.push(getTokens.spotify.expires);
                console.log(tmp)
                setSpotify(tmp);
            }
            if (getTokens.github.accessToken.length !== 0) {
                var tmp = [];
                tmp.push(getTokens.github.accessToken);
                setGithub(tmp);
            }
            if (getTokens.widgets.length !== 0) {
                console.log("widgets list");
                var tmp = [];
                for (var i = 0; i != getTokens.widgets.length; i++) {
                    tmp.push({
                        name: getTokens.widgets[i].name,
                        content: getTokens.widgets[i].content
                    })
                }
                console.log(tmp);
                reproduceWidget(tmp);
            }
        }
        getUserData();
    }, [])

    const reproduceWidget = (widgets) => {
        var tmp = [];
        for (var i = 0; i != widgets.length; i++) {
            if (widgets[i].name === "youtube-subcount") {
                tmp.push({name: widgets[i].name, content: <YoutubeSubCount refreshTime={widgets[i].content.props.refreshTime} youtuber={widgets[i].content.props.youtuber} canBeDeleted={false}/>})
                console.log(widgets[i].content);
            }
            if (widgets[i].name === "youtube-video") {
                tmp.push({name: widgets[i].name, content: <YoutubeLastVideo refreshTime={widgets[i].content.props.refreshTime} youtuber={widgets[i].content.props.youtuber} canBeDeleted={false}/>})
                console.log(widgets[i].content);
            }
            if (widgets[i].name === "spotify-artist") {
                tmp.push({name: widgets[i].name, content: <SpotifyArtistSongs refreshTime={widgets[i].content.props.refreshTime} artist={widgets[i].content.props.artist} canBeDeleted={false} accessToken={spotify[0]}/>})
                console.log(widgets[i].content);
            }
            if (widgets[i].name === "spotify-playlist") {
                tmp.push({name: widgets[i].name, content: <SpotifyUserPlaylists refreshTime={widgets[i].content.props.refreshTime} user={widgets[i].content.props.user} canBeDeleted={false} accessToken={spotify[0]}/>})
                console.log(widgets[i].content);
            }
            if (widgets[i].name === "github-user") {
                tmp.push({name: widgets[i].name, content: <GithubUserRepos refreshTime={widgets[i].content.props.refreshTime} user={widgets[i].content.props.user} canBeDeleted={false}/>})
                console.log(widgets[i].content);
            }
            if (widgets[i].name === "github-repo") {
                tmp.push({name: widgets[i].name, content: <GithubRepoPushs refreshTime={widgets[i].content.props.refreshTime} repo={widgets[i].content.props.repo} canBeDeleted={false}/>})
                console.log(widgets[i].content);
            }
            if (widgets[i].name === "weather-city") {
                tmp.push({name: widgets[i].name, content: <WeatherForecast refreshTime={widgets[i].content.props.refreshTime} city={widgets[i].content.props.city} canBeDeleted={false}/>})
                console.log(widgets[i].content);
            }
            if (widgets[i].name === "money-converter") {
                tmp.push({name: "money-converter", content: <MoneyConverter currency={widgets[i].content.props.currency} refreshTime={widgets[i].content.props.refreshTime} canBeDeleted={false}/>})
            }
        }
        setDisplayWidgets(tmp);
    }

    const classes = useStyles();
    const date = new Date();
    const [toggled, setToggled] = React.useState(false);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [openWidgetAdder, setOpenWidgetAdder] = React.useState(false);
    const [displayWidgets, setDisplayWidgets] = React.useState([]);
    const [youtube, setYoutube] = React.useState([]);
    const [spotify, setSpotify] = React.useState([]);
    const [github, setGithub] = React.useState([]);
    const [backgroundURL, setBackgroundURL] = React.useState('');
    const [darkMode, setDarkMode] = React.useState(false);

    // MANAGE DARK MODE
    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        },
    });

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
        setBackgroundURL(coverImg);
    };

    //
    return (
        <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
                <Paper>
                    <div className="mainDiv">
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
                            {/* DARK MODE TOGGLE */}
                            <Card className={classes.cardDarkMode}>
                                <Brightness4Icon className={classes.darkModeIcon}/>
                                <Switch className={classes.darkModeSwitch} checked={darkMode} onChange={() => setDarkMode(!darkMode)}/>
                            </Card>
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
                            {!displayWidgets.length && (
                                <h1 className={classes.emptyTitle}>USE THE TOP RIGHT BUTTON TO ADD YOUR FIRST WIDGET!</h1>
                            )}
                            {displayWidgets.map((item, index) => (
                                React.cloneElement(item.content, {index, canBeDeleted: toggled, widgetsArray: displayWidgets, username: props.location.state.username}, {key: index})
                            ))}
                        </div>
                        {/* PROFILE POPUP DIALOG */}
                        <ProfilePopup
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup}
                            userName={props.location.state.username}
                            coverImg={coverImg}
                            youtube={youtube}
                            spotify={spotify}
                            github={github}
                            setYoutube={setYoutube}
                            setSpotify={setSpotify}
                            setGithub={setGithub}
                        >
                        </ProfilePopup>
                        <AddWidget
                            openWidgetAdder={openWidgetAdder}
                            setOpenWidgetAdder={setOpenWidgetAdder}
                            displayWidgets={displayWidgets}
                            setDisplayWidgets={setDisplayWidgets}
                            youtube={youtube}
                            spotify={spotify}
                            github={github}
                            username={props.location.state.username}
                        ></AddWidget>
                    </div>
                </Paper>
            </StylesProvider>
        </ThemeProvider>
    );
};

export default HomePage;