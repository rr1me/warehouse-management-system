import axios from "axios";

export const getTransits = () => axios.get('/api/transits').catch(catcher);

export const getOneTransit = id => axios.get('/api/transits/'+id).catch(catcher);

export const updateTransit = transit => axios.post('/api/transits/update', transit).catch(catcher);

export const addTransit = transit => axios.put('/api/transits/add', transit).catch(catcher);

export const getAssignedCargo = id => axios.get('/api/transits/getCargo/'+id).catch(catcher);

export const deleteTransit = id => axios.delete('/api/transits/delete/'+id).catch(catcher);

const catcher = v => {throw v};