import {cargoErrors, cargoStates, divideObject, transitErrors} from "./transitSliceProps";

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
        const {date} = action.payload;
        state.transitPage.transit.object.current.date = date;
    },
    editTransit(state){
        state.transitPage.transit.states.edit = true;
    },
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
                return {object: divideObject(v), states: cargoStates(), errors: cargoErrors}
            });
            state.cargoToDelete = [];
        }else if (isAnyCargoEditing){
            state.transitPage.cargo.map(v => v.states.edit = false);
        }
        state.transitPage.transit.states.edit = false;
        state.transitPage.transit.errors = transitErrors;
    },
}