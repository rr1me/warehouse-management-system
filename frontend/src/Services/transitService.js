import axios from "axios";

export const getTransits = () => axios.get('/api/transits').catch(catcher);

export const getOneTransit = id => axios.get('/api/transits/'+id).catch(catcher);

export const updateTransits = transit => axios.post('/api/transits/update').catch(catcher); //todo undone (data in post)
 
export const addTransits = transit => axios.post('/api/transits/add').catch(catcher); //todo undone (data in post)

export const getAssignedCargo = id => axios.get('/api/transits/getCargo/'+id).catch(catcher);

const catcher = v => {throw v};