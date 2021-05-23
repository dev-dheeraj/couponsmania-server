import React from 'react'
import Background from '../../images/logo.gif'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Paper } from '@material-ui/core';
import { LoaderStyles } from "./LoaderStyles";

function Loader(props) {
    const classes = LoaderStyles(props);
    return (
        <Grid >
            <Paper className={classes.main}  >
                <CircularProgress style={{ height: "150px", width: '140px', margin: 'auto', backgroundImage: `url(${Background})`, backgroundRepeat: "no-repeat", transform: `rotate(${361}deg)`, backgroundPosition: "center" }}>
                </CircularProgress>
            </Paper>
        </Grid>
    )
}

export default Loader
