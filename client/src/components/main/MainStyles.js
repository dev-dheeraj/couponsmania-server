import { makeStyles } from '@material-ui/core/styles';

const MainStyles = makeStyles ({
    card: {
        margin:'20px',
        maxWidth: 345,
       
        border:"1px solid rgba(0, 0, 0, 0.1);",
        '&:hover' :{
          "& $description": {
            whiteSpace: "normal",
          },
          "& $companyname": {
            whiteSpace: "normal",
        }
      }
      },
      companylogo: {
        height: "100px",
        width:"100px",
        margin:"auto"
      },
      companyname:{
        overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    // '&:hover': {
    //   whiteSpace: "normal",
    // }
      },
      description:{
        overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    // '&:hover': {
    //   whiteSpace: "normal",
    // }
      },
      coupanbtn:{
        backgroundColor:"#635b5b",
        margin:'auto',
        color : "#fff",
        padding:'5px 10px'

      },
      spinloader : {
        animationName: "spinning",
        animationDuration: "3s",
        animationIterationCount: "infinite",
        /* linear | ease | ease-in | ease-out | ease-in-out */
        animationTimingFunction: "linear",
      }
        // paper: {
        //     height: 140,
        //     width: 100,
        //   },
      

});
export { MainStyles };