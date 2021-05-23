import { fade, makeStyles } from '@material-ui/core/styles';


const FooterStyles = makeStyles((theme) => ({ 
  root:{
    background:"#635b5b",
    padding:"25px"
  },
  title: {
    display: 'none',
    margin: '-84px 0px 0px 136px',
    color:"white",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title1:{
    display: 'none',
    margin: "3px auto auto 124px",
  color: "#ff9c00",
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
},
}));
export { FooterStyles };