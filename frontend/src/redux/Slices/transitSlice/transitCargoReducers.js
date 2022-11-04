import {combineReducers, current} from "@reduxjs/toolkit";
import {cargoErrors, cargoLayout, cargoSorts, divideObject} from "./transitSliceProps";
import {isNegative} from "../../../Components/BlueTable/BlueTable";

export const transitCargoReducers = combineReducers({
    startTransitCargoEdit(state, action){
        const index = action.payload;

        state.transitPage.cargo[index].states.edit = true;
        state.transitPage.cargo[index].errors = cargoErrors;
    },
    cancelTransitCargoEdit(state, action){
        const index = action.payload;
        const {transit:{object}, cargo} = state.transitPage;

        console.log(current(cargo));

        if (cargo[index].object.id !== 0 && !cargo[index].states.added){
            if (JSON.stringify(object.current.assignedCargo) !== JSON.stringify(cargo.map(v=>v.object)))
                state.transitPage.cargo[index].object.current = state.transitPage.cargo[index].object.previous

            state.transitPage.cargo[index].states.edit = false;
        }else{
            state.transitPage.cargo = state.transitPage.cargo.filter((v, i) => i !== index)
        }
    },
    applyTransitCargoEdit(state, action){
        const index = action.payload;
        const {transit:{object: {current}}, cargo} = state.transitPage;

        if (cargo[index].object.stickerId === ''){
            state.transitPage.cargo[index].errors.nullSticker = true;
            return;
        }

        if (JSON.stringify(cargo.map(v=>v.object.previous)) !== JSON.stringify(cargo.map(v=>v.object.current)))
            state.transitPage.cargo[index].object.previous = cargo[index].object.current;

        state.transitPage.cargo[index].states.edit = false;
        state.transitPage.cargo[index].errors = cargoErrors;

        if (state.transitPage.cargo[index].states.added)
            state.transitPage.cargo[index].states.added = false
    },
    sendCargoToDelete(state, action){
        const index = action.payload;
        const type = state.transitPage.transit.object.current.type;

        const id = state.transitPage.cargo[index].object.current.id;
        state.cargoToDelete.push(id);

        if (type === 0){
            state.cargoToDelete.push(id);
        }else if(type !== 0 && state.cargoToAttach.some(x => x.id === id)){
            const sortType = state.sort.cargo;
            const cargo = state.transitPage.cargo[index].object.current;

            state.transitPage.cargoToAttach.push(cargo);
            state.transitPage.cargoToAttach.sort(cargoSorts[sortType]);
        }

        state.transitPage.cargo = state.transitPage.cargo.filter(v => v.object.current.id !== id);
    },
    addEmptyCargoToTransit(state){
        const cargo = {id: 0, stickerId: '', description: ''};
        state.transitPage.cargo.unshift({object: divideObject(cargo), states: {edit: true}, errors: cargoErrors});
    },
    attachCargoToTransit(state, action){
        const id = action.payload;
        const cargoToAttach = state.transitPage.cargoToAttach.find(x=>x.id === id);

        state.transitPage.cargo.unshift({object: divideObject(cargoToAttach), states: {edit: false}, errors: cargoErrors});
        state.transitPage.cargo.sort((a,b) => a.object.id - b.object.id); //todo remake when filter system will be done

        state.transitPage.cargoToAttach = state.transitPage.cargoToAttach.filter(v => v.id !== id); //todo make previous and current for cancellation or leave it like global list and put temporary values in state.transitPage
    },
    setTransitPageCargoSort(state, action){
        const type = action.payload;
        const s = cargoLayout[Math.abs(type)];
        state.transitPage.cargo.sort((a,b) => {
            const aObj = a.object[s];
            const bObj = b.object[s];

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
    }
})