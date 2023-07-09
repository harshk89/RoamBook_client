import { makeStyles } from "@mui/styles";

export default makeStyles ((theme) => ({
    card: {
        background: "linear-gradient(90deg, rgba(255,242,226,1) 23%, rgba(255,232,252,1) 75%)",
        position: "relative",
        transition: "all 0.8s",
        height: '500px',
        padding: "0px",
        // '&:hover': {
        //     scale: "1.05"
        // }
    },
    cardHeader: {
        maxHeight: "25px",
        overflowY: "hidden" 
    },
    cardMedia: {
        height: "250px",
    },
    cardContent: {
        height: "115px",
        overflowY: "scroll",
        '&::-webkit-scrollbar': {
            display: "none"
        }
    },
    cardActions: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "10px",
        marginRight: "10px",
        margin: "0px",
        overflowY: "hidden" 
    }
}));