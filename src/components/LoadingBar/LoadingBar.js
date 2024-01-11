import React from 'react'
import { Snackbar, Slide, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const LoadingBar = () => {
    const { isLoading } = useSelector((state) => state.posts);

    function TransitionDown(props) {
        return <Slide {...props} direction="down" />;
    }

    const snackbarStyles = {
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px"
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isLoading}
            // onClose={handleClose}
            TransitionComponent={TransitionDown}
            key={"topcenter"}
        >
            <div style={snackbarStyles}>
                <Typography>
                    Loading&nbsp;
                    <CircularProgress color="inherit" size="1rem" />
                </Typography>
                
            </div>
        </Snackbar>
  )
}

export default LoadingBar