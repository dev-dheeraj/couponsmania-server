import { fade, makeStyles } from '@material-ui/core/styles';


const HeaderStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      margin: '-28px 0px 0px -12px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    title1:{
      display: 'none',
      margin: "45px 0px auto -54px",
    color: "#ff9c00",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    
    },
    socialicon: {
      display: 'none',
      margin: '0px 0px 5px -12px',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    formControl: {
      margin:'auto',
      padding:'3.7px',
      width: 110,
      backgroundColor:'lightgray',
      
    },
    search: {
      display:'flex',
      position: 'relative',
      margin : 'auto',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 1),
      '&:hover': {
        backgroundColor: "lightgray"
      },
      // marginRight: theme.spacing(2),
      // margin : 'auto',
      width: 'auto',
      [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(1, 2),
      height: '100%',
      position: 'relative',
      pointerEvents: 'none',
      display: 'flex',
      margin: "auto",
      alignItems: 'center',
      justifyContent: 'center',
      background:"red",
      backgroundSize:'cover',
    
    },
    inputRoot: {
      color: 'black',
      fontWeight:'600',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(.10)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '50ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));
  export { HeaderStyles };