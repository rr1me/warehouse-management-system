import {combineReducers, current} from "@reduxjs/toolkit";
import {cargoErrors, cargoLayout, cargoSorts, divideObject} from "./transitSliceProps";
import {isNegative} from "../../../Components/BlueTable/BlueTable";

export const transitCargoReducers = {
    startEdit(state, action){
        const index = action.payload;

        state.transitPage.cargo[index].states.edit = true;
        state.transitPage.cargo[index].errors = cargoErrors;
    },
    cancelEdit(state, action){
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
    applyEdit(state, action){
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
    addEmptyCargo(state){
        const cargo = {id: 0, stickerId: '', description: ''};
        state.transitPage.cargo.unshift({object: divideObject(cargo), states: {edit: true}, errors: cargoErrors});
    },
    attachCargo(state, action){
        const id = action.payload;
        const cargoToAttach = state.transitPage.cargoToAttach.find(x=>x.id === id);

        state.transitPage.cargo.unshift({object: divideObject(cargoToAttach), states: {edit: false}, errors: cargoErrors});
        state.transitPage.cargo.sort((a,b) => a.object.id - b.object.id); //todo remake when filter system will be done

        state.transitPage.cargoToAttach = state.transitPage.cargoToAttach.filter(v => v.id !== id); //todo make previous and current for cancellation or leave it like global list and put temporary values in state.transitPage
    },
    setSort(state, action){
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
    },
    setStickerId(state, action){
        const {index, stickerId} = action.payload;
        if (isNaN(+stickerId)){
            state.transitPage.cargo[index].errors.lettersInSticker = true;
            return;
        }
        state.transitPage.cargo[index].object.current.stickerId = (stickerId !== '' ? Number(stickerId) : '');
    },
    setoDescription(state, action){
        const {index, desc} = action.payload;
        state.transitPage.cargo[index].object.current.description = desc;
    }
};

// export const {startEdit, cancelEdit, applyEdit, sendCargoToDelete, addEmptyCargo, attachCargo, setSort, setStickerId, setDescription} = transitCargoReducers

// getTransitForPage(state, action){
//     const {id, type} = action.payload;
//     let transit;
//     if (id === 'add')
//         transit = {id: 0, date: new Date().toJSON(), type: Number(type), status: 0, additionalTasks: 0, assignedCargo: [], client: '', commentary: ''};
//     else{
//         transit = state.transits.find(v=>v.id === Number(id));
//     }
//    
//     state.transitPage = {transit: {object: divideObject(transit), states: {edit: id === 'add'}, errors: transitErrors}, cargo: transit.assignedCargo.map(v => {
//         return {object: divideObject(v), states: {edit: false}, errors: cargoErrors}
//         }), cargoToAttach: state.cargoToAttach}
// },
// setTransitPageClient(state, action){
//     state.transitPage.transit.object.current.client = action.payload;
// },
// setTransitPageCommentary(state, action){
//     state.transitPage.transit.object.current.commentary = action.payload;
// },
// setTransitPageType(state, action){
//     state.transitPage.transit.object.current.type = action.payload;
// },
// setTransitPageStatus(state, action){
//     state.transitPage.transit.object.current.status = action.payload;
// },
// setTransitPageAdditionalTasks(state, action){
//     state.transitPage.transit.object.current.additionalTasks = action.payload;
// },
// setTransitPageDate(state, action){
//     const {date, index} = action.payload; //todo dont actually need index 
//     state.transitPage.transit.object.current.date = date;
// },
// setTransitPageCargoStickerId(state, action){
//     const {index, stickerId} = action.payload;
//     if (isNaN(+stickerId)){
//         state.transitPage.cargo[index].errors.lettersInSticker = true;
//         return;
//     }
//     state.transitPage.cargo[index].object.current.stickerId = (stickerId !== '' ? Number(stickerId) : '');
// },
// setTransitPageCargoDescription(state, action){
//     const {index, desc} = action.payload;
//     state.transitPage.cargo[index].object.current.description = desc;
// },
// editTransit(state){
//     state.transitPage.transit.states.edit = true;
// },
// cancelTransitEdit(state, action){
//     const id = action.payload;
//     const index = state.transits.findIndex(v => v.id === Number(id));
//
//     const previous = state.transits[index];
//     const current = state.transitPage.transit.object.current;
//
//     const cargo = state.transitPage.cargo.map(v => {
//         return v.object;
//     });
//
//     const isAnyCargoEditing = state.transitPage.cargo.some(v => {
//         return v.states.edit;
//     });
//
//     state.transitPage.cargoToAttach = state.cargoToAttach;
//    
//     if (JSON.stringify(previous) !== JSON.stringify(current) || JSON.stringify(cargo) !== JSON.stringify(previous.assignedCargo)){
//         state.transitPage.transit.object.current = previous;
//         state.transitPage.cargo = previous.assignedCargo.map(v => {
//             return {object: divideObject(v), states: {edit: false}, errors: cargoErrors}
//         });
//         state.cargoToDelete = [];
//     }else if (isAnyCargoEditing){
//         state.transitPage.cargo.map(v => v.states.edit = false);
//     }
//     state.transitPage.transit.states.edit = false;
//     state.transitPage.transit.errors = transitErrors;
// },
// startTransitCargoEdit(state, action){
//     const index = action.payload;
//    
//     state.transitPage.cargo[index].states.edit = true;
//     state.transitPage.cargo[index].errors = cargoErrors;
// },
// cancelTransitCargoEdit(state, action){
//     const index = action.payload;
//     const {transit:{object}, cargo} = state.transitPage;
//    
//     console.log(current(cargo));
//    
//     if (cargo[index].object.id !== 0 && !cargo[index].states.added){
//         if (JSON.stringify(object.current.assignedCargo) !== JSON.stringify(cargo.map(v=>v.object)))
//             state.transitPage.cargo[index].object.current = state.transitPage.cargo[index].object.previous
//
//         state.transitPage.cargo[index].states.edit = false;
//     }else{
//         state.transitPage.cargo = state.transitPage.cargo.filter((v, i) => i !== index)
//     }
// },
// applyTransitCargoEdit(state, action){
//     const index = action.payload;
//     const {transit:{object: {current}}, cargo} = state.transitPage;
//    
//     if (cargo[index].object.stickerId === ''){
//         state.transitPage.cargo[index].errors.nullSticker = true;
//         return;
//     }
//
//     if (JSON.stringify(cargo.map(v=>v.object.previous)) !== JSON.stringify(cargo.map(v=>v.object.current)))
//         state.transitPage.cargo[index].object.previous = cargo[index].object.current;
//    
//     state.transitPage.cargo[index].states.edit = false;
//     state.transitPage.cargo[index].errors = cargoErrors;
//    
//     if (state.transitPage.cargo[index].states.added)
//         state.transitPage.cargo[index].states.added = false
// },
// sendCargoToDelete(state, action){
//     const index = action.payload;
//     const type = state.transitPage.transit.object.current.type;
//    
//     const id = state.transitPage.cargo[index].object.current.id;
//     state.cargoToDelete.push(id);
//    
//     if (type === 0){
//         state.cargoToDelete.push(id);
//     }else if(type !== 0 && state.cargoToAttach.some(x => x.id === id)){
//         const sortType = state.sort.cargo;
//         const cargo = state.transitPage.cargo[index].object.current;
//        
//         state.transitPage.cargoToAttach.push(cargo);
//         state.transitPage.cargoToAttach.sort(cargoSorts[sortType]);
//     }
//    
//     state.transitPage.cargo = state.transitPage.cargo.filter(v => v.object.current.id !== id);
// },
// addEmptyCargoToTransit(state){
//     const cargo = {id: 0, stickerId: '', description: ''};
//     state.transitPage.cargo.unshift({object: divideObject(cargo), states: {edit: true}, errors: cargoErrors});
// },
// attachCargoToTransit(state, action){
//     const id = action.payload;
//     const cargoToAttach = state.transitPage.cargoToAttach.find(x=>x.id === id);
//    
//     state.transitPage.cargo.unshift({object: divideObject(cargoToAttach), states: {edit: false}, errors: cargoErrors});
//     state.transitPage.cargo.sort((a,b) => a.object.id - b.object.id); //todo remake when filter system will be done
//    
//     state.transitPage.cargoToAttach = state.transitPage.cargoToAttach.filter(v => v.id !== id); //todo make previous and current for cancellation or leave it like global list and put temporary values in state.transitPage
// },
// setTransitPageCargoSort(state, action){
//     const type = action.payload;
//     const s = cargoLayout[Math.abs(type)];
//     state.transitPage.cargo.sort((a,b) => {
//         const aObj = a.object[s];
//         const bObj = b.object[s];
//        
//         let func;
//         if (s !== 'description') func = aObj - bObj;
//         else{
//             if (aObj.toLowerCase() < bObj.toLowerCase()) func = -1;
//             else if (aObj.toLowerCase() > bObj.toLowerCase()) func = 1;
//             else func = 0;
//         }
//         return isNegative(type) ? -func : func;
//     });
//     state.sort.cargo = type;
// },
// setTransitSort(state, action){ //todo what to fuck is that
//     const type = action.payload;
//     const s = transitLayout[Math.abs(type)];
//     state.transits.sort((a,b) => {
//         let func;
//         if(s !== 'client' && s !== 'commentary'){
//             if(s === 'date') func = new Date([a[s]]) - new Date(b[s]);
//             else func = a[s] - b[s];
//         }else{
//             if(a[s].toLowerCase() < b[s].toLowerCase()) func = -1;
//             else if(a[s].toLowerCase() > b[s].toLowerCase()) func = 1;
//             else func = 0;
//         }
//         return isNegative(type) ? -func : func;
//     })
//     state.sort.transit = type;
// }
