import './Operations.css';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {FcCancel} from "react-icons/fc";
import RelativeModal from "../../RelativeModal/RelativeModal";

const Operations = ({index, editing, id, editDispatch, deleteDispatch, cancelEditDispatch}) => {

    useEffect(() => {
        const closeDp = e => {
            if (e.composedPath()[0].id !== 'deleteModal'){
                setDeleting(false);
            }
        }

        document.body.addEventListener('click', closeDp);

        return () => document.body.removeEventListener('click', closeDp);
    })

    const [deleting, setDeleting] = useState(false);

    const dispatch = useDispatch();

    const handleEditClick = () => {
        dispatch(editDispatch(index));
    };
    
    const handleDeleteClick = e => {
        if (!editing){
            e.stopPropagation();
            setDeleting(value => !value);
        }else{
            dispatch(cancelEditDispatch(index));
        }
    }

    const handleYesDelete = () => {
        dispatch(deleteDispatch({index: index, id: id}));
        setDeleting(false);
    };

    const handleNoDelete = () => {
        setDeleting(false);
    }
    
    return (
        <div className='operationContainer'>
            <button className='operation edit' onClick={handleEditClick}>
                {editing ? icons.check : icons.edit}
            </button>
            <button className='operation delete' onClick={handleDeleteClick}>
                {editing ? icons.cancel : icons.delete}
            </button>
            <RelativeModal state={deleting}
                           doubleWrap={false} id='deleteModal'
                           modalStyle={{padding: '3px 6px', width: '140px', textAlign: 'center', top: '30px', right: '65px'}}
                           onClick={e => e.stopPropagation()}>
                <div>Are you sure you want to delete this?</div>
                <div className='deleteOperations'>
                    <button className='btn apply-btn' onClick={handleYesDelete}>Yes</button>
                    <button className='btn delete-btn' onClick={handleNoDelete}>No</button>
                </div>
            </RelativeModal>
        </div>
    )
};

export default Operations;

const icons = {
    check: <AiOutlineCheck className='icon'/>,
    edit: <AiFillEdit className='icon'/>,
    delete: <AiFillDelete className='icon'/>,
    cancel: <FcCancel className='icon'/>
};