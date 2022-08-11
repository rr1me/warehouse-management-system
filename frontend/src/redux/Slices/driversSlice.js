import {addDriver, deleteDriver, getDrivers, updateDriver} from "../../Services/DriversService";
import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";

export const getDriversThunk = createAsyncThunk(
    'drivers/getDriversThunk',
    async () => {
        const r = await getDrivers();
        console.log(r);
        return r.data.map(v => {
            return {driver: {prev:v, curr: v}, states: {editing: false, isNew: false}};
        }).sort((a, b) => a.driver.curr.id - b.driver.curr.id);
    }
);

export const deleteDriverThunk = createAsyncThunk(
    'drivers/deleteDriver',
    async ({index, id}) => {
        //todo check foreignKeys, mb make deleteDeny event if driver has some cargo assigned
        
        const r = await deleteDriver(id);
        console.log(r);
        return index;
    }
);

export const editDriverThunk = createAsyncThunk(
    'drivers/editDriver',
    async (index: number, {getState, rejectWithValue}) => {
        const state = getState().driversSlice.driversEntities;
        
        const previous = state[index].driver.prev;
        const current = state[index].driver.curr;
        
        if (previous === current)
            return rejectWithValue("same");
        
        const {isNew} = state[index].states;
        let r;
        try{
            r = isNew ? await addDriver(current) : await updateDriver(current);
        }catch(e){
            rejectWithValue(e);
        }
        
        console.log(r);
        return {index: index, id: (isNew ? r.data : 0)};
    }
)

const driversSlice = createSlice({
    name: 'driversSlice',
    initialState: {
        driversEntities: {},
        editingGlobal: false,
        sort: 0
    },
    reducers: {
        setDriverName(state, action){
            const {index, name} = action.payload;
            
            state.driversEntities[index].driver.curr.name = name;
        },
        setDriverPhoneNumber(state, action){
            const {index, phoneNumber} = action.payload;

            state.driversEntities[index].driver.curr.phoneNumber = phoneNumber;
        },
        setDriverStatus(state, action){
            const {index, status} = action.payload;
            
            console.log(index+" "+status);
            console.log(current(state.driversEntities[index].driver.curr))
            state.driversEntities[index].driver.curr.status = status;
        },
        sortDrivers(state, action){
            const sortType = action.payload;

            state.driversEntities = state.driversEntities.sort(sort[sortType]);
            state.sort = sortType;
        },
        addEmptyDriver(state){
            const driver = {name: '', phoneNumber: '', status:3, cargoes: null, image: "250x250.png", imageSrc: "http://localhost:5000/Images/250x250.png"}
            state.driversEntities.unshift({driver:{prev: driver, curr: driver}, states:{editing: true, isNew:true}})
            state.editingGlobal = true;
        },
        cancelEditDriver(state, action){
            const index = action.payload;
            const isNew = state.driversEntities[index].states.isNew
            
            if (!isNew){
                state.driversEntities[index].driver.curr = state.driversEntities[index].driver.prev;
                state.driversEntities[index].states.editing = false;
            }else
                state.driversEntities = state.driversEntities.filter((v, i) => {return i !== index});
            
            state.editingGlobal = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(getDriversThunk.fulfilled, (state, action) => {
            state.driversEntities = action.payload;
        }).addCase(deleteDriverThunk.fulfilled, (state, action) => {
            const index = action.payload;

            state.driversEntities = state.driversEntities.filter((v, i) => {return i !== index});
        }).addCase(editDriverThunk.fulfilled, (state, action) => {
            const {index, id} = action.payload;
            
            const isNew = state.driversEntities[index].states.isNew;
            if (isNew){
                state.driversEntities[index].driver.curr.id = id;
                state.driversEntities[index].states.isNew = false;
            }
            
            state.driversEntities[index].driver.prev = state.driversEntities[index].driver.curr;
        }).addCase(editDriverThunk.pending, (state, action) => {
            const index = action.meta.arg;

            const editingGlobal = state.editingGlobal;
            const editingLocal = state.driversEntities[index].states.editing
            
            if (!editingGlobal || editingLocal){
                state.driversEntities[index].states.editing = !editingLocal;
                state.editingGlobal = !editingLocal;
            }
        }); 
    }
});

export const {setDriverName, setDriverPhoneNumber, setDriverStatus, sortDrivers, addEmptyDriver, cancelEditDriver} = driversSlice.actions
export default driversSlice.reducer

const sort = [
    (a, b) => a.driver.curr.id - b.driver.curr.id,
    (a, b) => a.driver.curr.name.localeCompare(b.driver.curr.name),
    (a, b) => a.driver.curr.status - b.driver.curr.status
]