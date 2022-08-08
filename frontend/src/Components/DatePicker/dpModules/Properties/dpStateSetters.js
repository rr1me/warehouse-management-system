import {overallDateReducer, selectedDateReducer} from "../../../../redux/Slices/datePickerSlice";

export const setOverallDate = (dispatch, date) => {
    const ticks = getTicks(date);
    dispatch(overallDateReducer(ticks));
};

export const setSelectedDate = (dispatch, date) => {
    const ticks = getTicks(date);
    dispatch(selectedDateReducer(ticks));
};

const getTicks = date => {
    return date.getTime();
};