import {combineReducers} from "@reduxjs/toolkit";
import {cargoErrors, divideObject, transitErrors} from "./transitSliceProps";

export const transitMainReducers = combineReducers({
    getTransitForPage(state, action){
        const {id, type} = action.payload;
        let transit;
        if (id === 'add')
            transit = {id: 0, date: new Date().toJSON(), type: Number(type), status: 0, additionalTasks: 0, assignedCargo: [], client: '', commentary: ''};
        else{
            transit = state.transits.find(v=>v.id === Number(id));
        }

        state.transitPage = {transit: {object: divideObject(transit), states: {edit: id === 'add'}, errors: transitErrors}, cargo: transit.assignedCargo.map(v => {
                return {object: divideObject(v), states: {edit: false}, errors: cargoErrors}
            }), cargoToAttach: state.cargoToAttach}
    }
})