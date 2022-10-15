import './Transits.sass';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TransitRow from "./TransitRow/TransitRow";
import {setTransitSort, thunkTransits} from "../../redux/Slices/transitSlice";
import {useNavigate} from "react-router-dom";
import BlueTable from "../BlueTable/BlueTable";
import RelativeModal from "../RelativeModal/RelativeModal";
import BulletList from "../Properties/BulletList/BulletList";

const Transits = () => {
    
    const dispatch = useDispatch();
    const {transits, sort} = useSelector(state => state.transitSlice);
    
    const [newModal, setNewModal] = useState(false);
    const [filterModal, setFilterModal] = useState(false);
    // const addNewBtnRef = useRef();
    
    useEffect(() => {
        if (transits.length === undefined)
            dispatch(thunkTransits({}));
    }, [dispatch, transits.length]);
    
    const navigate = useNavigate();
    
    const handleAddNewModalClick = e => {
        e.stopPropagation();
        setNewModal(value => !value);
    };
    
    const handleAddNewAcceptanceClick = () => navigate('/transits/add?type=0');
    const handleAddNewDispatchingClick = () => navigate('/transits/add?type=1');
    
    const handleFilterClick = e => {
        e.stopPropagation();
        setFilterModal(value => !value);
    }
    
    return (
        <div className='transitContainer'>
            <div className='transitHeader'>
                <div className='title light'>Transits</div>
                <div>
                    <div className='titleButtons'>
                        <button className="btn apply table" onClick={handleFilterClick}>Filter</button>
                        <button className="btn apply table" onClick={handleAddNewModalClick}>Add new</button>
                    </div>
                    <RelativeModal doubleWrap={false} id={'transitCargoFilterModal'} state={filterModal} setOpen={setFilterModal} modalStyle={{top: '5px', right: '55px'}}>
                        <BulletList bulletList={filterList} bulletState={sort.transit} bulletStateDispatch={setTransitSort}/>
                    </RelativeModal>
                    <RelativeModal doubleWrap={false} state={newModal} setOpen={setNewModal} id='addNewTransitModal' onClick={e=>e.stopPropagation()} modalStyle={{right: '120px', top: '5px'}}>
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
            <BlueTable header={trHeader} gridTemplate='transitGridTemplate' clickable={true} lightStyle={false} sort={sort.transit} setSortDispatch={setTransitSort}>
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

const filterList = ['By ID', 'By type', 'By status', 'By date'];

export default Transits;