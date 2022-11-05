import {combineReducers, createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {addTransit, deleteTransit, getTransits, updateTransit} from "../../../Services/transitService";
import {cargoErrors, cargoSorts, divideObject, transitErrors, transitLayout} from "./transitSliceProps";
import {transitMainReducers} from "./transitMainReducers";
import {transitCargoReducers} from "./transitCargoReducers";
import {transitPageReducers} from "./transitPageReducers";
import {isNegative} from "../../../Components/BlueTable/BlueTable";

export const thunkTransits = createAsyncThunk(
    'getTransits',
    async (payload) => {
        const {id, type} = payload;
        let r;
        try{
            r = await getTransits();
        }catch(e){
            console.log(e);
        }
        console.log(r);
        const {transits, cargoToAttach} = r.data;
        
        return {transits: transits.map(v => {
                return v;
            }).sort((a,b) => a.date - b.date), id: id, cargoToAttach: cargoToAttach, type: type};
    }
);

export const addTransitThunk = createAsyncThunk( //todo decide what to do with cargoToAttach
    'addTransit',
    async (_, {getState, rejectWithValue}) => {
        const {transitPage} = getState().transitSlice;

        const errors = validateTransit(transitPage);
        if (errors.length !== 0) return rejectWithValue(errors);
        
        let transitToAdd = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object.current)};
        const r = await addTransit(transitToAdd);
        console.log(r);
        
        return r.data;
    }
);

export const updateTransitThunk = createAsyncThunk( //todo added cargo didnt receiving theirs new ids
    'updateTransit',
    async (_, {getState, rejectWithValue}) => {
        const {transitPage, cargoToDelete, sort} = getState().transitSlice;
        
        const errors = validateTransit(transitPage);
        if (errors.length !== 0) return rejectWithValue(errors);
        
        const transitToUpdate = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object.current)};

        const previous = {...transitPage.transit.object.previous, assignedCargo: Array.from(transitPage.transit.object.previous.assignedCargo).sort(cargoSorts[sort.cargo])};
        if (JSON.stringify(previous) === JSON.stringify(transitToUpdate)) return rejectWithValue('same objects');
        
        const transitDTO = {transit: transitToUpdate, cargoToDelete: cargoToDelete};
        const r = await updateTransit(transitDTO);
        console.log(r);
        
        const {transit, cargoToAttach} = r.data;
        transit.assignedCargo.sort(cargoSorts[sort.cargo]);
        return {transit: transit, cargoToAttach: cargoToAttach};
    }
);

const validateTransit = transitPage => {
    const transit = transitPage.transit.object.current;
    const cargo = transitPage.cargo
    const isAnyCargoEditing = cargo.some(v => {
        return v.states.edit;
    });
    
    const errors = [];
    
    if (transit.client === '') errors.push('nullClient');
    if (isAnyCargoEditing) errors.push('editingCargo');
    return errors;
};

export const deleteTransitThunk = createAsyncThunk(
    'deleteTransit',
    async (id: number, {getState}) => {
        const {transitPage} = getState().transitSlice;

        const transitToDelete = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};
        
        const r = await deleteTransit(transitToDelete);
        console.log(r);
        return {id: id, cargoToAttach: r.data};
    }
);

const rootReducer = combineReducers({
    transitMainReducers,
    transitPageReducers,
    transitCargoReducers
})

const transitSlice = createSlice({
    name: 'transits',
    initialState: {
        transits: {},
        sort: {transit: 0, cargo: 0},
        transitPage: {},
        cargoToDelete: [],
        cargoToAttach: []
    },
    reducers: {main: transitMainReducers, page: transitPageReducers, cargo: transitCargoReducers},
    extraReducers: (builder) => {
        builder.addCase(thunkTransits.fulfilled, (state, action) => {
            const {transits, id, cargoToAttach, type} = action.payload;
            state.transits = transits;
            state.cargoToAttach = cargoToAttach;
            if (id !== undefined)
                transitSlice.caseReducers.getTransitForPage(state, {payload: {id: id, type: type}});
        }).addCase(updateTransitThunk.fulfilled, (state, action) => {
            const {transit, cargoToAttach} = action.payload;
            
            console.log(transit);
            const index = state.transits.findIndex(v => v.id === transit.id);
            
            state.transits[index] = transit;
            state.transitPage = {transit: {object: divideObject(transit), states: {edit: false}, errors: transitErrors}, cargo: transit.assignedCargo.map(cargo => {
                    return {object: divideObject(cargo), states: {edit: false}, errors: cargoErrors}
                }), cargoToAttach: cargoToAttach};
            
            state.cargoToDelete = [];
            state.cargoToAttach = cargoToAttach;
        }).addCase(deleteTransitThunk.fulfilled, (state, action) => {
            const {id, cargoToAttach} = action.payload;
            
            state.transits = state.transits.filter(v => v.id !== id);
            state.cargoToAttach = cargoToAttach;
        }).addCase(addTransitThunk.fulfilled, (state, action) => {
            const {transit, cargoToAttach} = action.payload;
            console.log([current(state.transits), transit]);
            state.transits.push(transit);
            state.cargoToAttach = cargoToAttach;
        }).addCase(addTransitThunk.rejected, (state, action) => {
            const errors = action.payload;

            errors.map(v => {
                state.transitPage.transit.errors[v] = true;
            })
        }).addCase(updateTransitThunk.rejected, (state, action) => {
            const errors = action.payload;
            
            if (errors === 'same objects') {
                state.transitPage.transit.states.edit = false;
                return;
            }
            
            errors.map(v => {
                state.transitPage.transit.errors[v] = true;
            })
        })
    }
});

console.log(transitSlice)

export const actions = transitSlice.actions;
// export const {main, page, cargo} = transitSlice.actions;
export default transitSlice.reducer;
