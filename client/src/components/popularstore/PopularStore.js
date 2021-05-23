import React, { useState, useEffect, useContext } from 'react';
import { Grid, Paper, Typography } from "@material-ui/core";
import Amazon from "../../images/amazonlogo.jpg";
import Flipkart from "../../images/flipartlogo.png";
import Jiologo from "../../images/jiologo.png";
import Freecharge from "../../images/freechargelogo.png";
import { PopularStoreStyles } from "./PopularStoreStyles";
import { get, post, serverImageUrl } from '../../api/serverRequest';
import Context from '../../store/context';

function PopularStore(props) {
  const classes = PopularStoreStyles(props);
  const [companyList, setCompanyList] = useState([])
  const { globalState, globalDispatch } = useContext(Context);


  // componentdidmount
  useEffect(async () => {
    let popularCompanyList = await get("/coupon/getpopularCompany");
    if (popularCompanyList.data && popularCompanyList.data.content && popularCompanyList.data.content.length) {
      setCompanyList(popularCompanyList.data.content)
      globalDispatch({ type: 'ADD_POPULAR_COMPANIES', payload: popularCompanyList.data.content })
    }
  }, []);

  const handlePopularStoreClick = async (item) => {
    if (item && item.id) {
      let response = await post("/coupon/getCouponsByCompany", {companyId : item.id});
      if (response.data && response.data.content && response.data.content.length) {
        globalDispatch({ type: 'ADD_COUPONS', payload: response.data.content })
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  }

  //  get all popular (top 5 mostly used) company list 
  const renderPopularCompanyList = () => {
    return companyList && companyList.map((item, ind) => {
      let imagePath = item.image && item.image !== '' ? `${serverImageUrl}/${item.image}` : Amazon

      return <Grid container>
        <Grid item xl={2}>
          <Paper className={classes.paper} onClick={() => handlePopularStoreClick(item)}>
            <Typography variant="h6" className={classes.couponavailable}>{item.coupons_counter} <br /> Coupons Available</Typography>
            <img src={imagePath} className={classes.brand} alt="brand" />
          </Paper>
        </Grid>
      </Grid>
    })
  }
  return (
    <Grid xl={12} className={classes.root}>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        <span className={classes.headingtitle}>POPULAR</span> STORE
      </Typography>
      <Grid item container spacing={2}>
        {/* render popular company list */}
        {renderPopularCompanyList()}
      </Grid>
    </Grid>
  );
}

export default PopularStore;
