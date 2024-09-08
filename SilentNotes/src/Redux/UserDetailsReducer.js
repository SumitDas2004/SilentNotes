import { createSlice } from "@reduxjs/toolkit";

const userdetailsSlice = createSlice({
    name:'userdetails',
    initialState:{
        username: '',
        avatar: '',
        id:'',
        collegeName:"",
        collegeDomain:"",
        status:-1//-1=unauthorized, 1=authorized, 0=authorizing  
    },
    reducers:{
        userDetails:(state, action)=>{
            state.username=action.payload.username
            state.id = action.payload.id
            state.avatar = action.payload.avatar
            state.collegeName = action.payload.collegeName
            state.collegeDomain = action.payload.collegeDomain
        },
        logout:(state)=>{
            state.username=''
            state.id = ''
            state.avatar = ''
            state.collegeName = ''
            state.collegeDomain = ''
        },
        changeStatus: (state, action)=>{
            state.status = action.payload
        }
    }
})

export default userdetailsSlice.reducer

export const { userDetails, logout, changeStatus} = userdetailsSlice.actions