import './Transits.sass';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import TransitRow from "./TransitRow/TransitRow";
import {thunkTransits} from "../../redux/Slices/transitSlice";
import {useNavigate} from "react-router-dom";
import BlueTable from "../BlueTable/BlueTable";

const Transits = () => {
    
    const dispatch = useDispatch();
    const {transits, sort} = useSelector(state => state.transitSlice);
    
    useEffect(() => {
        if (transits.length === undefined)
            dispatch(thunkTransits());
    }, [dispatch, transits.length]);
    
    const navigate = useNavigate();
    
    const handleAddNewClick = () => {
        navigate('/transits/add');
        console.log(transits);
    }
    
    return (
        <div className='transitContainer'>
            <div className='transitHeader'>
                <div className='title light'>Transits</div>
                <button className="btn apply table" onClick={handleAddNewClick}>Add new</button>
            </div>
            <BlueTable header={trHeader} gridTemplate='transitGridTemplate' clickable={true} lightStyle={false}>
                {transits.length !== undefined ? transits.map((value, index) => {
                    return {element: <TransitRow key={index} current={value}/>, id: value.id}
                }) : null}
            </BlueTable>
        </div>
    )
};

const trHeader = [
    'Id',
    'Type',
    'Status',
    'Client',
    'Date',
    'Additional Tasks',
    'Commentary'
]

export default Transits;