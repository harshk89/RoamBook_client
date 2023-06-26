import axios from 'axios';
import jwt_decode from 'jwt-decode';

// const url = 'http://localhost:5000/posts';
// export const fetchPosts = () => axios.get(url);

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search/searchpost?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (comment, id) => API.post(`/posts/${id}/commentPost`, { comment });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const createOrGetUser = async (response) => {
    // console.log(response.credential);
    const decoded = jwt_decode(response.credential);

    const { name, email, picture, sub } = decoded;

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        email: email,
        image: picture
    }
    //now create the user similar like signUp

    console.log(user);
}