import axios from "axios";

export const getTransits = () => axios.get('/api/transits').catch(catcher);

export const getOneTransit = id => axios.get('/api/transits/'+id).catch(catcher);

export const updateTransits = transit => axios.post('/api/transits/update').catch(catcher);

export const addTransits = transit => axios.post('/api/transits/add').catch(catcher);

const catcher = v => {throw v};