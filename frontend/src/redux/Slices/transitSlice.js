import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {addTransit, deleteTransit, getTransits, updateTransit} from "../../Services/transitService";

export const thunkTransits = createAsyncThunk(
    'getTransits',
    async (payload) => {
        const {id, type} = payload;
        let r;
        try{
            r = await getTransits();
        }catch(e){
            console.log(e);
        }
        console.log(r);
        const {transits, cargoToAttach} = r.data;
        
        return {transits: transits.map(v => {
                return v;
            }).sort((a,b) => a.date - b.date), id: id, cargoToAttach: cargoToAttach, type: type};
    }
);

export const addTransitThunk = createAsyncThunk( //todo decide what to do with cargoToAttach
    'addTransit',
    async (_, {getState, rejectWithValue}) => {
        const {transitPage} = getState().transitSlice;

        const errors = validateTransit(transitPage);
        if (errors.length !== 0) return rejectWithValue(errors);
        
        let transitToAdd = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};
        const r = await addTransit(transitToAdd);
        console.log(r);
        
        return r.data;
    }
);

export const updateTransitThunk = createAsyncThunk( //todo added cargo didnt receiving theirs new ids
    'updateTransit',
    async (_, {getState, rejectWithValue}) => {
        const {transitPage, cargoToDelete, sort} = getState().transitSlice;
        
        const errors = validateTransit(transitPage);
        if (errors.length !== 0) return rejectWithValue(errors);
        
        const transitToUpdate = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};

        const previous = {...transitPage.transit.object.previous, assignedCargo: Array.from(transitPage.transit.object.previous.assignedCargo).sort(cargoSorts[sort.cargo])};
        if (JSON.stringify(previous) === JSON.stringify(transitToUpdate)) return rejectWithValue('same objects');
        
        const transitDTO = {transit: transitToUpdate, cargoToDelete: cargoToDelete};
        const r = await updateTransit(transitDTO);
        console.log(r);
        
        const {transit, cargoToAttach} = r.data;
        transit.assignedCargo.sort(cargoSorts[sort.cargo]);
        return {transit: transit, cargoToAttach: cargoToAttach};
    }
);

const validateTransit = transitPage => {
    const transit = transitPage.transit.object.current;
    const cargo = transitPage.cargo
    const isAnyCargoEditing = cargo.some(v => {
        return v.states.edit;
    });
    
    const errors = [];
    
    if (transit.client === '') errors.push('nullClient');
    if (isAnyCargoEditing) errors.push('editingCargo');
    return errors;
};

export const deleteTransitThunk = createAsyncThunk(
    'deleteTransit',
    async (id: number, {getState}) => {
        const {transitPage} = getState().transitSlice;

        const transitToDelete = {...transitPage.transit.object.current, assignedCargo: transitPage.cargo.map(v=>v.object)};
        
        const r = await deleteTransit(transitToDelete);
        console.log(r);
        return {id: id, cargoToAttach: r.data};
    }
);

const transitSlice = createSlice({
    name: 'transits',
    initialState: {
        transits: {},
        sort: {transit: 0, cargo: 0},
        transitPage: {},
        cargoToDelete: [],
        cargoToAttach: []
    },
    reducers: {
        getTransitForPage(state, action){
            const {id, type} = action.payload;
            let transit;
            if (id === 'add')
                transit = {id: 0, date: new Date().toJSON(), type: Number(type), status: 0, additionalTasks: 0, assignedCargo: [], client: '', commentary: ''};
            else{
                transit = state.transits.find(v=>v.id === Number(id));
            }
            
            state.transitPage = {transit: {object: {previous: transit, current: transit}, states: {edit: id === 'add'}, errors: {nullClient: false, editingCargo: false}}, cargo: transit.assignedCargo.map(v => {
                return {object: v, states: {edit: false}, errors: {nullSticker: false, lettersInSticker: false}}
                }), cargoToAttach: state.cargoToAttach}
        },
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
            const {date, index} = action.payload; //todo dont actually need index 
            state.transitPage.transit.object.current.date = date;
        },
        setTransitPageCargoStickerId(state, action){
            const {index, stickerId} = action.payload;
            if (isNaN(+stickerId)){
                state.transitPage.cargo[index].errors.lettersInSticker = true;
                return;
            }
            state.transitPage.cargo[index].object.stickerId = (stickerId !== '' ? Number(stickerId) : '');
        },
        setTransitPageCargoDescription(state, action){
            const {index, desc} = action.payload;
            state.transitPage.cargo[index].object.description = desc;
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
                    return {object: v, states: {edit: false}, errors: {nullSticker: false, lettersInSticker: false}}
                });
                state.cargoToDelete = [];
            }else if (isAnyCargoEditing){
                state.transitPage.cargo.map(v => v.states.edit = false);
            }
            state.transitPage.transit.states.edit = false;
            state.transitPage.transit.errors = {nullClient: false, editingCargo: false};
        },
        startTransitCargoEdit(state, action){
            const index = action.payload;
            
            state.transitPage.cargo[index].states.edit = true;
            state.transitPage.cargo[index].errors = {nullSticker: false, lettersInSticker: false};
        },
        cancelTransitCargoEdit(state, action){
            const index = action.payload;
            const {transit:{object}, cargo} = state.transitPage;
            
            if (cargo[index].object.id !== 0){
                if (JSON.stringify(object.current.assignedCargo) !== JSON.stringify(cargo.map(v=>v.object)))
                    state.transitPage.cargo[index].object = current.assignedCargo[index]

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

            if (JSON.stringify(current.assignedCargo) !== JSON.stringify(cargo.map(v=>v.object)))
                state.transitPage.transit.object.current.assignedCargo[index] = cargo[index].object
            state.transitPage.cargo[index].states.edit = false;
            state.transitPage.cargo[index].errors = {nullSticker: false, lettersInSticker: false};
        },
        sendCargoToDelete(state, action){
            const index = action.payload;
            const type = state.transitPage.transit.object.current.type;
            
            const id = state.transitPage.cargo[index].object.id;
            state.cargoToDelete.push(id);
            
            if (type === 0){
                state.cargoToDelete.push(id);
            }else if(type !== 0 && state.cargoToAttach.some(x => x.id === id)){
                const sortType = state.sort.cargo;
                const cargo = state.transitPage.cargo[index].object;
                
                state.transitPage.cargoToAttach.push(cargo);
                state.transitPage.cargoToAttach.sort(cargoSorts[sortType]);
            }
            
            state.transitPage.cargo = state.transitPage.cargo.filter(v => v.object.id !== id);
        },
        addEmptyCargoToTransit(state){
            state.transitPage.cargo.unshift({object: {id: 0, stickerId: '', description: ''}, states: {edit: true}, errors: {nullSticker: false, lettersInSticker: false}});
        },
        attachCargoToTransit(state, action){
            const id = action.payload;

            const cargoToAttach = state.transitPage.cargoToAttach.find(x=>x.id === id);
            console.log(current(cargoToAttach));
            state.transitPage.cargo.unshift({object: cargoToAttach, states: {edit: false}, errors: {nullSticker: false, lettersInSticker: false}});
            
            state.transitPage.cargo.sort((a,b) => a.object.id - b.object.id); //todo remake when filter system will be done
            
            state.transitPage.cargoToAttach = state.transitPage.cargoToAttach.filter(v => v.id !== id); //todo make previous and current for cancellation or leave it like global list and put temporary values in state.transitPage
        },
        setTransitPageCargoSort(state, action){
            const sortType = action.payload;
            
            state.sort.cargo = sortType;
            state.transitPage.cargo.sort(cargoObjectSorts[sortType]);
        },
        setTransitSort(state, action){
            const type = action.payload;
            
            state.transits.sort(transitSorts[type])
            state.sort.transit = type;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(thunkTransits.fulfilled, (state, action) => {
            const {transits, id, cargoToAttach, type} = action.payload;
            state.transits = transits;
            state.cargoToAttach = cargoToAttach;
            if (id !== undefined)
                transitSlice.caseReducers.getTransitForPage(state, {payload: {id: id, type: type}});
        }).addCase(updateTransitThunk.fulfilled, (state, action) => {
            const {transit, cargoToAttach} = action.payload;
            
            console.log(transit);
            const index = state.transits.findIndex(v => v.id === transit.id);
            
            state.transits[index] = transit;
            state.transitPage = {transit: {object: {previous: transit, current: transit}, states: {edit: false}, errors: {nullClient: false, editingCargo: false}}, cargo: transit.assignedCargo.map(v => {
                    return {object: v, states: {edit: false}, errors: {nullSticker: false, lettersInSticker: false}}
                }), cargoToAttach: cargoToAttach};
            
            state.cargoToDelete = [];
            state.cargoToAttach = cargoToAttach;
        }).addCase(deleteTransitThunk.fulfilled, (state, action) => {
            const {id, cargoToAttach} = action.payload;
            
            state.transits = state.transits.filter(v => v.id !== id);
            state.cargoToAttach = cargoToAttach;
        }).addCase(addTransitThunk.fulfilled, (state, action) => {
            const {transit, cargoToAttach} = action.payload;
            console.log([current(state.transits), transit]);
            state.transits.push(transit);
            state.cargoToAttach = cargoToAttach;
        }).addCase(addTransitThunk.rejected, (state, action) => {
            const errors = action.payload;

            errors.map(v => {
                state.transitPage.transit.errors[v] = true;
            })
        }).addCase(updateTransitThunk.rejected, (state, action) => {
            const errors = action.payload;
            
            if (errors === 'same objects') {
                state.transitPage.transit.states.edit = false;
                return;
            }
            
            errors.map(v => {
                state.transitPage.transit.errors[v] = true;
            })
        })
    }
});

export const {getTransitForPage, setTransitPageClient, setTransitPageCommentary, setTransitPageType, setTransitPageStatus, setTransitPageAdditionalTasks, cancelTransitEdit, 
    setTransitPageCargoStickerId, setTransitPageCargoDescription, cancelTransitCargoEdit, applyTransitCargoEdit, sendCargoToDelete, addEmptyCargoToTransit,
    editTransit, startTransitCargoEdit, attachCargoToTransit, setTransitPageDate, setTransitPageCargoSort, setTransitSort} = transitSlice.actions;
export default transitSlice.reducer;

const transitSorts = [
    (a,b) => a.id - b.id,
    (a,b) => a.type - b.type,
    (a,b) => {
        console.log(a.status);
        return a.status - b.status
    },
    (a,b) => new Date(a.date) - new Date(b.date)
]

const cargoSorts = [
    (a,b) => a.id - b.id,
    (a,b) => a.stickerId - b.stickerId
]

const cargoObjectSorts = [
    (a,b) => a.object.id - b.object.id,
    (a,b) => a.object.stickerId - b.object.stickerId
]