import React from 'react'
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux'

const Footer = () => {
  const { theme } = useSelector((state) => state.posts);
  const footerStyles = () => {
    return(
        theme==="light"?{
            background: "linear-gradient(90deg, rgba(0,153,193,1) 46%, rgba(4,174,178,1) 100%)",
            color: "white",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "40px",
        }:{
            backgroundColor: "black",
            color: "white",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "40px",
        }
    )
  }
  return (
    <div style={footerStyles()}>
        <Typography variant='body1'>
            Created by Harsh Kesarwani
        </Typography>
    </div>
  )
}

export default Footer