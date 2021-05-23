import { Card, Grid, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { SidebarStyles } from "./Sidebarstyles";
import Checkbox from "@material-ui/core/Checkbox";
import { get, post } from "../../api/serverRequest";
import Context from "../../store/context";



function Sidebar(props) {
  const classes = SidebarStyles(props);
  const { globalState, globalDispatch } = useContext(Context)
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [categoryList, setcategoryList] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [subcategoryIds, setSubcategoryIds] = useState([]);

  const handleCategoryChange = (event) => {
    if (event.target.checked == true && event.target.value) {
      setCategoryIds(oldIds => [...oldIds, event.target.value]);
    } else {
      setCategoryIds(categoryIds.filter(item => item !== event.target.value));
    }
    setCheckBoxStatus(event.target.checked);
  };

  const handleSubcategoryChange = (event) => {
    if (event.target.checked == true && event.target.value) {
      setSubcategoryIds(oldIds => [...oldIds, event.target.value]);
    } else {
      setSubcategoryIds(subcategoryIds.filter(item => item !== event.target.value));
    }
    setCheckBoxStatus(event.target.checked);
  };

  // call every time the checkbox change (cgecked or not checked)
  useEffect(async () => {
    let response = null
    // get coupons on based on category and subcategory checked
    if ((categoryIds && categoryIds.length) && (subcategoryIds && subcategoryIds.length)) {
      let params = {
        subcategoryIds: subcategoryIds,
        categoryIds: categoryIds
      }
      response = await post("/coupon/getCouponsByCatAndSubCat", params);
      if (response && response.data && response.data.content) {
        let data = response.data.content
        // set global state to set coupons list for global use
        globalDispatch({ type: 'ADD_COUPONS', payload: data })
      }
    }

    // get coupons on based of category only
    else if(categoryIds && categoryIds.length){
      let params = {
        categoryIds: categoryIds
      }
      response = await post("/coupon/getCouponsByCategory", params);
      if (response && response.data && response.data.content) {
        let data = response.data.content
        // set global state to set coupons list for global use
        globalDispatch({ type: 'ADD_COUPONS', payload: data })
        globalDispatch({ type: 'SET_LOADER_STATE', payload: false })

      }
    }

    // get coupons on based of sub category only
    else if(subcategoryIds && subcategoryIds.length){
      let params = {
        subcategoryIds: subcategoryIds,
      }
      response = await post("/coupon/getCouponsBySubcategory", params);
      if (response && response.data && response.data.content) {
        let data = response.data.content
        // set global state to set coupons list for global use
        globalDispatch({ type: 'ADD_COUPONS', payload: data })
        globalDispatch({ type: 'SET_LOADER_STATE', payload: false })

      }
    }
    //  get all coupons in case none of the category checkbox selected
    else if (categoryIds.length == 0 && subcategoryIds.length == 0 && checkBoxStatus == false) {
      globalDispatch({ type: 'SET_LOADER_STATE', payload: true })

       response = await get("/coupon/getAllCoupon");
      if (response.data && response.data.content && response.data.content.length) {
        let data = response.data.content
        // set global state to set coupons list for global use
        globalDispatch({ type: 'ADD_COUPONS', payload: data })
        globalDispatch({ type: 'SET_LOADER_STATE', payload: false })

      }
    }
  }, [categoryIds, subcategoryIds])

  // componennt didmount 
  useEffect(async () => {
    // get all category list
    let catRes = await get("/coupon/getAllCategory");
    if (catRes.data && catRes.data.content && catRes.data.content.length) {
      setcategoryList(catRes.data.content)

    }

    // get all sub category list
    let subCatRes = await get("/coupon/getAllsubcategory");
    if (subCatRes.data && subCatRes.data.content && subCatRes.data.content.length) {
      setSubcategoryList(subCatRes.data.content)

    }
  }, [])

  // render filter category on sidebar
  const renderCategoryFilter = () => {
    return categoryList && categoryList.map((item, ind) => {
      return <Grid className={classes.rechargectgry}>
        <Typography variant="title" >
          <Checkbox
            color="default"
            inputProps={{ "aria-label": "checkbox with default color" }}
            value={item.id}
            onChange={(e) => handleCategoryChange(e)}
          />  {item.name}
        </Typography>
      </Grid>

    })
  }

  // render filter category on sidebar
  const renderSubcategoryFilter = () => {
    return subcategoryList && subcategoryList.map((item, ind) => {
      return <Grid className={classes.rechargectgry}>
        <Typography variant="title" >
          <Checkbox
            color="default"
            inputProps={{ "aria-label": "checkbox with default color" }}
            value={item.id}
            onChange={(e) => handleSubcategoryChange(e)}
          />  {item.name}
        </Typography>
      </Grid>

    })
  }

  return (
    <Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12} >
        <Card className={classes.card} >
          <Typography variant="h6" style={{ textAlign: 'center' }}>Categories</Typography>

          {/*  render category filter on side bar */}
          {renderCategoryFilter()}
        </Card>
      </Grid>

      <Grid xs={12} sm={12} md={12} lg={12} xl={12} >
        <Card className={classes.card} >
          <Typography variant="h6" style={{ textAlign: 'center' }}>Sub Categories</Typography>

          {/*  render sub category filter on side bar */}
          {renderSubcategoryFilter()}
        </Card>
      </Grid>
    </Grid>
  );
}

export default Sidebar;
