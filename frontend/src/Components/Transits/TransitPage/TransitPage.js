import './TransitPage.sass';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {memo, useEffect, useState} from "react";
import SelectPicker from "../../SelectPicker/SelectPicker";
import {useDispatch, useSelector} from "react-redux";
import {DatePicker} from "../../DatePicker/DatePicker";
import TransitCargo from "./TransitCargo/TransitCargo";
import {additionalTasks, ModalDeleteWarning, statusLabels, typeLabels} from "../TransitProps";
import Label from "../../Label/Label";
import WideLabel, {WideLabelItem} from "../../WideLabel/WideLabel";
import Error from "../../Error/Error";
import {actions} from "../../../redux/Slices/transitSlice/transitSlice";
import {
    addTransitThunk,
    deleteTransitThunk,
    thunkTransits,
    updateTransitThunk
} from "../../../redux/Slices/transitSlice/transitThunks";

const {getTransitForPage, editTransit, cancelEdit, setClient, setCommentary, setAdditionalTasks, setDate} = actions;

const TransitPage = memo(() => {

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
        
        if (current.id === 0)
            dispatch(addTransitThunk()).then(r => navigate('../transits/'+r.payload.transit.id));
        else
            dispatch(updateTransitThunk());
        
    };
    const handleCancelButton = () => {
        if (current.id === 0){
            navigate('/transits');
            return;
        }
        
        dispatch(cancelEdit(id));
    };
    
    const makeStyle = (style, invalid) => (style ? style+' ' : '')+(edit ? (invalid ? 'invalid' : 'active') : 'readonly');
    
    const handleClientInput = e => dispatch(setClient(e.target.value));
    
    const handleCommentaryInput = e => dispatch(setCommentary(e.target.value));

    const selectPickerSetValueFunc = index => dispatch(setAdditionalTasks(index));
    
    const handleDeleteButton = e => {
        e.stopPropagation();
        setDeleting(true);
    };
    
    const handleConfirmedDeleteButton = async () => {
        const r = await dispatch(deleteTransitThunk(current.id));
        if (r.meta.requestStatus === "fulfilled")
            navigate('/transits');
    };
    
    const handleCancelDeleting = () => setDeleting(false);

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
                    {edit ? <button className='btn edit table' onClick={handleCancelButton}>Cancel</button> 
                        :
                        <div>
                            <button className='btn delete table' onClick={handleDeleteButton}>Delete</button>
                            <ModalDeleteWarning modalId='transitDeleteModal' confirmHandle={handleConfirmedDeleteButton} cancelHandler={handleCancelDeleting}
                                                modalState={deleting} modalSetState={setDeleting} modalStyle={{right: 0, top: 10, width: 'max-content'}}/>
                        </div>
                    }
                    <button className='btn apply table' onClick={handleEditButton}>{edit ? 'Apply' : 'Edit'}</button>
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
                                  activeStyle={'active'} openStyle={'active editing'} readOnly={!edit} 
                                  setValue={selectPickerSetValueFunc}>
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
                    <DatePicker incomeDate={current.date} editState={edit} dispatchIndex={current.id} id='trDP' setDateDispatch={setDate}/>
                </div>
                <TransitCargo cargo={cargo} edit={edit} cargoValid={editingCargo} transitType={current.type} cargoToAttach={transitPage.cargoToAttach} sort={sort.cargo}/>
            </div>
        </div>
    )
});

export default TransitPage;