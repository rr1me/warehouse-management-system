import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {addTransit, getTransits, updateTransit} from "../../Services/transitService";
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

export const updateTransitThunk = createAsyncThunk(
    'updateTransit',
    async (id, {getState}) => {
        const state = getState().transitSlice;
        const transit = state.transitPage.curr;
        const cargoToDelete = state.cargoToDelete;
        
        if (id === 'add'){
            const r = await addTransit(transit);
            return {transit: r.data, id: Number(id)};
        }else{
            const r = await updateTransit(transit)
            console.log(r);
            if (cargoToDelete.length > 0){
                const rc = await deleteCargo(cargoToDelete);
                console.log(rc);
            }
            console.log(Number(id));
            return {transit: r.data, id: Number(id)};
        }
    }
)

const transitSlice = createSlice({
    name: 'transits',
    initialState: {
        transits: {},
        sort: 0,
        transitPage: {},
        cargoToDelete: []
    },
    reducers: {
        getTransitForPage(state, action){ //todo check if there is same object in transitPage
            const id = action.payload;
            let transit;
            if (id === 'add')
                transit = {id: 'new', date: new Date().toJSON()};
            else{
                transit = state.transits.find(v=>v.id === Number(id));
            }
            
            state.transitPage = {prev: transit, curr: transit};
        },
        setTransitPageClient(state, action){
            state.transitPage.curr.client = action.payload;
        },
        setTransitPageCommentary(state, action){
            state.transitPage.curr.commentary = action.payload;
        },
        setTransitPageType(state, action){
            state.transitPage.curr.type = action.payload;
        },
        setTransitPageStatus(state, action){
            state.transitPage.curr.status = action.payload;
        },
        setTransitPageAdditionalTasks(state, action){
            state.transitPage.curr.additionalTasks = action.payload;
        },
        setTransitPageCargoStickerId(state, action){
            const {index, stickerId} = action.payload;
            state.transitPage.curr.assignedCargo[index].stickerId = stickerId;
        },
        setTransitPageCargoDescription(state, action){
            const {index, desc} = action.payload;
            state.transitPage.curr.assignedCargo[index].description = desc;
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
            // const index = state.transits.findIndex(v => v.id === Number(id));

            state.cargoToDelete.push(state.transitPage.curr.assignedCargo[index].id);
            state.transitPage.curr.assignedCargo = state.transitPage.curr.assignedCargo.filter((v, i) => {return i !== index});
        },
        addEmptyCargoToTransit(state){
            state.transitPage.curr.assignedCargo.push({id: 0, stickerId: '', description: ''});
            state.transitPage.curr.assignedCargo.sort((a,b) => a.id - b.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkTransits.fulfilled, (state, action) => {
            const {transits, transitPage} = action.payload;
            state.transits = transits;
            
            if (transitPage !== undefined)
                transitSlice.caseReducers.getTransitForPage(state, {payload: transitPage});
        }).addCase(updateTransitThunk.fulfilled, (state, action) => {
            const {transit, id} = action.payload;
            
            console.log(transit);
            const index = state.transits.findIndex(v => v.id === id);
            
            if (id === 'add'){
                state.transits.push(state.transitPage.curr)
            }else{
                state.transits[index] = state.transitPage.curr;
                state.transitPage.prev = state.transitPage.curr;
                state.cargoToDelete = [];
            }
        })
    }
});

export const {getTransitForPage, setTransitPageClient, setTransitPageCommentary, setTransitPageType, setTransitPageStatus, setTransitPageAdditionalTasks, cancelTransitEdit, 
    setTransitPageCargoStickerId, setTransitPageCargoDescription, cancelTransitCargoEdit, applyTransitPageCargoEdit, sendCargoToDelete, addEmptyCargoToTransit} = transitSlice.actions;
export default transitSlice.reducer;