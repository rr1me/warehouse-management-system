import {combineReducers} from "@reduxjs/toolkit";
import {cargoErrors, divideObject, transitErrors, transitLayout} from "./transitSliceProps";
import {isNegative} from "../../../Components/BlueTable/BlueTable";

export const transitMainReducers = {
    getTransitForPage(state, action){
        console.log(state);
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
    },
    setSort(state, action){ //todo what to fuck is that
        const type = action.payload;
        const s = transitLayout[Math.abs(type)];
        state.transits.sort((a,b) => {
            let func;
            if(s !== 'client' && s !== 'commentary'){
                if(s === 'date') func = new Date([a[s]]) - new Date(b[s]);
                else func = a[s] - b[s];
            }else{
                if(a[s].toLowerCase() < b[s].toLowerCase()) func = -1;
                else if(a[s].toLowerCase() > b[s].toLowerCase()) func = 1;
                else func = 0;
            }
            return isNegative(type) ? -func : func;
        })
        state.sort.transit = type;
    }
}

// export const {setSort} = transitMainReducers()