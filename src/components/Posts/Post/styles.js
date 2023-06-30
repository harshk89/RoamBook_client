import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '500px',
    position: 'relative'
  },
  cardContent: {
    height: "250px",
    overflowY: "scroll",
    background: 'linear-gradient(90deg, rgba(251,139,41,1) 0%, rgba(233,46,128,1) 100%)'
  },
  media: {
    height: "250px",
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '15px',
    right: '10px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
    background: 'linear-gradient(90deg, rgba(180,58,146,1) 0%, rgba(253,175,29,1) 50%, rgba(75,208,250,1) 100%)'
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '4px 16px 4px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});