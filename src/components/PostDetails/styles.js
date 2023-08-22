import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    // background: "linear-gradient(90deg, rgba(255,196,196,1) 21%, rgba(255,219,193,1) 71%)",
    background: "#ffcbcb",
    margin: "auto",
    padding: '20px',
    borderRadius: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: "2px"
    },
    maxWidth: "1000px",
  },
  media: {
    margin: "auto",
    borderRadius: '20px',
    objectFit: 'contain',
    maxHeight: '800px',
    width: "100%",
    // cursor: 'default',
    // '&:hover': {
    //     cursor: 'pointer'
    // }
  },
  card: {
    // display: 'flex',
    // width: '100%',
    // [theme.breakpoints.down('sm')]: {
    //   flexWrap: 'wrap',
    //   flexDirection: 'column',
    // },
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  section: {
    borderRadius: '20px',
    margin: '20px',
    flex: 1,
  },
  imageSection: {
    display: "flex",
    margin: "auto",
    maxHeight: "800px",
    marginBottom: "40px",
    // [theme.breakpoints.down('sm')]: {
    //   marginLeft: 0,
    // },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    background: "#ffcbcb",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: "auto",
    borderRadius: '20px',
    height: '50vh',
    [theme.breakpoints.down('md')]: {
      marginLeft: '10px',
      marginRight: '10px',
    },
    maxWidth: "1000px"
  },
  commentsContainer: {
    maxHeight: '200px',
    width: '40vw',
    [theme.breakpoints.down('sm')]: {
      width: '70vw'
    },
    overflowY: 'auto',
    marginRight: '30px',
    marginBottom: '20px'
  }
}));