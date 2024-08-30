import { createSlice } from "@reduxjs/toolkit"

const login_slice = createSlice({
    name: "auth",
    initialState: {
        token: "",
        name: "",
        email: "",
        role: "",
        isLoggedIn: false
    },
    reducers: {
        update_auth: (state, action) => {
            state = action.payload;
            state.isLoggedIn = Boolean(action.payload?.token);
            return state;
        },
        reset_auth: (state) => {
            state = {
                token: "",
                name: "",
                email: "",
                role: "",
                isLoggedIn: false
            }
            return state;
        }
    }
});

export const { update_auth, reset_auth } = login_slice.actions;
export default login_slice.reducer;