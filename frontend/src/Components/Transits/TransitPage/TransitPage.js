import './TransitPage.sass';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SelectPicker from "../../SelectPicker/SelectPicker";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from "../../DatePicker/DatePicker";
import {setArrivalDate} from "../../../redux/Slices/cargoSlice";
import {
    addTransitThunk,
    cancelTransitEdit,
    deleteTransitThunk,
    editTransit,
    getTransitForPage,
    setTransitPageAdditionalTasks,
    setTransitPageClient,
    setTransitPageCommentary, setTransitPageDate,
    thunkTransits,
    updateTransitThunk
} from "../../../redux/Slices/transitSlice";
import TransitCargo from "./TransitCargo/TransitCargo";
import {additionalTasks, ModalDeleteWarning, statusLabels, typeLabels} from "../TransitProps";
import Label from "../../Label/Label";
import WideLabel, {WideLabelItem} from "../../WideLabel/WideLabel";
import Error from "../../Error/Error";

const TransitPage = () => {

    const navigate = useNavigate()
    const location = useLocation();
    
    const [deleting, setDeleting] = useState(false);
    
    const {transits, transitPage, sort} = useSelector(state=>state.transitSlice);

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const id = /s\/(.*)/.exec(location.pathname)[1];
    useEffect(() => {
        if (transits.length === undefined){
            dispatch(thunkTransits({id: id, type: searchParams.get("type")}));
        }else{
            dispatch(getTransitForPage({id: id, type: searchParams.get("type")}));
        }

    }, [dispatch, location.pathname]);
    
    
    if (Object.keys(transitPage).length === 0) return;
    
    const {transit:{object: {previous, current}, states:{edit}, errors:{nullClient, editingCargo}}, cargo} = transitPage;
    
    const handleEditButton = () => {
        if (!edit){
            dispatch(editTransit());
            return;
        }
        
        if (current.id === 0) {
            dispatch(addTransitThunk()).then(r => navigate('../transits/'+r.payload.transit.id));
        }
        else 
            dispatch(updateTransitThunk());
        
    };
    const handleCancelButton = () => {
        if (current.id === 0){
            navigate('/transits');
            return;
        }
        
        dispatch(cancelTransitEdit(id));
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
        const r = await dispatch(deleteTransitThunk(current.id));
        if (r.meta.requestStatus === "fulfilled")
            navigate('/transits');
    };
    
    const handleCancelDeleting = () => {
        setDeleting(false);
    };

    return (
        <div className='transitPage'>
            <div className='header'>
                <div className='transitTitle'>
                    <div className='transitTitleGroup'>
                        <WideLabel>
                            <WideLabelItem name='id'>{current.id !== 0 ? current.id : 'new'}</WideLabelItem>
                            <WideLabelItem name='Type'><Label value={current.type} list={typeLabels}/></WideLabelItem>
                            <WideLabelItem name='Status'><Label value={current.status} list={statusLabels}/></WideLabelItem>
                        </WideLabel>
                    </div>
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
            <div className='transitMain'>
                <div className='clientAndDesc fullRow'>
                    <div className='element'>
                        <div className='name'>Client</div>
                        <textarea className={makeStyle('textarea', nullClient)} value={current.client} onChange={handleClientInput} readOnly={!edit}/>
                        <Error state={nullClient} errorMessage='Client cant be null'/>
                    </div>
                    <div className='element'>
                        <div className='name'>Commentary</div>
                        <textarea className={makeStyle('textarea')} value={current.commentary ? current.commentary : ''} onChange={handleCommentaryInput} readOnly={!edit}/>
                    </div>
                </div>
                <div className='element'>
                    <div className='name'>Additional tasks</div>
                    <SelectPicker defaultValue={current.additionalTasks} id='taskSelector'
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
                    <DatePicker incomeDate={current.date} editState={true} dispatchIndex={current.id} id='trDP' setDateDispatch={setTransitPageDate}/>
                </div>
                <TransitCargo cargo={cargo} edit={edit} cargoValid={editingCargo} transitType={current.type} cargoToAttach={transitPage.cargoToAttach} sort={sort.cargo}/>
            </div>
        </div>
    )
};

export default TransitPage;