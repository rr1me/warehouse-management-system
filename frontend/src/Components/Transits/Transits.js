import './Transits.sass';
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TransitRow from "./TransitRow/TransitRow";
import {thunkTransits} from "../../redux/Slices/transitSlice";
import {useNavigate} from "react-router-dom";
import BlueTable from "../BlueTable/BlueTable";
import RelativeModal from "../RelativeModal/RelativeModal";

const Transits = () => {
    
    const dispatch = useDispatch();
    const {transits, sort} = useSelector(state => state.transitSlice);
    
    const [newModal, setNewModal] = useState(false);
    const addNewBtnRef = useRef();
    
    useEffect(() => {
        if (transits.length === undefined)
            dispatch(thunkTransits());
    }, [dispatch, transits.length]);
    
    const navigate = useNavigate();
    
    const handleAddNewModalClick = e => {
        e.stopPropagation();
        // console.log(addNewBtnRef.current.getBoundingClientRect().right);
        setNewModal(value => !value);
        // navigate('/transits/add');
        // console.log(transits);
    };
    
    const handleAddNew = type => {
        navigate("/transits/add?type="+type);
    };
    
    const handleAddNewAcceptanceClick = () => navigate('/transits/add?type=0');
    const handleAddNewDispatchingClick = () => navigate('/transits/add?type=1');
    
    return (
        <div className='transitContainer'>
            <div className='transitHeader'>
                <div className='title light'>Transits</div>
                <div>
                    <button className="btn apply table" onClick={handleAddNewModalClick} ref={addNewBtnRef}>Add new</button>
                    <RelativeModal doubleWrap={false} state={newModal} setOpen={setNewModal} id='addNewTransitModal' onClick={e=>e.stopPropagation()} modalStyle={{right: '186px', top: '5px'}}>
                        <div className='addTransitModal'>
                            <div>What transit do you want to add?</div>
                            <div className='controls'>
                                <button className='btn green table' onClick={handleAddNewAcceptanceClick}>Acceptance</button>
                                <button className='btn apply table' onClick={handleAddNewDispatchingClick}>Dispatching</button>
                            </div>
                        </div>
                    </RelativeModal>
                </div>
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