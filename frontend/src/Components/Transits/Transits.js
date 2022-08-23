import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Transits.css';
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
    }
    
    return (
        <div className='transitContainer'>
            <div className='elementHeader'>
                <div className='elementTitle'>Transits</div>
                <button className="btn apply-btn tableButton" onClick={handleAddNewClick}>Add new</button>
            </div>
            <BlueTable header={trHeader} gridTemplate='transitGridTemplate' clickable={true}>
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