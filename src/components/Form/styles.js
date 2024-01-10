import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  // root: {
  //   '& .MuiTextField-root': {
  //     margin: theme.spacing(1),
  //   },
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   marginBottom: '1rem',
  //   background: 'linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)'
  // },
  // form: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center',
  // },
  // textField: {
  //   background: 'Cornsilk',
  //   borderRadius: '5px'
  // },
  fileInput: {
    '& input[type="file" i]::-webkit-file-upload-button': {
      padding: '7px 10px',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      fontSize: '1rem',
      backgroundColor: '#0099ff'
    },
    // width: '97%',
    // margin: '10px 0',
  },
  // buttonSubmit: {
  //   marginBottom: 10,
  // },
  // toggleButton: {
  //   margin:"auto",
  //   width: "100%",
  //   fontSize: "1rem",
  // },
}));