import './TransitPage.sass';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import SelectPicker from "../../SelectPicker/SelectPicker";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from "../../DatePicker/DatePicker";
import {setArrivalDate} from "../../../redux/Slices/cargoSlice";
import {
    cancelTransitEdit, deleteTransitThunk,
    getTransitForPage, setTransitPageAdditionalTasks,
    setTransitPageClient,
    setTransitPageCommentary, setTransitPageStatus, setTransitPageType,
    thunkTransits,
    updateTransitThunk
} from "../../../redux/Slices/transitSlice";
import TransitCargo from "./TransitCargo/TransitCargo";
import {additionalTasks, ModalDeleteWarning, statusLabels, typeLabels} from "../TransitProps";
import Label from "../../Label/Label";
import useTransitValid from "./TransitPageValidation";
import Valid from "../../Valid/Valid";
import RelativeModal from "../../RelativeModal/RelativeModal";

const TransitPage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    
    const [edit, setEdit] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
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

    const {clientValid, cargoValid, validate, resetValid} = useTransitValid(transitPage.curr);
    
    const handleEditButton = () => {
        console.log("edit")
        if (validate())
            setEdit(value => {
                if (value && (JSON.stringify(transitPage.prev) !== JSON.stringify(transitPage.curr)))
                    dispatch(updateTransitThunk(id));

                return !value;
            });
    };
    const handleCancelButton = () => {
        if (transitPage.id === 'new'){
            navigate('/transits');
            return;
        }
        
        dispatch(cancelTransitEdit(id));
        
        setEdit(false);
        resetValid();
    };
    
    const makeStyle = (style, invalid) => (style ? style+' ' : '')+(edit ? (invalid ? 'invalid' : 'editing') : 'readonly');
    
    const handleClientInput = e => {
        dispatch(setTransitPageClient(e.target.value));
    };
    
    const handleCommentaryInput = e => {
        dispatch(setTransitPageCommentary(e.target.value));
    };
    
    const handleDeleteButton = e => {
        e.stopPropagation();
        setDeleting(true);
    };
    
    const handleConfirmedDeleteButton = async () => {
        const r = await dispatch(deleteTransitThunk(transitPage.curr.id));
        if (r.meta.requestStatus === "fulfilled")
            navigate('/transits');
    };
    
    const handleCancelDeleting = () => {
        setDeleting(false);
    };
    
    if (transitPage.curr !== undefined){
        
        return (
            <div className='transitPage'>
                <div className='header'>
                    <div className=''>
                        Transit: {transitPage.curr.id !== 0 ? transitPage.curr.id : 'new'}
                    </div>
                    <div className='ctrlButtons'>
                        <button className='btn delete table' onClick={handleDeleteButton}>Delete</button>
                        {edit ? <button className='btn edit table' onClick={handleCancelButton}>Cancel</button> : null}
                        <button className='btn apply table' onClick={handleEditButton}>{edit ? 'Apply' : 'Edit'}</button>
                        {deleting ?
                            <ModalDeleteWarning modalId='transitDeleteModal' confirmHandle={handleConfirmedDeleteButton} cancelHandler={handleCancelDeleting} modalState={deleting} modalSetState={setDeleting}/>
                            : null}
                    </div>
                </div>
                <div className='main'>
                    <div className='clientAndDesc fullRow'>
                        <div className='element'>
                            <div className='name'>Client</div>
                            <Valid valid={clientValid} errorMessage='Client cant be null'>
                                <textarea className={makeStyle('textarea', !clientValid)} value={transitPage.curr.client} onChange={handleClientInput} readOnly={!edit}/>
                            </Valid>
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
                            {typeLabels.map((value, index)=>{
                                return (
                                    <Label value={index} list={typeLabels} key={index}/>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='element'>
                        <div className='name'>Status</div>
                        <SelectPicker defaultValue={transitPage.curr.status} id='statusSelector' 
                                      customStyle={'readonly'} readOnly={true} 
                                      reducer={setTransitPageStatus}>
                            {statusLabels.map((value, index)=>{
                                return (
                                    <Label value={index} list={statusLabels} key={index}/>
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
                    <TransitCargo current={transitPage.curr} edit={edit} cargoValid={cargoValid}/>
                </div>
            </div>
        )
    }
};

export default TransitPage;