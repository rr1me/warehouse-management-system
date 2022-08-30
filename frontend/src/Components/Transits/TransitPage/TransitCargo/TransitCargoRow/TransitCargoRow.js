import './TransitCargoRow.sass';
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {useState} from "react";
import Editable from "../../../../Properties/Editable";
import HookedTextarea from "../../../../Properties/HookedTextarea";
import {useDispatch} from "react-redux";
import {
    applyTransitPageCargoEdit,
    cancelTransitCargoEdit, sendCargoToDelete,
    setTransitPageCargoDescription,
    setTransitPageCargoStickerId
} from "../../../../../redux/Slices/transitSlice";
import {TiCancel} from "react-icons/ti";
import RelativeModal from "../../../../RelativeModal/RelativeModal";

const TransitCargoRow = ({current, index, globalEdit}) => {
    
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(current.id === 0); //todo fixbug .unshift makes transitCargoRow update last element neither the new one
    const [deleting, setDeleting] = useState(false);
    
    const handleEditButton = () => {
        if (globalEdit){
            setEdit(value => !value);
            if (edit)
                dispatch(applyTransitPageCargoEdit(index));
        }
    };
    
    const handleDeleteButton = e => {
        if (!globalEdit)
            return;
        
        if (edit){
            dispatch(cancelTransitCargoEdit(index));
            setEdit(false);
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
    
    const handleConfirmedDeleteButton = e => {
        dispatch(sendCargoToDelete(index));
    };
    
    return (
        <>
            <div className='transitCargoRow'>{current.id}</div>
            <div className='transitCargoRow'>
                <Editable state={edit}>
                    <HookedTextarea value={current.stickerId} onChange={stickerIdInputHandle} className='trCargoTextarea editing'/>
                </Editable>
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
                <RelativeModal state={deleting} id='trCargoDeleteModal' doubleWrap={false} setOpen={setDeleting} onClick={e=>e.stopPropagation()}>
                    <div className='deleteWarning'>
                        <div className='warningText'>Are you sure?</div>
                        <div className='warningCtrl'>
                            <button className='btn edit' onClick={handleConfirmedDeleteButton}><AiOutlineCheck className='icon'/></button>
                            <button className='btn delete' onClick={handleCancelDeleting}><TiCancel className='cancelIcon'/></button>
                        </div>
                    </div>
                </RelativeModal>
            </div>
        </>
    )
};

export default TransitCargoRow;