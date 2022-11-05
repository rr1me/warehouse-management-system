import {combineReducers} from "@reduxjs/toolkit";
import {cargoErrors, divideObject, transitErrors} from "./transitSliceProps";

export const editTransit = (state) => {
    console.log(state);
    state.transitPage.transit.states.edit = true;
}

export const transitPageReducers = {
    setClient(state, action){
        state.transitPage.transit.object.current.client = action.payload;
    },
    setCommentary(state, action){
        state.transitPage.transit.object.current.commentary = action.payload;
    },
    setType(state, action){
        state.transitPage.transit.object.current.type = action.payload;
    },
    setStatus(state, action){
        state.transitPage.transit.object.current.status = action.payload;
    },
    setAdditionalTasks(state, action){
        state.transitPage.transit.object.current.additionalTasks = action.payload;
    },
    setDate(state, action){
        const {date} = action.payload; //todo dont actually need index 
        state.transitPage.transit.object.current.date = date;
    },
    editTransit,
    cancelEdit(state, action){
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
}

// export const {setClient, setCommentary, setType, setStatus, setAdditionalTasks, setDate, cancelEdit} = transitPageReducers