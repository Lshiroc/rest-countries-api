import { createSlice } from "@reduxjs/toolkit";

export const statesReducer = createSlice({
    name: 'statesReducer',
    initialState: {
        theme: null,
    },
    reducers    : {
        changeTheme: (state, action) => {
            state[action.payload.stateName] = action.payload.value;
        }
    }
})

export default statesReducer.reducer;
export const { changeTheme } = statesReducer.actions;