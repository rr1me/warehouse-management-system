import './TransitCargoRow.sass';
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {useState} from "react";
import Editable from "../../../../Properties/Editable";
import HookedTextarea from "../../../../Properties/HookedTextarea";
import {useDispatch} from "react-redux";
import {TiCancel} from "react-icons/ti";
import {ModalDeleteWarning} from "../../../TransitProps";
import Error from "../../../../Error/Error";
import {actions} from "../../../../../redux/Slices/transitSlice/transitSlice";

const {applyCargoEdit, startCargoEdit, cancelCargoEdit, setCargoStickerId, setCargoDescription, sendCargoToDelete} = actions;

const TransitCargoRow = ({cargo:{current}, states:{edit}, errors:{lettersInSticker, nullSticker}, index, globalEdit}) => {
    
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);
    
    const handleEditButton = () => {
        if (globalEdit)
            dispatch(edit ? applyCargoEdit(index) : startCargoEdit(index));
    };
    
    const handleDeleteButton = e => {
        if (!globalEdit)
            return;
        
        if (edit){
            dispatch(cancelCargoEdit(index)); //todo remake this
        }else{
            e.stopPropagation();
            setDeleting(value => !value);
        }
    };
    
    const stickerIdInputHandle = e => {
        dispatch(setCargoStickerId({index: index, stickerId: e.target.value}));
    };
    
    const descriptionInputHandle = e => {
        dispatch(setCargoDescription({index: index, desc: e.target.value}));
    };
    
    const handleCancelDeleting = e => {
        e.stopPropagation();
        setDeleting(false);
    };
    
    const handleConfirmedDeleteButton = () => {
        dispatch(sendCargoToDelete(index));
        setDeleting(false);
    };
    
    return (
        <>
            <div className='transitCargoRow'>{current.id}</div>
            <div className='transitCargoRow'>
                <Editable state={edit}>
                    <HookedTextarea value={current.stickerId} onChange={stickerIdInputHandle} className='trCargoTextarea active'/>
                </Editable>
                <Error state={nullSticker} errorMessage='Sticker ID cant be null'/>
                <Error state={lettersInSticker} errorMessage='Sticker ID cant have letters'/>
            </div>
            <div className='transitCargoRow'>
                <Editable state={edit}>
                    <HookedTextarea value={(!edit && !current.description) ? 'No description' : current.description} onChange={descriptionInputHandle} className='trCargoTextarea active'/>
                </Editable>
            </div>
            <div className='transitCargoRow actions'>
                <button className={'btn edit'+ (globalEdit ? '' : ' readonly')} onClick={handleEditButton}>
                    {edit ? <AiOutlineCheck className='icon'/> : <AiFillEdit className='icon'/>}
                </button>
                <div className='tcrButtonWithModal'>
                    <button className={'btn delete'+ (globalEdit ? '' : ' readonly')} onClick={handleDeleteButton}>
                        {edit ? <TiCancel className='cancelIcon'/> : <AiFillDelete className='icon'/>}
                    </button>
                    <ModalDeleteWarning modalId='trCargoDeleteModal' confirmHandle={handleConfirmedDeleteButton} cancelHandler={handleCancelDeleting} modalState={deleting} modalSetState={setDeleting}/>
                </div>
            </div>
        </>
    )
};

export default TransitCargoRow;