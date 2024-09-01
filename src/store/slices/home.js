import { createSlice } from "@reduxjs/toolkit"

const home_slice = createSlice({
    name: "home",
    initialState: {
        gigs: [],
        gigsters: []
    },
    reducers: {
        update_home: (state, action) => {
            state = action.payload;
            return state;
        },
        reset_home: (state) => {
            state = {
                gigs: [],
                gigsters: []
            }
            return state;
        }
    }
});

export const { update_home, reset_home } = home_slice.actions;
export default home_slice.reducer;