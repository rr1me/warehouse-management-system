import {useSelector} from "react-redux";
import {useState} from "react";

const useTransitValid = (current) => {
    
    const {transitPage:{cargoStates}} = useSelector(state => state.transitSlice);
    
    const [clientValid, setClientValid] = useState(true);
    const [cargoValid, setCargoValid] = useState(true);
    
    const validate = () => {
        const clientBool = current.client !== '';
        const cargoBool = !cargoStates.some(x => x.edit === true);
        checkValid(clientBool, setClientValid);
        checkValid(cargoBool, setCargoValid);
        return clientBool && cargoBool;
    };
    
    const checkValid = (bool, setState) => {
        setState(bool);
    };
    
    const resetValid = () => {
        setClientValid(true);
    };
    
    return {clientValid, cargoValid, validate, resetValid};
};

export default useTransitValid;