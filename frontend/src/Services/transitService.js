import axios from "axios";

export const getTransits = () => axios.get('/api/transits').catch(catcher);

export const getOneTransit = id => axios.get('/api/transits/'+id).catch(catcher);

export const updateTransit = transitDTO => axios.post('/api/transits/update', transitDTO).catch(catcher);

export const addTransit = transit => axios.put('/api/transits/add', transit).catch(catcher);

export const getAssignedCargo = id => axios.get('/api/transits/getCargo/'+id).catch(catcher);

export const deleteTransit = transit => axios.post('/api/transits/delete/', transit).catch(catcher);

const catcher = v => {throw v};