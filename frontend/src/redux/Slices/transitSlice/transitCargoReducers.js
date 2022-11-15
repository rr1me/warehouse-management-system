import {cargoErrors, cargoLayout, cargoSorts, cargoStates, divideObject} from "./transitSliceProps";
import {isNegative} from "../../../Components/BlueTable/BlueTable";
import {current} from "@reduxjs/toolkit";

const decomposeCargo = cargo => {
    const requiredCargo = cargo;
    const {previous: previousCargo, current: currentCargo} = requiredCargo.object;
    return {requiredCargo, previousCargo, currentCargo}
}
export const transitCargoReducers = {
    startCargoEdit(state, action){
        const index = action.payload;

        state.transitPage.cargo[index].states.edit = true;
        state.transitPage.cargo[index].errors = cargoErrors;
    },
    cancelCargoEdit(state, action){
        const index = action.payload;
        const {cargo} = state.transitPage;

        const {requiredCargo, previousCargo, currentCargo} = decomposeCargo(cargo[index]);
        
        if (!requiredCargo.states.added){
            if (JSON.stringify(previousCargo) !== JSON.stringify(currentCargo))
                state.transitPage.cargo[index].object.current = previousCargo

            state.transitPage.cargo[index].states.edit = false;
        }else{
            state.transitPage.cargo = state.transitPage.cargo.filter((v, i) => i !== index)
        }
    },
    applyCargoEdit(state, action){
        const index = action.payload;
        const {transit:{object: {current}}, cargo} = state.transitPage;

        const {requiredCargo, previousCargo, currentCargo} = decomposeCargo(cargo[index]);

        if (currentCargo.stickerId === ''){
            state.transitPage.cargo[index].errors.nullSticker = true;
            return;
        }

        if (JSON.stringify(previousCargo) !== JSON.stringify(currentCargo))
            state.transitPage.cargo[index].object.previous = currentCargo;

        state.transitPage.cargo[index].states = cargoStates()
        state.transitPage.cargo[index].errors = cargoErrors;

        if (requiredCargo.states.added)
            state.transitPage.cargo[index].states.added = false
    },
    sendCargoToDelete(state, action){
        const index = action.payload;
        const type = state.transitPage.transit.object.current.type;

        const id = state.transitPage.cargo[index].object.current.id;
        state.cargoToDelete.push(id);
        console.log(id, index, type);
        if (type === 0){
            state.cargoToDelete.push(id);
        }else{ //state.cargoToAttach.some(x => x.id === id)
            const sortType = state.sort.cargo;
            const cargo = state.transitPage.cargo[index].object.current;

            state.transitPage.cargoToAttach.push(cargo);
            state.transitPage.cargoToAttach.sort(cargoSorts[sortType]);
        }

        state.transitPage.cargo = state.transitPage.cargo.filter(v => v.object.current.id !== id);
    },
    addEmptyCargo(state){
        const cargo = {id: 0, stickerId: '', description: ''};
        state.transitPage.cargo.unshift({object: divideObject(cargo), states: cargoStates(true, true), errors: cargoErrors});
    },
    attachCargo(state, action){
        const id = action.payload;
        const cargoToAttach = state.transitPage.cargoToAttach.find(x=>x.id === id);

        state.transitPage.cargo.unshift({object: divideObject(cargoToAttach), states: cargoStates(false, false, true), errors: cargoErrors});
        state.transitPage.cargo.sort((a,b) => a.object.id - b.object.id); //todo remake when filter system will be done

        state.transitPage.cargoToAttach = state.transitPage.cargoToAttach.filter(v => v.id !== id); //todo make previous and current for cancellation or leave it like global list and put temporary values in state.transitPage
    },
    setCargoSort(state, action){
        const type = action.payload;
        const s = cargoLayout[Math.abs(type)];
        state.transitPage.cargo.sort((a,b) => {
            const aObj = a.object.current[s];
            const bObj = b.object.current[s];
            let func;
            if (s !== 'description') func = aObj - bObj;
            else{
                if (aObj.toLowerCase() < bObj.toLowerCase()) func = -1;
                else if (aObj.toLowerCase() > bObj.toLowerCase()) func = 1;
                else func = 0;
            }
            return isNegative(type) ? -func : func;
        });
        state.sort.cargo = type;
    },
    setCargoStickerId(state, action){
        const {index, stickerId} = action.payload;
        if (isNaN(+stickerId)){
            state.transitPage.cargo[index].errors.lettersInSticker = true;
            return;
        }
        state.transitPage.cargo[index].object.current.stickerId = (stickerId !== '' ? Number(stickerId) : '');
    },
    setCargoDescription(state, action){
        const {index, desc} = action.payload;
        state.transitPage.cargo[index].object.current.description = desc;
    }
};
