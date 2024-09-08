import { configureStore } from "@reduxjs/toolkit";
import AuthorizationReducer from "./UserDetailsReducer";

export default configureStore({
    reducer: {
        userdetails: AuthorizationReducer
    }
})