import {combineReducers} from "@reduxjs/toolkit";
import {cargoErrors, divideObject, transitErrors, transitLayout} from "./transitSliceProps";
import {isNegative} from "../../../Components/BlueTable/BlueTable";

export const transitPageReducers = combineReducers({
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
    setTransitPageDate(state, action){
        const {date} = action.payload; //todo dont actually need index 
        state.transitPage.transit.object.current.date = date;
    },
    editTransit(state){
        state.transitPage.transit.states.edit = true;
    },
    cancelTransitEdit(state, action){
        const id = action.payload;
        const index = state.transits.findIndex(v => v.id === Number(id));

        const previous = state.transits[index];
        const current = state.transitPage.transit.object.current;

        const cargo = state.transitPage.cargo.map(v => {
            return v.object;
        });

        const isAnyCargoEditing = state.transitPage.cargo.some(v => {
            return v.states.edit;
        });

        state.transitPage.cargoToAttach = state.cargoToAttach;

        if (JSON.stringify(previous) !== JSON.stringify(current) || JSON.stringify(cargo) !== JSON.stringify(previous.assignedCargo)){
            state.transitPage.transit.object.current = previous;
            state.transitPage.cargo = previous.assignedCargo.map(v => {
                return {object: divideObject(v), states: {edit: false}, errors: cargoErrors}
            });
            state.cargoToDelete = [];
        }else if (isAnyCargoEditing){
            state.transitPage.cargo.map(v => v.states.edit = false);
        }
        state.transitPage.transit.states.edit = false;
        state.transitPage.transit.errors = transitErrors;
    },
    setTransitSort(state, action){ //todo what to fuck is that
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
})