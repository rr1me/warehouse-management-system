export const divideObject = obj => {return {previous: obj, current: obj}};
export const transitErrors = {nullClient: false, editingCargo: false};
export const cargoErrors = {nullSticker: false, lettersInSticker: false}

export const cargoSorts = [ //todo its used in cargoToAttach, need to get rid of that
    (a,b) => a.id - b.id,
    (a,b) => a.stickerId - b.stickerId
];

export const transitLayout = [
    'id',
    'type',
    'status',
    'client',
    'date',
    'additionalTasks',
    'commentary'
];

export const cargoLayout = [
    'id',
    'stickerId',
    'description'
];

export const cargoStates = (edit = false, added = false, attached = false) => {
    return {edit: edit, added: added, attached: attached}
}