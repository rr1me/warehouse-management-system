import './PageNotFound.css';
import {DatePicker} from "../DatePicker/DatePicker";
import {useSelector} from "react-redux";
import {setDate} from "../../redux/Slices/testDateSlice";

export const PageNotFound = () => {
    
    const {date} = useSelector(state => state.testDateSlice);
    
    return (
        // <h1>404</h1>
        <DatePicker id='pnfDP' incomeDate={date} setDateDispatch={setDate}/>
    )
}