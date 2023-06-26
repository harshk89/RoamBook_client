import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    '& input[type="file" i]::-webkit-file-upload-button': {
      padding: '7px 10px',
      border: 'none',
      borderRadius: '5px',
      color: 'white',
      fontSize: '1rem',
      backgroundColor: '#0099ff'
    },
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));