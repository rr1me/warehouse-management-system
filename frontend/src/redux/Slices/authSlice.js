import {createSlice} from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const authSlice = createSlice({
    name: "auth",
    initialState: {
        logged: !!user,
        // logged: true,
        username: user ? user.username : null,
        role: user ? user.role : null,
    },
    reducers: {
        logged(state){
            state.logged = true;
            
            const user = JSON.parse(localStorage.getItem("user"));
            state.username = user.username;
            state.role = user.role;
        },
        unlogged(state){
            state.logged = false;
            
            localStorage.removeItem("user");
            state.username = null;
            state.role = null;
        },
    }
})

export default authSlice.reducer
export const {logged, unlogged} = authSlice.actions