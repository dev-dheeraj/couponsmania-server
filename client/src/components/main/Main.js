import React, { useState, useEffect,useContext } from 'react';
import Moment from "moment";
import { Box, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MainStyles } from "./MainStyles";
import Amazon from "../../images/amazonlogo.jpg";
import Flipkart from "../../images/flipartlogo.png";
import Freecharge from "../../images/freechargelogo.png";
import Logo from "../../images/logo.gif";
import PopularStore from "../popularstore/PopularStore";
import { post, get, serverImageUrl } from '../../api/serverRequest'
import PropTypes from 'prop-types';
import Context from "../../store/context";
import Loader from '../loader/Loader';

function Main(props) {
  const classes = MainStyles(props);
  const [couponsList, setCouponsList] = useState([]);
  const {globalState, globalDispatch} = useContext(Context)


  // componentdidmountto
  useEffect(async () => {
    let res = await get("/coupon/getAllCoupon");
    if (res.data && res.data.content && res.data.content.length) {
      setCouponsList(res.data.content)
      let data = res.data.content
      // set global state to set coupons list for global use
      globalDispatch({ type: 'ADD_COUPONS', payload: data })
      globalDispatch({ type: 'SET_LOADER_STATE', payload: false })
    }
  }, []);

  const renderCouponsList = () => {
    return globalState.couponsList && globalState.couponsList.map((itm, ind) => {
    // return couponsList && couponsList.map((itm, ind) => {
      // append image with server image url to show or show default url
      let imagePath = itm.image && itm.image !== '' ? `${serverImageUrl}/${itm.image}` : Amazon
      return (
        // <Grid container>
        <Grid xs={12} sm={6} md={6} lg={4} xl={2}>
          <Card className={classes.card}>
            <CardActionArea>
              <Grid style={{ display: "flex" }}>
                <img
                  className={classes.companylogo}
                  src={imagePath}
                  alt="company logo"
                />
              </Grid>

              <hr style={{ color: "rgba(0, 0, 0, 0.1)" }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.companyname}>
                  {itm.company_name}
                  {/* {itm.title} */}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  {itm.category_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                  {itm.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" className={classes.coupanbtn}>
                Get Coupon
            </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };
  return (
    <Grid container spacing={2}>
      {/*  render all coupons list */}
      {renderCouponsList()}
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <PopularStore />
        { globalState.isLoading  == true ? <Loader/>: null}
      </Grid>
    </Grid>
  );
}

export default Main;
