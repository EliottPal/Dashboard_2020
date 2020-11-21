import React, { useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { makeStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
import {Card, Typography, Fab, Button, Divider } from '@material-ui/core';
import {List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import iconGithub from './../../assets/icons/32/github.png'

const useStyles = makeStyles((theme) => ({
    // List
    root: {
        width: '100%',
        maxWidth: '60vh',
        maxHeight: '32vh',
        overflow: 'auto'
    },
    // Card
    card: {
        width: '30%',
        Height: '30vh',
        backgroundColor: '#f5f5f5',
        color: '#00000',
        borderRight: '1vh solid #212121',
        textAlign: 'center',
        overflow: 'visible',
    },
    //Divs
    headerDiv: {
        marginTop: '0.5vh',
        marginLeft: '-30vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Buttons
    destroyButton: {
        position: 'absolute',
        height: '4vh',
        width: '4vh',
        right: '97%',
        top: '-4%',
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
    iconCommit: {
        height: '3vh',
        width: '3vh',
        marginTop: '2vh',
        marginRight: '2vh',
    },
}));

// USER PUBLIC REPOSITORIES
function GithubUserRepos(props) {
    const classes = useStyles();
    const {user, canBeDeleted, refreshTime, widgetsArray, index} = props;
    const [isDeleted, setIsDeleted] = useState(false);
    const [reposArray, setReposArray] = useState([]);

    const destroyWidget = async () => {
        widgetsArray.splice(index, 1);
        setIsDeleted(true);
    };

    // GO TO REPOSITORY GITHUB PAGE
    const goToRepo = async (url) => {
        navigate(url);
    };

    // GET USER REPOSITORIES
    const getRepos = async () => {

        const ret = await axios.get(`https://api.github.com/users/${user}/repos`, {
            method: 'GET'
        })
        const tmp = [...ret.data];
        setReposArray(tmp);
    }
    getRepos();

    return (
    <Draggable grid={[25, 25]} bounds="parent">
        <Card className={classes.card}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                    disabled={isDeleted}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
            {/* HEADER */}
            <div className={classes.headerDiv}>
                <img src={iconGithub} className={classes.icon}/>
                <Typography variant="h6">Public repositories </Typography>
            </div>
            <Typography variant="h4" style={{marginTop: '1vh'}} >{user}</Typography>
            {/* REPOS LIST */}
            <List className={classes.root}>
                {reposArray.map((index, key) => (
                    <div key={key}>
                        <ListItem
                            alignItems="flex-start"
                            button
                            onClick={(url) => goToRepo(index.html_url)}
                        >
                            <FolderSharedIcon className={classes.iconCommit}/>
                            <ListItemText primary={index.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography>
                                            {index.language} | {index.description}
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        </Card>
    </Draggable>
    );
}

// REPOSITORY LAST PUSHS
function GithubRepoPushs(props) {
    const classes = useStyles();
    const {repo, canBeDeleted, refreshTime, widgetsArray, index} = props;
    const [isDeleted, setIsDeleted] = useState(false);

    const destroyWidget = async () => {
        widgetsArray.splice(index, 1);
        setIsDeleted(true);
    };

    return (
    <Draggable grid={[25, 25]} bounds="parent">
               <Card className={classes.card}>
            {!canBeDeleted? null :
                <Fab
                    color="secondary"
                    className={classes.destroyButton}
                    onClick={() => destroyWidget()}
                    disabled={isDeleted}
                >
                    <CloseIcon className={classes.smallerIcon}/>
                </Fab>
            }
            <div className={classes.headerDiv}>
                <img src={iconGithub} className={classes.icon}/>
                <Typography variant="h6">Repository pushs </Typography>
            </div>
            <Typography variant="h4" style={{marginTop: '1vh'}} >{repo}</Typography>
            <List className={classes.root}>
                {/* COMMIT 1 */}
                <ListItem alignItems="flex-start">
                    <PublishIcon className={classes.iconCommit}/>
                    <ListItemText primary="[Code] -> adding comments"
                        secondary={
                            <React.Fragment>
                            <Typography>
                                Repo description
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* COMMIT 2 */}
                <ListItem alignItems="flex-start">
                    <PublishIcon className={classes.iconCommit}/>
                    <ListItemText primary="[Back] -> adding player"
                        secondary={
                            <React.Fragment>
                            <Typography>
                                Repo description
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* COMMIT 3 */}
                <ListItem alignItems="flex-start">
                    <PublishIcon className={classes.iconCommit}/>
                    <ListItemText primary="[Front] -> adding spotify"
                        secondary={
                            <React.Fragment>
                            <Typography>
                                Repo description
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* COMMIT 4 */}
                <ListItem alignItems="flex-start">
                    <PublishIcon className={classes.iconCommit}/>
                    <ListItemText primary="[Front] -> adding youtube"
                        secondary={
                            <React.Fragment>
                            <Typography>
                                Repo description
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                {/* COMMIT 5 */}
                <ListItem alignItems="flex-start">
                    <PublishIcon className={classes.iconCommit}/>
                    <ListItemText primary="[Front] -> adding widget"
                        secondary={
                            <React.Fragment>
                            <Typography>
                                Repo description
                            </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                {/* COMMIT 5 */}
                <ListItem alignItems="flex-start">
                    <PublishIcon className={classes.iconCommit}/>
                    <ListItemText primary="Short commit"
                        secondary={
                            <React.Fragment>
                                <Typography>
                                Repo description
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                {/* COMMIT 5 */}
                <ListItem alignItems="flex-start">
                    <PublishIcon className={classes.iconCommit}/>
                    <ListItemText primary="Very very very very very very very very very long commit"
                        secondary={
                            <React.Fragment>
                                <Typography>
                                Repo description
                                </Typography>
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </Card>
    </Draggable>
    );
}

export {
    GithubUserRepos,
    GithubRepoPushs
}