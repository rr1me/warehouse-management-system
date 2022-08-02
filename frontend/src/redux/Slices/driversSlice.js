﻿import {addDriver, deleteDriver, updateDriver} from "../../Services/DriversService";
import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";

export const changeEditWithReq = createAsyncThunk(
    'driversSlice/setIdForAddedDriver',
    async (id : number, {dispatch, getState}) => {
        dispatch(changeEdit(id));
        const state = getState().driversSlice;

        const changed = state.drivers[id].changed;
        if(changed) {
            const driver = state.drivers[id];
            if (!driver.isNew){
                updateDriver(driver).then(r => console.log(r));
            }
            else{
                console.log("?")
                // addDriver(current(driver));
                const r = await addDriver(driver);
                console.log(r);
                
                return {driverIndex: id, driverId: r.data};
            }
        }
    }
);

// export const testthunk = createAsyncThunk(
//     'driversSlice/setIdForAddedDriver',
//     async (id, thunkAPI) => {
//         const gamno = thunkAPI.getState().driversSlice;
//         console.log(gamno)
//         console.log(id)
//     }
// )

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
            const id = action.payload.id;
            state.drivers[id].name = action.payload.name;
            state.drivers[id].changed = true;
        },
        setDriverStatus(state, action){
            const id = action.payload.id;
            state.drivers[id].status = action.payload.status;
            state.drivers[id].changed = true;
        },
        setDriverPhoneNumber(state, action){
            const id = action.payload.id;
            state.drivers[id].phoneNumber = action.payload.phoneNumber;
            state.drivers[id].changed = true;
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

                // const changed = state.drivers[id].changed;
                // if(changed){
                //     const driver = state.drivers[id];
                //     if (!driver.isNew)
                //         updateDriver(current(driver)).then(r => console.log(r));
                //     else{
                //         addDriver(current(driver));
                //         delete state.drivers[id].isNew;
                //     }
                // }
            }
        },
        driverToDelete(state, action) {
            const indexId = action.payload.index;
            const driverId = action.payload.id
            
            const isNew = state.drivers[indexId].isNew;
            
            state.drivers = state.drivers.filter((value, index) => {
                return index !== indexId;
            });
            if (isNew === undefined)
                deleteDriver(driverId).then(r => console.log(r));
        },
        addEmptyDriver(state){
            state.editing = true;
            state.drivers.unshift({name: '', phoneNumber: '', status:3, cargoes: null, image: "250x250.png", imageSrc: "http://localhost:5000/Images/250x250.png", editing: true, isNew:true});
        }
    },
    extraReducers: (builder) => {
        builder.addCase(changeEditWithReq.fulfilled, (state, action) => {
            console.log(action);
            const driverIndex = action.payload.driverIndex;
            const driverId = action.payload.driverId;

            state.drivers[driverIndex].id = driverId;
            delete state.drivers[driverIndex].isNew;
        });
    }
});

export const {setAllDrivers, setDriverName, setDriverStatus, changeEdit, setDriverPhoneNumber, driverToDelete, addEmptyDriver} = driversSlice.actions
export default driversSlice.reducer