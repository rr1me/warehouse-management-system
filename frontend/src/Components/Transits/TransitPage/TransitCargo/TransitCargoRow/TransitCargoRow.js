import './TransitCargoRow.sass';
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {useState} from "react";
import Editable from "../../../../Properties/Editable";
import HookedTextarea from "../../../../Properties/HookedTextarea";
import {useDispatch, useSelector} from "react-redux";
import {
    applyTransitPageCargoEdit,
    cancelTransitCargoEdit,
    sendCargoToDelete,
    setTransitPageCargoDescription, setTransitPageCargoEdit,
    setTransitPageCargoStickerId
} from "../../../../../redux/Slices/transitSlice";
import {TiCancel} from "react-icons/ti";
import {ModalDeleteWarning} from "../../../TransitProps";
import Valid from "../../../../Valid/Valid";

const TransitCargoRow = ({current, index, globalEdit}) => {
    
    const dispatch = useDispatch();  //todo fixbug .unshift makes transitCargoRow update last element neither the new one
    const [deleting, setDeleting] = useState(false);
    const {transitPage} = useSelector(state => state.transitSlice);
    const edit = transitPage.cargoStates[index].edit;
    
    const [stickerValid, setStickerValid] = useState(current.stickerId !== '');
    
    const handleEditButton = () => {
        if (globalEdit){
            if (edit) {
                console.log(transitPage.curr);
                if (current.stickerId !== '') {
                    dispatch(setTransitPageCargoEdit({index: index, bool: !edit})); //todo remake it to one dispatch
                    dispatch(applyTransitPageCargoEdit(index));
                    setStickerValid(true);
                }
                else
                    setStickerValid(false);
            }else
                dispatch(setTransitPageCargoEdit({index: index, bool: !edit}));
        }
    };
    
    const handleDeleteButton = e => {
        if (!globalEdit)
            return;
        
        if (edit){
            dispatch(cancelTransitCargoEdit(index));
            dispatch(setTransitPageCargoEdit({index: index, bool: false}));
        }else{
            e.stopPropagation();
            setDeleting(value => !value);
        }
    };
    
    const stickerIdInputHandle = e => {
        dispatch(setTransitPageCargoStickerId({index: index, stickerId: e.target.value}));
    };
    
    const descriptionInputHandle = e => {
        dispatch(setTransitPageCargoDescription({index: index, desc: e.target.value}));
    };
    
    const handleCancelDeleting = e => {
        e.stopPropagation();
        setDeleting(false);
    };
    
    const handleConfirmedDeleteButton = () => {
        dispatch(sendCargoToDelete(index));
    };
    
    return (
        <>
            <div className='transitCargoRow'>{current.id}</div>
            <div className='transitCargoRow'>
                <Valid valid={stickerValid} errorMessage='Client cant be null'>
                    <Editable state={edit}>
                        <HookedTextarea value={current.stickerId} onChange={stickerIdInputHandle} className='trCargoTextarea editing'/>
                    </Editable>
                </Valid>
            </div>
            <div className='transitCargoRow'>
                <Editable state={edit}>
                    <HookedTextarea value={(!edit && !current.description) ? 'No description' : current.description} onChange={descriptionInputHandle} className='trCargoTextarea editing'/>
                </Editable>
            </div>
            <div className='transitCargoRow actions'>
                <button className={'btn edit'+ (globalEdit ? '' : ' readonly')} onClick={handleEditButton}>
                    {edit ? <AiOutlineCheck className='icon'/> : <AiFillEdit className='icon'/>}
                </button>
                <button className={'btn delete'+ (globalEdit ? '' : ' readonly')} onClick={handleDeleteButton}>
                    {edit ? <TiCancel className='cancelIcon'/> : <AiFillDelete className='icon'/>}
                </button>
                <ModalDeleteWarning modalId='trCargoDeleteModal' confirmHandle={handleConfirmedDeleteButton} cancelHandler={handleCancelDeleting} modalState={deleting} modalSetState={setDeleting}/>
            </div>
        </>
    )
};

export default TransitCargoRow;