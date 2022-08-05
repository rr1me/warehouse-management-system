import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCargo} from "../../Services/CargoService";

export const thunkCargo = createAsyncThunk(
    'getCargoes/cargoesSlice',
    async () => {
        const r = await getCargo();
        console.log(r);
        return r.data.map(v => {
            return {cargo: {prev: v, curr: v}, states: {}};
        });
    }
)

const cargoSlice = createSlice({
    name: 'cargoesSlice',
    initialState: {
        cargoEntities: {},
        editingGlobal: false,
        sort: 0
    },
    reducers: {
        setAllCargoes(state, action){
            state.cargoesEntities = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkCargo.fulfilled, (state, action) => {
            state.cargoEntities =  action.payload;
        })
    }
    
});

export const {setAllCargo} = cargoSlice.actions;
export default cargoSlice.reducer;