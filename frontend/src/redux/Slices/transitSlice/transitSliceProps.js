export const divideObject = obj => {return {previous: obj, current: obj}};
export const transitErrors = {nullClient: false, editingCargo: false};
export const cargoErrors = {nullSticker: false, lettersInSticker: false}

export const cargoSorts = [
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