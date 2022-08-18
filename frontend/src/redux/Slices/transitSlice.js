import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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
            return {transit: {prev: v, curr: v}, states: {editing: false}};
        }).sort((a,b) => a.transit.curr.date - b.transit.curr.date);
    }
);

const transitSlice = createSlice({
    name: 'transits',
    initialState: {
        transitEntities: {},
        sort: 0
    },
    reducers: {
        getAssignedCargo(state,action){
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkTransits.fulfilled, (state, action) => {
            state.transitEntities = action.payload;
        })
    }
});

export const {} = transitSlice.actions;
export default transitSlice.reducer;