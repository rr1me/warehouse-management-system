import {createSlice} from "@reduxjs/toolkit";

const testDateSlice = createSlice({
    name: 'testDateSlice',
    initialState: {
        date: '2022-08-04T12:44:55.931881Z'
    },
    reducers: {
        setDate(state, action){
            state.date = action.payload;
        }
    }
});

export const {setDate} = testDateSlice.actions;
export default testDateSlice.reducer;