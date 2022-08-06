import RelativeModal from "../RelativeModal/RelativeModal";
import {useDispatch} from "react-redux";
import {changeEditWithReq, driverToDelete} from "../../redux/Slices/driversSlice";
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import {useEffect, useState} from "react";
import './Operations.css';

const Operations = ({index, driver}) => {

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
        dispatch(changeEditWithReq(index));
    };

    const handleYesDelete = () => {
        dispatch(driverToDelete({index: index, id: driver.id}));
        setDeleting(false);
    };

    const handleNoDelete = () => {
        setDeleting(false);
    }
    
    return (
        <div className='operationContainer'>
            <button className='operation' onClick={handleEditClick}>
                {driver.editing ? icons.check : icons.edit}
            </button>
            <button className='operation' onClick={e => {
                e.stopPropagation();
                setDeleting(value => !value)
            }}>
                {icons.delete}
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
    delete: <AiFillDelete className='icon'/>
};