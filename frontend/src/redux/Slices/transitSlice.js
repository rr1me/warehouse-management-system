﻿import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTransit, deleteTransit, getTransits, updateTransit} from "../../Services/transitService";

export const thunkTransits = createAsyncThunk(
    'getTransits',
    async (id: number) => {
        // console.log(type);
        let r;
        try{
            r = await getTransits();
        }catch(e){
            console.log(e);
        }
        console.log(r);
        
        // console.log({id, type})
        
        return {transits: r.data.map(v => {
                return v;
            }).sort((a,b) => a.date - b.date), id: id};
    }
);

export const addTransitThunk = createAsyncThunk(
    'addTransit',
    async (_, {getState}) => {
        const {transitPage} = getState().transitSlice;
        let transitToAdd = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};
        
        const r = await addTransit(transitToAdd);
        console.log(r);
        
        return r.data;
    }
);

export const updateTransitThunk = createAsyncThunk(
    'updateTransit',
    async (_, {getState}) => {
        const {transitPage, cargoToDelete} = getState().transitSlice;
        const transitToUpdate = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};
        
        const transitDTO = {transit: transitToUpdate, cargoToDelete: cargoToDelete};
        const r = await updateTransit(transitDTO);
        console.log(r);
        
        return transitToUpdate;
    }
);

export const deleteTransitThunk = createAsyncThunk(
    'deleteTransit',
    async (id: number) => {
        
        const r = await deleteTransit(id);
        console.log(r);
        return id;
    }
)

const transitSlice = createSlice({ // todo remake cargoState system
    name: 'transits',
    initialState: {
        transits: {},
        sort: 0,
        transitPage: {},
        cargoToDelete: []
    },
    reducers: {
        getTransitForPage(state, action){
            const {id, type} = action.payload;
            let transit;
            if (id === 'add')
                transit = {id: 0, date: new Date().toJSON(), type: type, status: 0, additionalTasks: 0, assignedCargo: [], client: '', commentary: ''};
            else{
                transit = state.transits.find(v=>v.id === Number(id));
            }
            
            state.transitPage = {transit: {object: {previous: transit, current: transit}, states: {edit: id === 'add'}}, cargo: transit.assignedCargo.map(v => {
                return {object: v, states: {edit: false}}
                })}
        },
        setTransitPageClient(state, action){
            state.transitPage.transit.object.current.client = action.payload;
        },
        setTransitPageCommentary(state, action){
            state.transitPage.transit.object.current.commentary = action.payload;
        },
        setTransitPageType(state, action){
            state.transitPage.transit.object.current.type = action.payload;
        },
        setTransitPageStatus(state, action){
            state.transitPage.transit.object.current.status = action.payload;
        },
        setTransitPageAdditionalTasks(state, action){
            state.transitPage.transit.object.current.additionalTasks = action.payload;
        },
        setTransitPageCargoStickerId(state, action){
            const {index, stickerId} = action.payload;
            state.transitPage.cargo[index].object.stickerId = Number(stickerId);
        },
        setTransitPageCargoDescription(state, action){
            const {index, desc} = action.payload;
            state.transitPage.cargo[index].object.description = desc;
        },
        editTransit(state){
            state.transitPage.transit.states.edit = true;
        },
        cancelTransitEdit(state, action){
            const id = action.payload;
            const index = state.transits.findIndex(v => v.id === Number(id));

            const previous = state.transits[index];
            const current = state.transitPage.transit.object.current;
            
            if (JSON.stringify(previous) !== JSON.stringify(current)){
                state.transitPage.transit.object.current = previous;
                state.cargoToDelete = [];
            }
            state.transitPage.transit.states.edit = false;
        },
        startTransitCargoEdit(state, action){
            const index = action.payload;
            
            state.transitPage.cargo[index].states.edit = true;
        },
        cancelTransitCargoEdit(state, action){
            const index = action.payload;
            const {transit:{object: {current}}, cargo} = state.transitPage;
            
            if (JSON.stringify(current.assignedCargo) !== JSON.stringify(cargo.map(v=>v.object)))
                state.transitPage.cargo[index].object = current.assignedCargo[index]
            
            state.transitPage.cargo[index].states.edit = false;
        },
        applyTransitCargoEdit(state, action){
            const index = action.payload;
            const {transit:{object: {current}}, cargo} = state.transitPage;
            console.log(index);

            if (JSON.stringify(current.assignedCargo) !== JSON.stringify(cargo.map(v=>v.object)))
                state.transitPage.transit.object.current.assignedCargo[index] = state.transitPage.cargo[index].object
            state.transitPage.cargo[index].states.edit = false;
        },
        sendCargoToDelete(state, action){
            const index = action.payload;

            const id = state.transitPage.cargo[index].object.id;
            state.cargoToDelete.push(id);
            state.transitPage.cargo = state.transitPage.cargo.filter(v => v.object.id !== id);
        },
        addEmptyCargoToTransit(state){
            state.transitPage.cargo.unshift({object: {id: 0, stickerId: '', description: ''}, states: {edit: true}});
        },
    },
    extraReducers: (builder) => {
        builder.addCase(thunkTransits.fulfilled, (state, action) => {
            const {transits, id} = action.payload;
            state.transits = transits;
            // console.log(payload);
            if (id !== undefined)
                transitSlice.caseReducers.getTransitForPage(state, {payload: {id}});
        }).addCase(updateTransitThunk.fulfilled, (state, action) => {
            const transit = action.payload;
            
            console.log(transit);
            const index = state.transits.findIndex(v => v.id === transit.id);
            
            state.transits[index] = transit;
            state.transitPage = {transit: {object: {previous: transit, current: transit}, states: {edit: false}}, cargo: transit.assignedCargo.map(v => {
                    return {object: v, states: {edit: false}}
                })};
            state.cargoToDelete = [];
        }).addCase(deleteTransitThunk.fulfilled, (state, action) => {
            state.transits = state.transits.filter(v => {return v.id !== action.payload});
        }).addCase(addTransitThunk.fulfilled, (state, action) => {
            const transit = action.payload;
            
            state.transits.push(transit);
        })
    }
});

export const {getTransitForPage, setTransitPageClient, setTransitPageCommentary, setTransitPageType, setTransitPageStatus, setTransitPageAdditionalTasks, cancelTransitEdit, 
    setTransitPageCargoStickerId, setTransitPageCargoDescription, cancelTransitCargoEdit, applyTransitCargoEdit, sendCargoToDelete, addEmptyCargoToTransit,
    editTransit, startTransitCargoEdit} = transitSlice.actions;
export default transitSlice.reducer;