import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTransit, getTransits, updateTransit} from "../../Services/transitService";

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
        const transit = getState().transitSlice.transitPage.curr;
        if (id === 'add'){
            const r = await addTransit(transit);
            return {transit: r.data, id: Number(id)};
        }else{
            const r = await updateTransit(transit)
            console.log(r);
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
        transitPage: {}
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
        cancelTransitEdit(state){
            const {prev, curr} = state.transitPage
            
            if (JSON.stringify(prev) !== JSON.stringify(curr))
                state.transitPage.curr = state.transitPage.prev;
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
            }
        })
    }
});

export const {getTransitForPage, setTransitPageClient, setTransitPageCommentary, setTransitPageType, setTransitPageStatus, setTransitPageAdditionalTasks, cancelTransitEdit} = transitSlice.actions;
export default transitSlice.reducer;