import './TransitPage.css';
import './TransitPage.sass';
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
        console.log(transitPage);
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
                <div className='header'>
                    <div className='element elementTitle'>
                        Transit: {transitPage.curr.id}
                    </div>
                    <div className='ctrlButtons'>
                        {edit ? <button className='btn delete table' onClick={handleCancelButton}>Cancel</button> : null}
                        <button className='btn apply table' onClick={handleEditButton}>{edit ? 'Apply' : 'Edit'}</button>
                    </div>
                </div>
                <div className='main'>
                    <div className='clientAndDesc fullRow'>
                        <div className='element elementTitle'>
                            <div className='name'>Client</div>
                            <textarea className={makeStyle('textarea')} value={transitPage.curr.client} onChange={handleClientInput} readOnly={!edit}/>
                        </div>
                        <div className='element elementTitle'>
                            <div className='name'>Description</div>
                            <textarea  className={makeStyle('textarea')} value={transitPage.curr.description} onChange={handleClientInput} readOnly={!edit}/>
                        </div>
                    </div>
                    <div className='element elementTitle'>
                        <div className='name'>Type</div>
                        <SelectPicker defaultValue={types[transitPage.curr.type]} id={'typeSelector'} 
                                      customStyle={makeStyle('selectPicker')} activeStyle={makeStyle('active')} readOnly={!edit}>
                            {types.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='element elementTitle'>
                        <div className='name'>Status</div>
                        <SelectPicker defaultValue={statuses[transitPage.curr.status]} id='statusSelector' 
                                      customStyle={makeStyle('selectPicker')} activeStyle={makeStyle('active')} readOnly={!edit}>
                            {statuses.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='element elementTitle'>
                        <div className='name'>Additional tasks</div>
                        <SelectPicker defaultValue={additionalTasks[transitPage.curr.additionalTasks]} id={'taskSelector'} 
                                      customStyle={makeStyle('selectPicker')} activeStyle={makeStyle('active')} readOnly={!edit}>
                            {additionalTasks.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='element elementTitle'>
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