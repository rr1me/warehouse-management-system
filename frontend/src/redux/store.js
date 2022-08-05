import {combineReducers, configureStore} from '@reduxjs/toolkit'

import authSlice from "./Slices/authSlice";
import datePickerSlice from "./Slices/datePickerSlice";
import driversSlice from "./Slices/driversSlice";
import cargoSlice from "./Slices/cargoSlice";

// const dpSlice = combineReducers({
//     dpSlice: datePickerSlice
// })

export const store = configureStore({
    reducer: {authSlice, datePickerSlice, driversSlice, cargoSlice}
})

