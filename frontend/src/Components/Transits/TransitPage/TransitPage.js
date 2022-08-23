﻿import './TransitPage.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import SelectPicker from "../../SelectPicker/SelectPicker";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from "../../DatePicker/DatePicker";
import {setArrivalDate} from "../../../redux/Slices/cargoSlice";
import {
    cancelTransitEdit,
    getTransitForPage,
    setTransitPageClient,
    thunkTransits,
    updateTransitThunk
} from "../../../redux/Slices/transitSlice";
import BlueTable from "../../BlueTable/BlueTable";
import {cargoHeader} from "../../Cargo/Cargo";

const TransitPage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    
    const [edit, setEdit] = useState(false);
    
    const {transits, transitPage} = useSelector(state=>state.transitSlice);
    const dispatch = useDispatch();

    const id = /s\/(.*)/.exec(location.pathname)[1];
    useEffect(() => {
        if (transits.length === undefined && id !== 'add'){
            console.log('dispatched')
            dispatch(thunkTransits(id));
        }else{
            console.log('gtfp')
            dispatch(getTransitForPage(id));
            if (id === 'add')
                setEdit(true);
        }
        
    }, [dispatch, location.pathname]);
    
    const handleEditButton = () => {
        setEdit(value => {
            if (value)
                dispatch(updateTransitThunk(id));
            
            return !value;
        })
    };
    const handleCancelButton = () => {
        if (transitPage.id === 'new'){
            navigate('/transits');
            return;
        }
        
        dispatch(cancelTransitEdit());
        
        setEdit(false);
    };
    
    const makeStyle = style => style+(edit ? ' editing' : ' readonly');
    
    const handleClientInput = e => {
        dispatch(setTransitPageClient(e.target.value));
    };
    
    if (transitPage.curr !== undefined){
        return (
            <div className='transitPage'>
                <div className='trInfoHeader'>
                    <div className='trInfoElem elementTitle'>
                        Transit: {transitPage.curr.id}
                    </div>
                    <div className='trHeaderButtons'>
                        {edit ? <button className='btn delete-btn tableButton' onClick={handleCancelButton}>Cancel</button> : null}
                        <button className='btn apply-btn tableButton' onClick={handleEditButton}>{edit ? 'Apply' : 'Edit'}</button>
                    </div>
                </div>
                <div className='trInfoMain'>
                    <div className='trClAndDesc trFullRow'>
                        <div className='trInfoElem elementTitle'>
                            <div className='trElemName'>Client</div>
                            <textarea className={makeStyle('trInput')} value={transitPage.curr.client} onChange={handleClientInput} readOnly={!edit}/>
                        </div>
                        <div className='trInfoElem elementTitle'>
                            <div className='trElemName'>Description</div>
                            <textarea  className={makeStyle('trInput')} value={transitPage.curr.description} onChange={handleClientInput} readOnly={!edit}/>
                        </div>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Type</div>
                        <SelectPicker defaultValue={types[transitPage.curr.type]} id={'typeSelector'} 
                                      customStyle={makeStyle('trSelectPicker')} activeStyle={makeStyle('trSelectPickerActive')} readOnly={!edit}>
                            {types.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Status</div>
                        <SelectPicker defaultValue={statuses[transitPage.curr.status]} id='statusSelector' 
                                      customStyle={makeStyle('trSelectPicker')} activeStyle={makeStyle('trSelectPickerActive')} readOnly={!edit}>
                            {statuses.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Additional tasks</div>
                        <SelectPicker defaultValue={additionalTasks[transitPage.curr.additionalTasks]} id={'taskSelector'} 
                                      customStyle={makeStyle('trSelectPicker')} activeStyle={makeStyle('trSelectPickerActive')} readOnly={!edit}>
                            {additionalTasks.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Date</div>
                        <DatePicker incomeDate={transitPage.curr.date} editState={true} dispatchIndex={transitPage.curr.id} id='trDP' setDateDispatch={setArrivalDate}/>
                    </div>
                    <div className='trFullRow'>
                        <div className='trInfoElem elementTitle'>
                            <div className='trElemName'>Cargo</div>
                            <div className='trCargoElem'>
                                {/*<BlueTable clickable={false} header={cargoHeader} gridTemplate='cargoGridTemplate'>*/}
                                {/*    {transitPage.curr.assignedCargo.map((value, index) => {*/}
                                {/*        return {element: <div>*/}
                                {/*                <div>{value.stickerId}</div>*/}
                                {/*                <div>{value.description}</div>*/}
                                {/*                <div>{value.cargoStatus}</div>*/}
                                {/*                <div>{value.cargoQuality}</div>*/}
                                {/*                <div>{value.assignedInnerWorks}</div>*/}
                                {/*            </div>, id: value.id};*/}
                                {/*    })}*/}
                                {/*</BlueTable>*/}
                                <div className='trCargoControls'>
                                    <button className='trCargoBtn'>fuck you</button>
                                    <button className='trCargoBtn'>Add new</button>
                                </div>
                                <div className='lightTable'>
                                    <div className='lt_header'>
                                        <div className='lt_headerItem'>yo</div>
                                        <div className='lt_headerItem'>yo</div>
                                    </div>
                                    <div className='lt_rows'>
                                        <div>asdasd</div>
                                        <div>asdasd</div>
                                    </div>
                                    <div className='lt_rows'>
                                        <div>asdasd</div>
                                        <div>asdasd</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const types = [
    'Acceptance',
    'Dispatching'
];

const statuses = [
    'Planned',
    'Completed',
    'Failed'
];

const additionalTasks = [
    'None',
    'QualityControl',
    'Repack',
    'Both'
]

export default TransitPage;