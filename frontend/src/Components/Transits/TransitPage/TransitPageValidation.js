import {useDispatch} from "react-redux";
import {setTransitPageClient} from "../../../redux/Slices/transitSlice";
import {useState} from "react";

const useTransitValid = (current) => {
    
    // const [validated, setValidated] = useState(true);
    
    const [clientValid, setClientValid] = useState(true);
    // const [commValid, setCommValid] = useState(true);
    // const [typeValid, setTypeValid] = useState(true);
    // const [statusValid, setStatusValid] = useState(true);
    // const [tasksValid, setTasksValid] = useState(true);
    const [cargoValid, setCargoValid] = useState(true);
    
    const validate = () => {
        const clientBool = current.client !== '';
        checkValid(clientBool, setClientValid)
        // checkValid(current.client !== '', setTypeValid)
        // checkValid(current.client !== '', setStatusValid)
        // checkValid(current.client !== '', setTasksValid)
        // checkValid(current.client !== '', setCargoValid)
        return clientBool
    };
    
    const checkValid = (bool, setState) => {
        setState(bool);
        // setValidated(bool);
    };
    
    const resetValid = () => {
        setClientValid(true);
    };
    
    return {clientValid, cargoValid, validate, resetValid};
};

export default useTransitValid;