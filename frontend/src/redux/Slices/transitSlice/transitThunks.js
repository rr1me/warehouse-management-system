import {createAsyncThunk} from "@reduxjs/toolkit";
import {addTransit, deleteTransit, getTransits, updateTransit} from "../../../Services/transitService";
import {cargoSorts} from "./transitSliceProps";

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
