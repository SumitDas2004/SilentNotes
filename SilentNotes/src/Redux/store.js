import { configureStore } from "@reduxjs/toolkit";
import AuthorizationReducer from "./UserDetailsReducer";
import PostReducer from "./PostsReducer";

export default configureStore({
    reducer: {
        userdetails: AuthorizationReducer,
        posts: PostReducer
    }
})