import { makeStyles } from "@material-ui/core/styles";
import Background from "../../images/uploadcouponback.png"
const UploadCouponStyles = makeStyles({
  main:{
    height:"auto",
    backgroundImage:`url(${Background})`,
    backgroundSize:"cover",
    display: "flex", 
  },
  formback:{
    margin:"auto",

  },
  paper: {
    height:"fit-content",
    padding:"30px",
    margin:'25px auto',
    // border:"2px solid #635b5b",
  },
  txtarea: {
    resize: "none",
    height: "150px",
  },
  fileuploadbtn:{
    position:"absolute",
    backgroundColor: "#635b5b",
    color: "white",
    padding: "0.5rem",
    borderRadius: "0.3rem",
    cursor: "pointer",
    marginTop: "10px",
    textAlign:"center"
  },
  uploadform:{
    border:"1px solid lightgray",
     borderRadius: "5px",
     padding:'15px 20px'
  },
  uploadimg:{
    height:"100px",
    width:'100px'
  },
  submitbtn:{
    color:"#635b5b"
  },
  dialogbox:{
    minWidth:"550px"
  },
  addbtn:{
    padding:"9px 15px"
  },
});
export { UploadCouponStyles };
