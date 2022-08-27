import './TransitPage.sass';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import SelectPicker from "../../SelectPicker/SelectPicker";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from "../../DatePicker/DatePicker";
import {setArrivalDate} from "../../../redux/Slices/cargoSlice";
import {
    cancelTransitEdit,
    getTransitForPage, setTransitPageAdditionalTasks,
    setTransitPageClient,
    setTransitPageCommentary, setTransitPageStatus, setTransitPageType,
    thunkTransits,
    updateTransitThunk
} from "../../../redux/Slices/transitSlice";
import TransitCargo from "./TransitCargo/TransitCargo";

const TransitPage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    
    const [edit, setEdit] = useState(false);
    
    const {transits, transitPage} = useSelector(state=>state.transitSlice);
    const dispatch = useDispatch();

    const id = /s\/(.*)/.exec(location.pathname)[1];
    useEffect(() => {
        if (transits.length === undefined && id !== 'add'){
            dispatch(thunkTransits(id));
        }else{
            dispatch(getTransitForPage(id));
            if (id === 'add')
                setEdit(true);
        }
        
    }, [dispatch, location.pathname]);
    
    const handleEditButton = () => {
        setEdit(value => {
            if (value && (JSON.stringify(transitPage.prev) !== JSON.stringify(transitPage.curr)))
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
    
    const makeStyle = style => (style ? style+' ' : '')+(edit ? 'editing' : 'readonly');
    
    const handleClientInput = e => {
        dispatch(setTransitPageClient(e.target.value));
    };
    
    const handleCommentaryInput = e => {
        dispatch(setTransitPageCommentary(e.target.value));
    };
    
    if (transitPage.curr !== undefined){
        return (
            <div className='transitPage'>
                <div className='header'>
                    <div className=''>
                        Transit: {transitPage.curr.id}
                    </div>
                    <div className='ctrlButtons'>
                        {edit ? <button className='btn delete table' onClick={handleCancelButton}>Cancel</button> : null}
                        <button className='btn apply table' onClick={handleEditButton}>{edit ? 'Apply' : 'Edit'}</button>
                    </div>
                </div>
                <div className='main'>
                    <div className='clientAndDesc fullRow'>
                        <div className='element'>
                            <div className='name'>Client</div>
                            <textarea className={makeStyle('textarea')} value={transitPage.curr.client} onChange={handleClientInput} readOnly={!edit}/>
                        </div>
                        <div className='element'>
                            <div className='name'>Commentary</div>
                            <textarea className={makeStyle('textarea')} value={transitPage.curr.commentary ? transitPage.curr.commentary : ''} onChange={handleCommentaryInput} readOnly={!edit}/>
                        </div>
                    </div>
                    <div className='element'>
                        <div className='name'>Type</div>
                        <SelectPicker defaultValue={transitPage.curr.type} id='typeSelector'
                                      customStyle={makeStyle('')} activeStyle={makeStyle('active')} readOnly={!edit} 
                                      reducer={setTransitPageType}>
                            {types.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='element'>
                        <div className='name'>Status</div>
                        <SelectPicker defaultValue={transitPage.curr.status} id='statusSelector' 
                                      customStyle={makeStyle('')} activeStyle={makeStyle('active')} readOnly={!edit} 
                                      reducer={setTransitPageStatus}>
                            {statuses.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker> 
                    </div>
                    <div className='element'>
                        <div className='name'>Additional tasks</div>
                        <SelectPicker defaultValue={transitPage.curr.additionalTasks} id='taskSelector'
                                      customStyle={makeStyle('')} activeStyle={makeStyle('active')} readOnly={!edit} 
                                      reducer={setTransitPageAdditionalTasks}>
                            {additionalTasks.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='element'>
                        <div className='name'>Date</div>
                        <DatePicker incomeDate={transitPage.curr.date} editState={true} dispatchIndex={transitPage.curr.id} id='trDP' setDateDispatch={setArrivalDate}/>
                    </div>
                    <TransitCargo current={transitPage.curr} edit={edit}/>
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