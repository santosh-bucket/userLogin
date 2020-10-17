import { combineReducers } from 'redux';
import { User } from "./user";
import { Blog } from "./blog";
import { Login } from "./login";

export default combineReducers({    
    User,
    Blog,
    Login
})