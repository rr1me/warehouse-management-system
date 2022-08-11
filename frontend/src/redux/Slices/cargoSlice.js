import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addCargo, deleteCargo, getCargo, updateCargo} from "../../Services/CargoService";

export const thunkCargo = createAsyncThunk(
    'getCargoes/cargoesSlice',
    async () => {
        const r = await getCargo();
        console.log(r);
        return r.data.map(v => {
            return {cargo: {prev: v, curr: v}, states: {editing: false, isNew: false}};
        }).sort((a, b) => a.cargo.curr.id - b.cargo.curr.id);
    }
);

export const deleteCargoThunk = createAsyncThunk(
    'cargo/deleteCargo',
    async ({index, id}) => {
        const r = await deleteCargo(id);
        console.log(r);
        return index;
    }
);

export const editCargoThunk = createAsyncThunk(
    'cargo/editCargo',
    async (index: number, {getState, rejectWithValue}) => {
        const state = getState().cargoSlice.cargoEntities;

        const previous = state[index].cargo.prev;
        const current = state[index].cargo.curr;

        if (previous === current)
            return rejectWithValue("same");

        const {isNew} = state[index].states;
        
        let r;
        try{
            r = isNew ? await addCargo(current) : await updateCargo(current);
        }catch (e) {
            rejectWithValue(e);
        }
        
        console.log(r);
        return {index: index, id: (isNew ? r.data : 0)};
    }
);

const cargoSlice = createSlice({
    name: 'cargoesSlice',
    initialState: {
        cargoEntities: {},
        editingGlobal: false,
        sort: 0
    },
    reducers: {
        setCargoName(state, action){
            const {index, name} = action.payload;
            
            state.cargoEntities[index].cargo.curr.name = name;
        },
        setArrivalAddress(state, action){
            const {index, arrivalAddress} = action.payload;

            state.cargoEntities[index].cargo.curr.arrivalAddress = arrivalAddress;
        },
        setArrivalDate(state, action){
            const {index, date} = action.payload;
            
            state.cargoEntities[index].cargo.curr.arrivalDate = date;
        },
        sortCargo(state, action){
            const sortType = action.payload;
            
            state.cargoEntities = state.cargoEntities.sort(sort[sortType]);
            state.sort = sortType;
        },
        addEmptyCargo(state){
            const currentDate = new Date().toJSON();
            const cargo = {name: '', arrivalAddress: '', departureAddress: '', arrivalDate: currentDate, departureDate: null, cargoStatus: 0};
            
            state.cargoEntities.unshift({cargo:{prev: cargo, curr: cargo}, states:{editing: true, isNew: true}});
            state.editingGlobal = true;
        },
        cancelEditCargo(state, action){
            const index = action.payload;
            const isNew = state.cargoEntities[index].states.isNew

            if (!isNew){
                state.cargoEntities[index].cargo.curr = state.cargoEntities[index].cargo.prev;
                state.cargoEntities[index].states.editing = false;
            }else
                state.cargoEntities = state.cargoEntities.filter((v, i) => {return i !== index});

            state.editingGlobal = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkCargo.fulfilled, (state, action) => {
            state.cargoEntities =  action.payload;
        }).addCase(deleteCargoThunk.fulfilled, (state, action) => {
            const index = action.payload;

            state.cargoEntities = state.cargoEntities.filter((v, i) => {return i !== index});
        }).addCase(editCargoThunk.fulfilled, (state, action) => {
            const {index, id} = action.payload;

            const isNew = state.cargoEntities[index].states.isNew;
            if (isNew){
                state.cargoEntities[index].cargo.curr.id = id;
                state.cargoEntities[index].states.isNew = false;
            }

            state.cargoEntities[index].cargo.prev = state.cargoEntities[index].cargo.curr;
        }).addCase(editCargoThunk.pending, (state, action) => {
            const index = action.meta.arg;

            const editingGlobal = state.editingGlobal;
            const editingLocal = state.cargoEntities[index].states.editing

            if (!editingGlobal || editingLocal){
                state.cargoEntities[index].states.editing = !editingLocal;
                state.editingGlobal = !editingLocal;
            }
        });
    }
    
});

export const {setCargoName, setArrivalAddress, setArrivalDate, sortCargo, addEmptyCargo, cancelEditCargo} = cargoSlice.actions;
export default cargoSlice.reducer;

const sort = [
    (a, b) => a.cargo.curr.id - b.cargo.curr.id,
    (a, b) => a.cargo.curr.name.localeCompare(b.cargo.curr.name),
    (a, b) => a.cargo.curr.status - b.cargo.curr.status
]