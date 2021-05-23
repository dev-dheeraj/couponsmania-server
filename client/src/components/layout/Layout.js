import { Grid, Paper } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { LayoutStyles } from "./LayoutStyles";
import Context from "../../store/context";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuOpenSharpIcon from "@material-ui/icons/MenuOpenSharp";
import { Link } from "react-router-dom";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Amazon from '../../images/amazonlogo.jpg'
import Flipkart from '../../images/flipartlogo.png'
import { get, post, serverImageUrl } from "../../api/serverRequest";
const drawerWidth = 240;
function Layout(props) {
  const classes = LayoutStyles(props);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const { globalState, globalDispatch } = useContext(Context);
  const [navKeyList, setNavKeyList] = useState({});


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  useEffect(async () => {
    let cateRes = await get("/coupon/getAllCategoryAndSubcat");
    if (cateRes && cateRes.data && cateRes.data.content) {
      var catData = cateRes.data.content
      var data = catData.reduce((prev, t, index, arr) => {
        if (typeof prev[t.category_name] === 'undefined') {
          prev[t.category_name] = [];
        }
        prev[t.category_name].push(t);
        return prev;
      }, {});
      setNavKeyList(data)
    }

  }, [])

  const handlePopularStoreClick = async (item) => {
    if (item && item.id) {
      globalDispatch({ type: 'SET_LOADER_STATE', payload: true })
      let response = await post("/coupon/getCouponsByCompany", {companyId : item.id});
      if (response.data && response.data.content && response.data.content.length) {
        globalDispatch({ type: 'ADD_COUPONS', payload: response.data.content })
        globalDispatch({ type: 'SET_LOADER_STATE', payload: false })

      }

    }

  }


  const handleSubcatDropdownClick = async (item)=>{
    // get coupons on based on subcategory clicked on nav dropdown
    if (item && item.category_id && item.subcategory_id) {
      let params = {
        subcategoryIds: [item.subcategory_id],
        categoryIds: [item.category_id]
      }
      let response = await post("/coupon/getCouponsByCatAndSubCat", params);
      if (response && response.data && response.data.content) {
        let data = response.data.content
        // set global state to set coupons list for global use
        globalDispatch({ type: 'ADD_COUPONS', payload: data })
      }
    }


  }
  const rendercatAndsubcatDrop = () => {
    const categoryKey = Object.keys(navKeyList)
    return categoryKey && categoryKey.map((cateKey, index) => {
      return <Grid key={index} xl={4}>
        <li className={classes.categoryli}>{cateKey} </li>
        {navKeyList && navKeyList[cateKey].map((subcat, ind) => {
          return <li key = {ind} className={classes.subcategoryli} onClick = {()=>handleSubcatDropdownClick(subcat)}> {subcat.subcategory_name}</li>
        })}
      </Grid>
    })
  }

  const renderTopCompanies = () => {
    return globalState && globalState.popularCompanies && globalState.popularCompanies.map((item, ind) => {
      let imagePath = item.image && item.image !== '' ? `${serverImageUrl}/${item.image}` : Amazon
      return <Grid key={ind} xl={4}>
        <Paper className={classes.offerpaper} onClick = {()=>{handlePopularStoreClick(item)}}>
          <div className={classes.li}>
            <img src={imagePath} alt="amazon offer store" className={classes.companyimg} />&emsp;
            <Typography variant='h6'>{item.name} <br />
                <span className={classes.offeravailable} >{item.coupons_counter} Offers Available</span>
              </Typography>
          </div>
        </Paper>
      </Grid>
    })

  }


  return (
    <Grid>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <Header />
      </Grid>

      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuOpenSharpIcon style={{ fontSize: "1.5rem" }} />
              <Typography variant="h6">Filter</Typography>
            </IconButton>
            {/* <Link className={classes.link} onClick={() => handleSidebarStatus()}><MenuOpenSharpIcon className={classes.sidetoggle} />&nbsp;Filter</Link> */}
            <Link className={classes.link} to="/couponsmania">
              Home
            </Link>

            <div className={classes.dropdown}>
              <div className={classes.dropdownlink}>Categories
            <div className={classes.dropdownlist}>
                  <Paper style={{ width: "40rem", padding: "10px" }}>
                    <ul className={classes.ul}>
                      {/* <div className={classes.category}> */}
                      <Grid container spacing={0}>
                        {rendercatAndsubcatDrop()}
                      </Grid>
                    </ul>
                  </Paper>
                </div>
              </div>
            </div>


            {/* <div className={classes.dropdown}>
            <div className={classes.dropdownlink}>Categories
            <div className={classes.dropdownlist}>
            <Paper>
            <ul className={classes.ul}>
               <div className={classes.category}>
            <Grid container style={{width:'35rem'}}>
            <Grid xl={6}>
             <li className={classes.li}>Recharge <ArrowRightIcon className={classes.leftarrowicon} /> </li>
            
             </Grid>
             
             <Grid xl={6} style={{backgroundColor:"white",display:"flex"}}>
             <div className={classes.hr}></div>
             <div className={classes.subcategory}>
               <li>Mobile Recharge</li>
               <li>DTH Recharge</li>
               <li>Bill Payment</li>
             </div>
             </Grid>
            </Grid>
             
             </div>


             <div className={classes.category}>
            <Grid container style={{width:'35rem'}}>
            <Grid xl={6}>
            <li className={classes.li}>Shopping  <ArrowRightIcon className={classes.leftarrowicon} /></li>
            
             </Grid>
             
             <Grid xl={6} style={{backgroundColor:"white",display:"flex"}}>
             <div className={classes.hr}></div>
             <div className={classes.subcategory}>
               <li>Amazon</li>
               <li>Flipkart</li>
               <li>Myntra</li>
             </div>
             </Grid>
            </Grid>
             
             </div>

             <div className={classes.category}>
            <Grid container style={{width:'35rem'}}>
            <Grid xl={6}>
            <li className={classes.li}>Travel  <ArrowRightIcon className={classes.leftarrowicon} /></li>
            
             </Grid>
             
             <Grid xl={6} style={{backgroundColor:"white",display:"flex"}}>
             <div className={classes.hr}></div>
             <div className={classes.subcategory}>
               <li>Bus Ticket</li>
               <li>Train Ticket</li>
               <li>Air Ticket</li>
             </div>
             </Grid>
            </Grid>
             
             </div>

             

              
              
              <li className={classes.li}>Games  <ArrowRightIcon className={classes.leftarrowicon} /></li>
              <li className={classes.li}>Computer & Accessary  <ArrowRightIcon className={classes.leftarrowicon} /></li>
            
             </ul>
            
             </Paper>

            </div>
            </div>
            </div> 
 */}

            {/* TOP STORE */}

            <div className={classes.dropdown}>
              <div className={classes.dropdownlink}>Top Store
            <div className={classes.dropdownlist}>
                  <Paper style={{ width: "40rem", padding: "20px" }}>
                    <ul className={classes.ul}>
                      {/* <div className={classes.category}> */}
                      <Grid container>
                        {renderTopCompanies()}
                      </Grid>

                      {/* </div> */}

                    </ul>

                  </Paper>

                </div>
              </div>
            </div>





            <Link className={classes.link} to="/">
              Best offer
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography variant="h6">Filter</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <MenuOpenSharpIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <Sidebar />
          {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <main>{props.children}</main>
        </main>
      </div>

      {/* <Navigation style={{backgroundColor: "#cafaf8"}} /> */}

      <Footer />
    </Grid>
  );
}

export default Layout;
