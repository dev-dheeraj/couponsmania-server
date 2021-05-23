import React, { useState, useEffect } from "react";
import {
  FormControl,
  Grid,
  Input,
  Select,
  InputLabel,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import Moment from "moment";
import { UploadCouponStyles } from "./UploadCouponStyles";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Logo from "../../images/logo.png";
import { post, get } from "../../api/serverRequest";
import AddIcon from '@material-ui/icons/Add';

function UploadCoupon(props) {
  const classes = UploadCouponStyles(props);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedFile, setSelectedFile] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [preview, setPreview] = useState();
  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subcategoryList, setsubcategoryList] = useState([]);
  const [code, setCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  //  component didmount to get all category and companylist
  useEffect(async () => {
    //  set company list to state
    getAllCompanyList();

    //  set Category list to state
    getAllCategoryList();

    //  set sub-category list to state
    getAllSubcategoryList();

  }, []);

  // get all company list from db
  const getAllCompanyList = async () => {
    let companyListResponse = await get("/coupon/getAllCompany");
    if (
      companyListResponse &&
      companyListResponse.data &&
      companyListResponse.data.content
    ) {
      setCompanyList(companyListResponse.data.content);
    }
  };

  // get all category list from db
  const getAllCategoryList = async () => {
    let categoryListResponse = await get("/coupon/getAllCategory");
    if (
      categoryListResponse &&
      categoryListResponse.data &&
      categoryListResponse.data.content
    ) {
      setCategoryList(categoryListResponse.data.content);
    }
  };

  // get all sub category list from db
  const getAllSubcategoryList = async () => {
    let subcategoryListResponse = await get("/coupon/getAllSubcategory");
    if (
      subcategoryListResponse &&
      subcategoryListResponse.data &&
      subcategoryListResponse.data.content
    ) {
      setsubcategoryList(subcategoryListResponse.data.content);
    }
  };

  const handleClickOpen = (type) => {
    setPopupType(type)
    setOpen(true);
  };

  const handleClose = () => {
    setPopupType('')
    setOpen(false);
  };

  const handleDateChange = (date) => {
    console.log(date);
    if (date >= new Date()) {
      setSelectedDate(date);
    } else {
      alert("Date should not be less than today's date");
      setErrorMessage("Date should not be less than today's date");
    }
  };

  // handle company form submit
  const handlePopupFormSubmit = async (type) => {

    switch (type) {
      case 'company':
        var form_data = new FormData();
        form_data.append("company", companyName);
        form_data.append("image", selectedFile);
        let response = await post("/coupon/addCompany", form_data);
        console.log(response.data);
        if (
          response &&
          response.data &&
          response.data.content &&
          response.data.content[0] &&
          response.data.content[0].insertId
        )
          setCompanyId(response.data.content[0].insertId);
        getAllCompanyList();
        handleClose();
        break;

      case 'category':
        var categoryData = {
          category: categoryName
        }
        let catResponse = await post("/coupon/addcategory", categoryData);
        console.log(catResponse.data);
        if (
          catResponse &&
          catResponse.data &&
          catResponse.data.content &&
          catResponse.data.content[0] &&
          catResponse.data.content[0].insertId
        )
          setCategoryId(catResponse.data.content[0].insertId);
        getAllCategoryList();
        handleClose();
        break;

        case 'subcategory':
        var subcategoryData = {
          subcategory : subcategoryName,
          categoryId: categoryId
        }
        let subcatResponse = await post("/coupon/addSubcategory", subcategoryData);
        console.log(subcatResponse.data);
        if (
          subcatResponse &&
          subcatResponse.data &&
          subcatResponse.data.content &&
          subcatResponse.data.content[0] &&
          subcatResponse.data.content[0].insertId
        )
          setSubcategoryId(subcatResponse.data.content[0].insertId);
        getAllSubcategoryList();
        handleClose();
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = async () => {
    var validityDate = Moment(selectedDate).format("YYYY-MM-DD");
    if (selectedDate && categoryId && companyId && subcategoryId && selectedDate !=='' && 
    categoryId !=='' && companyId  !=='' && subcategoryId !=='') {
      var data = {
        title: title,
        code,
        description,
        companyId: companyId,
        categoryId: categoryId,
        validity: validityDate,
        subcategoryId
      };
      let response = await post("/coupon/addCoupon", data);
      if (response && response.data && response.data.is_success) {
        setSelectedDate(new Date());
        setSelectedFile("");
        setPreview();
        setTitle("");
        setCompanyId("");
        setCompanyName("");
        setDescription("");
        setCode("");
        setErrorMessage("");
        setCategoryId("");
        setCategoryName("");
        setSubcategoryName("");
        setSubcategoryId("");
      }
    }
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid className={classes.main}>
        <Paper className={classes.paper}>
          <FormControl style={{ margin: "auto" }}>
            <img
              src={Logo}
              alt="logo"
              height="auto "
              width="auto "
              style={{ margin: "25px auto" }}
            />

            <Grid container >
              <Grid
                xs={6}
                sm={6}
                md={6}
                lg={11}
                xl={10}
                style={{ margin: "auto" }}
              >
                <FormControl variant="outlined" style={{ width: "95%" }}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Company Name
                  </InputLabel>
                  <Select
                    native
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    label="companyName"
                  >
                    <option aria-label="None" value="" />
                    {companyList &&
                      companyList.map((item, ind) => {
                        return (
                          <option id={ind} value={item.id}>

                            {item.name}
                          </option>
                        );
                      })}
                    {/* <option> For All User</option>
              <option>User Specific</option> */}
                  </Select>
                </FormControl>
                <FormHelperText id="my-helper-text" style={{ position: "absolute" }}>
                  In Case Company not Found Click on Add Button
              </FormHelperText>
              </Grid>

              <Grid
                xs={6}
                sm={6}
                md={6}
                lg={1}
                xl={2}
                style={{ margin: "auto" }}
              >
                <FormControl variant="outlined">
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => handleClickOpen('company')}
                  >
                    <AddIcon className={classes.addbtn} />
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <br />
            <FormControl>
              <TextField
                id="outlined-Discount Title-input"
                label="Coupon Code"
                type="coupon code"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                Ex. code50, off786, usb_90...
              </FormHelperText>
            </FormControl>
            <br />

            <FormControl>
              <TextField
                id="outlined-Discount Title-input"
                label="Discount Title"
                type="Discount Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                Ex. Flat 50 off & 50% off
              </FormHelperText>
            </FormControl>
            <br />
            <FormControl variant="outlined">
              <TextareaAutosize
                className={classes.txtarea}
                placeholder="Discription of a offer"
                rowsMin={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormHelperText id="my-helper-text">
                Ex. Upto Rs. 50 Amazon Pay Cashback on Payments done via Amazon
                Pay UPI (New User)
              </FormHelperText>
            </FormControl>
            <br />

            {/* dropdown for category  */}
            <Grid container >
              <Grid
                xs={6}
                sm={6}
                md={6}
                lg={11}
                xl={10}
                style={{ margin: "auto" }}
              >

                <FormControl variant="outlined" style={{ width: "95%" }}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Categories
              </InputLabel>
                  <Select
                    native
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    label="Categories"
                  >
                    <option aria-label="None" value="" />
                    {categoryList &&
                      categoryList.map((item, ind) => {
                        return (
                          <option id={ind} value={item.id}>

                            {item.name}
                          </option>
                        );
                      })}
                    {/* <option> For All User</option>
              <option>User Specific</option> */}
                  </Select>
                </FormControl>
                <FormHelperText id="my-helper-text" style={{ position: "absolute" }}>
                  In Case Categories not Found Click on Add Button
              </FormHelperText>
              
              </Grid>
              <br />
              <br />
              <Grid
                xs={6}
                sm={6}
                md={6}
                lg={1}
                xl={2}
                style={{ margin: "auto" }}
              >
                <FormControl variant="outlined">
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => handleClickOpen('category')}
                  >
                    <AddIcon className={classes.addbtn} />
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
            <br /> <br />

            {/* dropdown for subcategory */}
            <Grid container >
              <Grid
                xs={6}
                sm={6}
                md={6}
                lg={11}
                xl={10}
                style={{ margin: "auto" }}
              >

                <FormControl variant="outlined" style={{ width: "95%" }}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    sub-categories
              </InputLabel>
                  <Select
                    native
                    value={subcategoryId}
                    onChange={(e) => setSubcategoryId(e.target.value)}
                    label="subcategories"
                  >
                    <option aria-label="None" value="" />
                    {subcategoryList &&
                      subcategoryList.map((item, ind) => {
                        return (
                          <option id={ind} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    {/* <option> For All User</option>
              <option>User Specific</option> */}
                  </Select>
                </FormControl>
                <FormHelperText id="my-helper-text" style={{ position: "absolute" }}>
                  In Case sub-categories not Found Click on Add Button
              </FormHelperText>
              </Grid>
              <br />
              <Grid
                xs={6}
                sm={6}
                md={6}
                lg={1}
                xl={2}
                style={{ margin: "auto" }}
              >
                <FormControl variant="outlined">
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => handleClickOpen('subcategory')}
                  >
                    <AddIcon className={classes.addbtn} />
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
            <br />


            <FormControl variant="outlined">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Expiry Date of Offer"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

            </FormControl>
            <br />
            <FormControl>
              <Button
                variant="outlined"
                className={classes.submitbtn}
                onClick={() => handleFormSubmit()}
              >
                Submit
              </Button>
            </FormControl>
            <br />


            {/* ************************ popup *************************************/}
            <FormControl>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle
                  id="alert-dialog-title"
                  className={classes.dialogbox}
                >
                  {`Add ${popupType} Details.`}
                </DialogTitle>
                <DialogContent>
                  <FormControl style={{ width: "100%", marginBottom: "10px" }}>
                    <TextField
                      id="outlined-Discount Title-input"
                      label={`${popupType} Name`}
                      type={`${popupType} Name`}
                      variant="outlined"
                      value={popupType == 'company' ? companyName : popupType == 'category' ? categoryName : popupType == 'subcategory' ? subcategoryName : ''}
                      onChange={(e) => popupType == 'company' ? setCompanyName(e.target.value) : popupType == 'category' ? setCategoryName(e.target.value) : popupType == 'subcategory' ? setSubcategoryName(e.target.value) : setCompanyName(e.target.value)}
                    />
                    <FormHelperText id="my-helper-text">
                      Ex. Amazon, Flipkart, Freecharge...
                    </FormHelperText>
                  </FormControl>
                  <br />

                  {/* drop dowwn for subcategory */}

                  <FormControl style={{ width: "100%" }}>
                    {/* show dropdown field in case of subcategory and category  */}
                    {popupType == 'subcategory' ?
                      <FormControl variant="outlined" style={{ width: "100%", marginBottom: "10px" }}>
                        <InputLabel htmlFor="outlined-age-native-simple">
                          {popupType == 'subcategory' ? 'Select Category' : ''}
                        </InputLabel>
                        <Select
                          native
                          value={popupType == 'category' ? companyId : popupType == 'subcategory' ? categoryId : ''}
                          onChange={(e) => popupType == 'category' ? setCompanyId(e.target.value) : popupType == 'subcategory' ? setCategoryId(e.target.value) : setCategoryId(e.target.value)}
                          label={popupType == 'category' ? 'Select Company' : popupType == 'subcategory' ? 'Select Category' : ''}
                        >
                          <option aria-label="None" value="" />
                          {popupType == 'subcategory' ? categoryList &&
                            categoryList.map((item, ind) => {
                              return (
                                <option id={ind} value={item.id}>
                                  {item.name}
                                </option>
                              );
                            }) : <option id={1} value={1}>
                            {'No data found'}
                          </option>}
                        </Select>
                      </FormControl>
                      : null}


                    {/* show upload image box only in case of company toupload company image  */}
                    {popupType == 'company' ?
                      <React.Fragment>
                        <Grid container className={classes.uploadform}>
                          <Grid
                            xs={6}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                            style={{ margin: "auto" }}
                          >
                            <input type="file" onChange={onSelectFile} />
                          </Grid>
                          <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
                            {selectedFile && (
                              <img src={preview} className={classes.uploadimg} />
                            )}
                          </Grid>
                        </Grid>
                        <FormHelperText id="my-helper-text">
                          Ex. Logo of a Company which provides Coupon
                    </FormHelperText>
                      </React.Fragment>
                      : null}

                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => handlePopupFormSubmit(popupType)}
                    color="primary"
                  >
                    Submit
                  </Button>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </FormControl>
          </FormControl>
        </Paper>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default UploadCoupon;
