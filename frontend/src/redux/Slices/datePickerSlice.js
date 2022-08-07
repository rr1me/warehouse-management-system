import {createSlice} from "@reduxjs/toolkit";

const initialDate = new Date();

const makeDateForInput = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    // return year+"-"+(month < 10 ? "0"+ month : month)+"-"+(day < 10 ? "0"+ day : day)+"T00:00";
    return year+"."+(month < 10 ? "0"+ month : month)+"."+(day < 10 ? "0"+ day : day)+" 00:00";
};

const dpDate = createSlice({
    name: "dpDate",
    initialState: {
        overallDate: initialDate.getTime(),
        selectedDate: null,
        inputState: makeDateForInput(initialDate)
    },
    reducers: {
        overallDateReducer(state, action){
            state.overallDate = action.payload;
        },
        selectedDateReducer(state, action){
            const date = action.payload;
            state.selectedDate = date;
            state.inputState = makeDateForInput(new Date(date));
        }
    }
});

export const {overallDateReducer, selectedDateReducer} = dpDate.actions
export default dpDate.reducer
