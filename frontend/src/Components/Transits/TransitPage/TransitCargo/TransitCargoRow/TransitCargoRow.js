import './TransitCargoRow.sass';
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {useState} from "react";
import Editable from "../../../../Properties/Editable";
import HookedTextarea from "../../../../Properties/HookedTextarea";
import {useDispatch} from "react-redux";
import {
    applyTransitCargoEdit,
    cancelTransitCargoEdit,
    sendCargoToDelete,
    setTransitPageCargoDescription,
    setTransitPageCargoStickerId,
    startTransitCargoEdit
} from "../../../../../redux/Slices/transitSlice";
import {TiCancel} from "react-icons/ti";
import {ModalDeleteWarning} from "../../../TransitProps";
import Valid from "../../../../Valid/Valid";

const TransitCargoRow = ({cargo, states:{edit}, index, globalEdit}) => {
    
    const dispatch = useDispatch();  //todo fixbug .unshift makes transitCargoRow update last element neither the new one
    const [deleting, setDeleting] = useState(false);
    
    const [stickerValid, setStickerValid] = useState(cargo.stickerId !== '');
    
    const handleEditButton = () => {
        // if (globalEdit){
        //     if (edit) {
        //         if (cargo.stickerId !== '') {
        //             // dispatch(setTransitPageCargoEdit({index: index, bool: !edit})); //todo remake it to one dispatch
        //             dispatch(applyTransitPageCargoEdit(index));
        //             setStickerValid(true);
        //         }
        //         else
        //             setStickerValid(false);
        //     }else{}
        //         // dispatch(setTransitPageCargoEdit({index: index, bool: !edit}));
        // }
        if (globalEdit){
            dispatch(edit ? applyTransitCargoEdit(index) : startTransitCargoEdit(index));
            // edit ? dispatch(applyTransitPageCargoEdit(index)) : dispatch(startTransitPageCargoEdit(index));
            // if (edit)
            //     dispatch(applyTransitCargoEdit(index));
            // else
            //     dispatch(startTransitCargoEdit(index));
        }
    };
    
    const handleDeleteButton = e => {
        if (!globalEdit)
            return;
        
        if (edit){
            dispatch(cancelTransitCargoEdit(index)); //todo remake this
            // dispatch(setTransitPageCargoEdit({index: index, bool: false}));
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
            <div className='transitCargoRow'>{cargo.id}</div>
            <div className='transitCargoRow'>
                <Valid valid={stickerValid} errorMessage='Client cant be null'>
                    <Editable state={edit}>
                        <HookedTextarea value={cargo.stickerId} onChange={stickerIdInputHandle} className='trCargoTextarea editing'/>
                    </Editable>
                </Valid>
            </div>
            <div className='transitCargoRow'>
                <Editable state={edit}>
                    <HookedTextarea value={(!edit && !cargo.description) ? 'No description' : cargo.description} onChange={descriptionInputHandle} className='trCargoTextarea editing'/>
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