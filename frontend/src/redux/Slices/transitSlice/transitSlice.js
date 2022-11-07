import {createSlice, current} from "@reduxjs/toolkit";
import {cargoErrors, cargoStates, divideObject, transitErrors} from "./transitSliceProps";
import {transitMainReducers} from "./transitMainReducers";
import {transitCargoReducers} from "./transitCargoReducers";
import {transitPageReducers} from "./transitPageReducers";
import {addTransitThunk, deleteTransitThunk, thunkTransits, updateTransitThunk} from "./transitThunks";

const transitSlice = createSlice({
    name: 'transits',
    initialState: {
        transits: {},
        sort: {transit: 0, cargo: 0},
        transitPage: {},
        cargoToDelete: [],
        cargoToAttach: []
    },
    reducers: {...transitMainReducers, ...transitPageReducers, ...transitCargoReducers},
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
                    return {object: divideObject(cargo), states: cargoStates(), errors: cargoErrors}
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
export default transitSlice.reducer;
