import {configureStore} from '@reduxjs/toolkit'

import authSlice from "./Slices/authSlice";
import driversSlice from "./Slices/driversSlice";
import cargoSlice from "./Slices/cargoSlice";
import testDateSlice from "./Slices/testDateSlice";

export const store = configureStore({
    reducer: {authSlice, driversSlice, cargoSlice, testDateSlice}
})

