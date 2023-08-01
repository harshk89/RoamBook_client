import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginLeft: '50px',
    marginRight: '50px',
    padding: '20px',
    borderRadius: '15px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '10px',
      marginRight: '10px',
    },
  },
  media: {
    borderRadius: '20px',
    objectFit: 'contain',
    width: '100%',
    // cursor: 'default',
    // '&:hover': {
    //     cursor: 'pointer'
    // }
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsContainer: {
    height: '200px',
    width: '40vw',
    [theme.breakpoints.down('sm')]: {
      width: '70vw'
    },
    overflowY: 'auto',
    marginRight: '30px',
    marginBottom: '20px'
  }
}));