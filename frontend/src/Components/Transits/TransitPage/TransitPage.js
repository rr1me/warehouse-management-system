import './TransitPage.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOneTransit} from "../../../Services/transitService";
import SelectPicker from "../../SelectPicker/SelectPicker";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from "../../DatePicker/DatePicker";
import {setArrivalDate} from "../../../redux/Slices/cargoSlice";
import {
    addEmptyTransit, cancelTransitEdit,
    getTransitForPage,
    setTransitPageClient,
    thunkTransits
} from "../../../redux/Slices/transitSlice";

const TransitPage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    
    const [edit, setEdit] = useState(false);
    
    // const [transitPage, setTransit] = useState(Object);
    const {transits, transitPage} = useSelector(state=>state.transitSlice);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const id = /s\/(.*)/.exec(location.pathname)[1];
        // console.log("?");
        // if (id !== 'add') {
        //     console.log(transitEntities.length);
        //     const isBlank = transitEntities.length !== undefined;
        //    
        //     if (isBlank){
        //         console.log("!")
        //         const _transit = transitEntities[id].transitPage;
        //         setTransit({prev: _transit, curr: _transit});
        //     }else{
        //         console.log("?")
        //         getOneTransit(id).then(v=>{
        //             const _transit = v.data;
        //             setTransit({prev: _transit, curr: _transit});
        //         });
        //     }
        // }else{
        //     setTransit({id: 'new', date: new Date()})
        //     setEdit(true);
        // }
        // if (id !== 'add' && transits.length === undefined) {
        //     dispatch(thunkTransits());
        // }else{
        //     dispatch(addEmptyTransit());
        // }
        // dispatch(getTransitForPage(id));
        
        if (transits.length === undefined){
            console.log('dispatched')
            dispatch(thunkTransits());
        }
        
        dispatch(getTransitForPage(id));
        
    }, [dispatch, location.pathname, transits.length]);
    
    const handleEditButton = () => {
        setEdit(value => !value)
    };
    const handleCancelButton = () => {
        if (transitPage.id === 'new'){
            navigate('/transits');
            return;
        }
        // if (JSON.stringify(transitPage.curr) !== JSON.stringify(transitPage.prev))
        //     transitPage.curr = transitPage.prev;
        
        dispatch(cancelTransitEdit());
        
        setEdit(false);
    };
    
    const makeStyle = style => style+(edit ? ' editing' : ' readonly');
    
    const handleClientInput = e => {
        // setTransit({...transitPage, curr:{...transitPage.curr, client:e.target.value}});
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
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Client</div>
                        <input className={makeStyle('trInput')} value={transitPage.curr.client} onChange={handleClientInput} readOnly={!edit}/>
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