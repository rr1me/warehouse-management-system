import {createSlice} from "@reduxjs/toolkit";

const driversSlice = createSlice({
    name: 'driversSlice',
    initialState: {
        drivers: {}
    },
    reducers: {
        setAllDrivers(state, action){
            state.drivers = action.payload;
        },
        setDriverName(state, action){
            state.drivers[action.payload.id].name = action.payload.name;
        },
        setDriverStatus(state, action){
            state.drivers[action.payload.id].status = action.payload.status;
        },
        changeEdit(state, action){
            const id = action.payload;
            const editing = state.drivers.find(value => value.editing === true);
            const driverEdit = state.drivers[id].editing;
            
            if (editing === undefined){
                state.editing = true;
                state.drivers[id].editing = true;
            }else if(driverEdit){
                state.editing = false;
                state.drivers[id].editing = false;
                
                // const driver = state.drivers[id];
                // delete driver.editing;
                // updateDriver(current(driver)); todo finish crud pattern(update,delete and etc)
            }
        },
        setDriverPhoneNumber(state, action){
            state.drivers[action.payload.id].phoneNumber = action.payload.phoneNumber;
        }
    }
});

export const {setAllDrivers, setDriverName, setDriverStatus, changeEdit, setDriverPhoneNumber} = driversSlice.actions
export default driversSlice.reducer