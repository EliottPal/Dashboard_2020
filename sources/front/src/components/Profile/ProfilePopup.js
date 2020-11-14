import './ProfilePopup.css';
import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/styles";
import { Dialog, DialogContent, DialogTitle, Fab } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
    // Icons
    userIcon: {
        width: '6vh',
        height: '6vh',
        color: "darkgrey"
    },

}));

export default function ProfilePopup(props) {
    const classes = useStyles();
    const {openPopup, setOpenPopup, userName, coverImg} = props;

    // Close Popup by clicking outside
    const handleClose = () => {
        setOpenPopup(false);
      };
    return (
        <StylesProvider injectFirst>
            <Dialog
                open={openPopup}
                onClose={handleClose}
                fullWidth={true}
            >
                {/* TOP BAR */}
                <DialogTitle style={{ background: `url(${coverImg})`}}>
                    <div className="header" >
                        <Fab
                            className="iconBtn"
                        >
                            <PersonIcon className={classes.userIcon} border={1}>
                            </PersonIcon>
                        </Fab>
                        <h1 className="userName">{userName}</h1>
                    </div>
                </DialogTitle>
                {/* CONTENT */}
                <DialogContent dividers>
                    <div>Content here</div>
                </DialogContent>
            </Dialog>
        </StylesProvider>
    )
}