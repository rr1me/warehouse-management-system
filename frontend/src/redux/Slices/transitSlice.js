import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTransit, getTransits, updateTransit, updateTransits} from "../../Services/transitService";

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
                return v;
            }).sort((a,b) => a.date - b.date), transitPage: index};
    }
);

export const updateTransitThunk = createAsyncThunk(
    'updateTransit',
    async (index, {getState}) => {
        const transit = getState().transitSlice.transitPage.curr;
        if (index === 'add'){
            const r = await addTransit(transit);
            return {transit: r.data, index: index};
        }else{
            const r = await updateTransit(transit)
            console.log(r);
            console.log(transit);
            return {transit: r.data, index: Number(index)};
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
            console.log(id);
            let transit;
            if (id === 'add')
                transit = {id: 'new', date: new Date().toJSON()};
            else{
                console.log(state.transits+' '+Number(id));
                transit = state.transits.find(v=>v.id === Number(id));
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
            const {transits, transitPage} = action.payload;
            state.transits = transits;
            
            if (transitPage !== undefined)
                transitSlice.caseReducers.getTransitForPage(state, {payload: transitPage});
        }).addCase(updateTransitThunk.fulfilled, (state, action) => {
            const {transit, index} = action.payload;
            
            if (index === 'add'){
                state.transits.push(transit)
            }else{
                state.transits[index] = transit;
            }
        })
    }
});

export const {getTransitForPage, setTransitPageClient, cancelTransitEdit} = transitSlice.actions;
export default transitSlice.reducer;