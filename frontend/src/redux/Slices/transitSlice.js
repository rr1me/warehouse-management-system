﻿import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {addTransit, deleteTransit, getTransits, updateTransit} from "../../Services/transitService";
import {deleteCargo} from "../../Services/CargoService";

export const thunkTransits = createAsyncThunk(
    'getTransits',
    async (index : number) => {
        let r;
        try{
            r = await getTransits();
        }catch(e){
            console.log(e);
        }
        console.log(r);
        return {transits: r.data.map(v => {
                console.log(v);
                return v;
            }).sort((a,b) => a.date - b.date), transitPage: index};
    }
);

export const addTransitThunk = createAsyncThunk(
    'addTransit',
    async (_, {getState}) => {
        const {transitPage} = getState().transitSlice;
        const transitToAdd = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};
        
        const r = addTransit(transitToAdd);
        console.log(r);
        
        return transitToAdd;
    }
);

export const updateTransitThunk = createAsyncThunk(
    'editOrUpdateOrAddTransit',
    async (_, {getState}) => {
        const {transitPage} = getState().transitSlice;
        const transitToUpdate = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};
        
        const r = updateTransit(transitToUpdate);
        console.log(r);
        
        return transitToUpdate;
        
        // const state = getState().transitSlice;
        
    //     const transit = state.transitPage.curr;
    //     const cargoToDelete = state.cargoToDelete;
    //    
    //     if (id === 'add'){
    //         console.log("yes");
    //         const r = await addTransit(transit);
    //         console.log(r);
    //         return {transit: r.data, id: r.data, isNew: true};
    //     }else{
    //         const r = await updateTransit(transit)
    //         console.log(r);
    //         if (cargoToDelete.length > 0){
    //             const rc = await deleteCargo(cargoToDelete);
    //             console.log(rc);
    //         }
    //         console.log(Number(id));
    //         return {transit: r.data, id: Number(id), isNew: false};
    //     }
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
            const id = action.payload;
            let transit;
            if (id === 'add')
                transit = {id: 0, date: new Date().toJSON(), type: 0, status: 0, additionalTasks: 0, assignedCargo: [], client: '', commentary: ''};
            else{
                transit = state.transits.find(v=>v.id === Number(id));
            }
            
            state.transitPage = {transit: {object: {previous: transit, current: transit}, states: {edit: id === 'add'}}, cargo: transit.assignedCargo.map(v => {
                return {object: v, states: {edit: false}}
                })}
            
            // state.transitPage = {prev: transit, curr: transit, cargoStates: transit.assignedCargo.map((v,i) => {
            //     return {id: v.id, edit: false};
            //     })};
            // console.log(state.transitPage);
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
            state.transitPage.cargo[index].object.stickerId = stickerId;
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

            const prev = state.transits[index];
            const {curr} = state.transitPage;
            
            if (JSON.stringify(prev) !== JSON.stringify(curr)){
                state.transitPage.curr = prev;
                state.cargoToDelete = [];
            }
        },
        cancelTransitCargoEdit(state, action){
            console.log(current(state.cargoToDelete));
            const index = action.payload;
            const {prev, curr} = state.transitPage;

            if (JSON.stringify(prev.assignedCargo) !== JSON.stringify(curr.assignedCargo))
                state.transitPage.curr.assignedCargo[index] = state.transitPage.prev.assignedCargo[index];
        },
        applyTransitPageCargoEdit(state, action){
            const index = action.payload;
            const {prev, curr} = state.transitPage;

            if (JSON.stringify(prev.assignedCargo) !== JSON.stringify(curr.assignedCargo))
                state.transitPage.prev.assignedCargo[index] = state.transitPage.curr.assignedCargo[index];
        },
        sendCargoToDelete(state, action){
            const index = action.payload;

            state.cargoToDelete.push(state.transitPage.curr.assignedCargo[index].id);
            state.transitPage.curr.assignedCargo = state.transitPage.curr.assignedCargo.filter((v, i) => {return i !== index});
        },
        addEmptyCargoToTransit(state){
            const sort = (a,b) => a.id - b.id;
            
            state.transitPage.curr.assignedCargo.push({id: 0, stickerId: '', description: ''});
            state.transitPage.cargoStates.push({id: 0, edit: true});
            state.transitPage.cargoStates.sort(sort);
            state.transitPage.curr.assignedCargo.sort(sort);
        },
        setTransitPageCargoEdit(state, action){
            const {index, bool} = action.payload;
            console.log(bool);
            
            state.transitPage.cargoStates[index].edit = bool;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkTransits.fulfilled, (state, action) => {
            const {transits, transitPage} = action.payload;
            state.transits = transits;
            
            if (transitPage !== undefined)
                transitSlice.caseReducers.getTransitForPage(state, {payload: transitPage});
        }).addCase(updateTransitThunk.fulfilled, (state, action) => {
            const transit = action.payload;
            
            console.log(transit);
            // if (isNew){
            //     state.transits.push(state.transitPage.curr)
            //     console.log('0');
            // }else{
            //     const index = state.transits.findIndex(v => v.id === id);
            //     state.transits[index] = state.transitPage.curr;
            //     state.transitPage.prev = state.transitPage.curr;
            //     state.cargoToDelete = [];
            // }
        }).addCase(deleteTransitThunk.fulfilled, (state, action) => {
            state.transits = state.transits.filter((v, i) => {return v.id !== action.payload});
        })
    }
});

export const {getTransitForPage, setTransitPageClient, setTransitPageCommentary, setTransitPageType, setTransitPageStatus, setTransitPageAdditionalTasks, cancelTransitEdit, 
    setTransitPageCargoStickerId, setTransitPageCargoDescription, cancelTransitCargoEdit, applyTransitPageCargoEdit, sendCargoToDelete, addEmptyCargoToTransit, setTransitPageCargoEdit,
    editTransit} = transitSlice.actions;
export default transitSlice.reducer;