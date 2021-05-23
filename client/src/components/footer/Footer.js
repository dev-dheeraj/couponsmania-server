import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { FooterStyles } from './FooterStyles'
import Logo from '../../images/logo.png' 
function Footer(props) {
    const classes = FooterStyles(props);
    return (
        <Grid className={classes.root}>
            <Grid lg={4} xl={4} sm={12} md={4}>
            <img src={Logo} alt='logo'/>
            <Typography className={classes.title} variant="h6" noWrap>
            oupon
          </Typography>
          <Typography className={classes.title1} variant="h6" noWrap>
            ania
          </Typography>
            </Grid>
            <Grid lg={4} xl={4} sm={12} md={4}>
              
            </Grid>
            <Grid lg={4} xl={4} sm={12} md={4}></Grid>
        </Grid>
    )
}

export default Footer
