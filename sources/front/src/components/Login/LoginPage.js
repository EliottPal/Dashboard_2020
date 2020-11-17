import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    position: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        height: '80vh',
    },
}));

function showContent(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function LoginPage() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
      };

    return(
        <div style={{display: 'flex',
                    justifyContent:'center',
                    flexDirection: 'column',
                    alignItems:'center'}}
        >
            <h1 style={{fontSize: '5vh', marginTop: '10vh'}} >Dashboard</h1>
            <div style={{height: '50vh',
                        background: '#f5f5f5',
                        boxShadow: "5px 5px 15px -5px rgba(0,0,0,0.75)",

                }}
                className={classes.position}>
                <Container maxWidth="xs">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Sign In" {...showContent(0)}/>
                        <Tab label="Sign Up" {...showContent(1)}/>
                    </Tabs>
                </Container>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <SignIn value={value} index={0}/>
                    <SignUp value={value} index={1}/>
                </SwipeableViews>
            </div>
        </div>
    );
};

export default LoginPage;