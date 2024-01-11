import React from 'react'
import { useSelector } from 'react-redux';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const Input = ({ error='none', half, name, handleChange, label, autoFocus, type, handleShowPassword }) => {

  const { isLoading, theme } = useSelector((state) => state.posts);

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        {error==='none' ? 
            <TextField 
                style={{backgroundColor:'#fcfcfc'}}
                name={name} 
                onChange={handleChange} 
                variant='outlined' 
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            /> : 
            <TextField 
                error
                helperText={error}
                name={name} 
                onChange={handleChange} 
                variant='outlined' 
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            /> 
        }
    </Grid>
  )
}

export default Input