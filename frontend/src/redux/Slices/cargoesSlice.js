import {createSlice} from "@reduxjs/toolkit";

const cargoesSlice = createSlice({
    name: 'cargoesSlice',
    initialState: {
        cargoesEntities: {},
        editingGlobal: false,
        sort: 0
    },
    reducers: {
        setAllCargoes(state, action){
            state.cargoesEntities = action.payload;
        }
    }
});

export const {setAllCargoes} = cargoesSlice.actions;
export default cargoesSlice.reducer;