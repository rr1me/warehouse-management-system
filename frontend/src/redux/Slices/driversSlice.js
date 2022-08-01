import {createSlice, current} from "@reduxjs/toolkit";
import {addDriver, deleteDriver, updateDriver} from "../../Services/DriversService";

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
                
                const changed = state.drivers[id].changed;
                
                if(changed){
                    const driver = state.drivers[id];
                    if (driver.id !== 0)
                        updateDriver(current(driver)).then(r => console.log(r));
                    else
                        addDriver(current(driver)).then(r => console.log(r));
                }
            }
        },
        driverToDelete(state, action) {
            const id = action.payload;
            console.log(id);
            state.drivers = state.drivers.filter(x => x.id !== id);
            deleteDriver(id).then(r => console.log(r));
        },
        addEmptyDriver(state){
            state.editing = true;
            state.drivers.unshift({name: '', phoneNumber: '', status:3, cargoes: null, image: "250x250.png", imageSrc: "http://localhost:5000/Images/250x250.png", editing: true});
        }
    }
});

export const {setAllDrivers, setDriverName, setDriverStatus, changeEdit, setDriverPhoneNumber, driverToDelete, addEmptyDriver} = driversSlice.actions
export default driversSlice.reducer