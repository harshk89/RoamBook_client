import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';

import useStyles from './styles';

const Paginate = ({ page  }) => {
    const { posts, isLoading, numberOfPage, theme } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(page)
            dispatch(getPosts(page));
    }, [page])
    
    const paginationStyles = () => {
        return(
            theme==="light"?{
                backgroundColor: "#0099c1",
                borderRadius: '5px',
            }:{
                backgroundColor: "black",
                borderRadius: '5px'
            }
        )
        
    }
    const paginationItemStyles = () => {
        return(
            theme==='light'?{
                color: 'black',
                backgroundColor:'#aae8fd',
                margin: '7px',
                fontWeight: '600'
            }:{
                color: 'white',
                backgroundColor:'#494949',
                margin: '7px',
                fontWeight: '600'
            }
        )
    }

    return (
        <Pagination
            classes={{ul: classes.ul}}
            size="small"
            style={paginationStyles()}
            count = {numberOfPage}
            page={Number(page) || 1}
            variant="outlined"
            color="primary" 
            renderItem={(item)=>(
                <PaginationItem style={paginationItemStyles()} { ...item } component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;