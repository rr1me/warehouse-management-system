import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {getTransits} from "../../Services/transitService";

export const thunkTransits = createAsyncThunk(
    'getAD',
    async () => {
        let r;
        try{
            r = await getTransits();
        }catch(e){
            console.log(e);
        }
        console.log(r);
        return r.data.map(v => {
            return v;
        }).sort((a,b) => a.date - b.date);
    }
);

const transitSlice = createSlice({
    name: 'transits',
    initialState: {
        transits: {},
        sort: 0,
        transitPage: {}
    },
    reducers: {
        getTransitForPage(state, action){
            // const transit = {id: 'new', date: new Date()};
            // state.transitEntities.unshift({transit: {prev: transit, curr: transit, states: {editing: true}}});
            const id = action.payload;
            
            let transit;
            if (id === 'new')
                transit = {id: 'new', date: new Date()};
            else{
                console.log(current(state.transits));
                transit = state.transits.filter(v=>v.id === id);
            }
            
            state.transitPage = {prev: transit, curr: transit};
        },
        setTransitPageClient(state, action){
            state.transitPage.curr.client = action.payload;
        },
        cancelTransitEdit(state){
            const {prev, curr} = state.transitPage
            
            if (JSON.stringify(prev) !== JSON.stringify(curr))
                state.transitPage.curr = state.transitPage.prev;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkTransits.fulfilled, (state, action) => {
            state.transits = action.payload;
        })
    }
});

export const {getTransitForPage, setTransitPageClient, cancelTransitEdit} = transitSlice.actions;
export default transitSlice.reducer;