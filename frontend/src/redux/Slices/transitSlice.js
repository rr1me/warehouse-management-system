import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {addTransit, deleteTransit, getTransits, updateTransit} from "../../Services/transitService";

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
        
        const r = await addTransit(transitToAdd);
        console.log(r);
        
        return transitToAdd;
    }
);

export const updateTransitThunk = createAsyncThunk(
    'updateTransit',
    async (_, {getState}) => {
        console.log("?");
        const {transitPage} = getState().transitSlice;
        console.log("?AKSDJALKSd");
        const transitToUpdate = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};
        console.log("?AKSDJALKSd");
        const r = await updateTransit(transitToUpdate);
        console.log("?AKSDJALKSd");
        console.log(r);
        console.log("?AKSDJALKSd");
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
            const {transit:{object:{current}}, cargo} = state.transitPage;

            // if (JSON.stringify(prev.assignedCargo) !== JSON.stringify(curr.assignedCargo))
            //     state.transitPage.curr.assignedCargo[index] = state.transitPage.prev.assignedCargo[index];
            
            if (JSON.stringify(current.assignedCargo) !== JSON.stringify(cargo.map(v=>v.object))){
                
            }
        },
        applyTransitPageCargoEdit(state, action){
            const index = action.payload;
            const {prev, curr} = state.transitPage;

            // if (JSON.stringify(prev.assignedCargo) !== JSON.stringify(curr.assignedCargo))
            //     state.transitPage.prev.assignedCargo[index] = state.transitPage.curr.assignedCargo[index];
        },
        sendCargoToDelete(state, action){
            const index = action.payload;

            state.cargoToDelete.push(state.transitPage.cargo[index].object.id);
            state.transitPage.cargo = state.transitPage.cargo.filter((v, i) => {return i.object.id !== index});
        },
        addEmptyCargoToTransit(state){
            state.transitPage.cargo.unshift({object: {id: 0, stickerId: '', description: ''}, states: {edit: true}});
        },
        setTransitPageCargoEdit(state, action){
            const {index, bool} = action.payload;
            console.log(bool);
            
            state.transitPage.cargo[index].states.edit = bool;
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
            const index = state.transits.findIndex(v => v.id === transit.id);
            
            state.transits[index] = transit;
            state.transitPage = {transit: {object: {previous: transit, current: transit}, states: {edit: false}}, cargo: transit.assignedCargo.map(v => {
                    return {object: v, states: {edit: false}}
                })};
        }).addCase(deleteTransitThunk.fulfilled, (state, action) => {
            state.transits = state.transits.filter((v, i) => {return v.id !== action.payload});
        })
    }
});

export const {getTransitForPage, setTransitPageClient, setTransitPageCommentary, setTransitPageType, setTransitPageStatus, setTransitPageAdditionalTasks, cancelTransitEdit, 
    setTransitPageCargoStickerId, setTransitPageCargoDescription, cancelTransitCargoEdit, applyTransitPageCargoEdit, sendCargoToDelete, addEmptyCargoToTransit, setTransitPageCargoEdit,
    editTransit} = transitSlice.actions;
export default transitSlice.reducer;