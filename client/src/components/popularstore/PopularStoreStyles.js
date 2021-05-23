import { makeStyles, useTheme } from "@material-ui/core";

const PopularStoreStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "35px 25px",
  },
  headingtitle:{
      fontWeight:"600",
      color:"#635b5b",
      textAlign:'center'

  },
  paper: {
      zIndex:"10",
      margin:"10px",
    display: "flex",
    height: 200,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  background: "linear-gradient(to left, #fff 50%, rgba(99, 91, 91, 0.9) 50% ) right;",
  backgroundSize: "200%",
  transition: ".5s ease-out",


    '&:hover': {
        
         opacity:'0.91',
        backgroundPosition: "left",
        backgroundColor: "#008CBA",
        cursor:"pointer",
        "& $brand": {
          opacity:'0.1',
        
        },
        "& $couponavailable": {
          position:"absolute",
          fontSize:"20px",
          color:"white",
          textAlign:"center",
          display:'flex',
          margin:"auto"
          
        
        }
    },
  
    

  },
  couponavailable :{
    display:"none",
   
  },

 
  brand: {
    height: 175,
    width: "150px",
    margin: "auto",
    zIndex:"100",
  },
 
}));
export { PopularStoreStyles };
