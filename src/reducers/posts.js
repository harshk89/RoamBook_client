import { FETCH_ALL, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_USERID, CHANGE_THEME } from '../constants/actionTypes';
export default (state = { isLoading: true, posts: [], post:null, currentPage: 1, numberOfPage: 1, theme: "light" }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING: 
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage : action.payload.currentPage,
                numberOfPage: action.payload.numberOfPage
            }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_POST:
            return { ...state, post: action.payload };
        case FETCH_BY_USERID:
            return { ...state, posts: action.payload.data};
        case CREATE:
            return  { ...state, posts: [ action.payload, ...state.posts ]};
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case CHANGE_THEME:
            var newTheme = state.theme==="light"?"dark":"light";
            localStorage.setItem('theme', newTheme);
            return { ...state, theme: newTheme}
        default:
            return state;
    }
}