import {AiOutlineCheck} from "react-icons/ai";
import {TiCancel} from "react-icons/ti";
import RelativeModal from "../RelativeModal/RelativeModal";
import './Transits.sass';

export const typeLabels = [
    {text: 'Acceptance', clr: 'green'},
    {text: 'Dispatching', clr: 'blue'}
];

export const statusLabels = [
    {text: 'Planned', clr: 'blue'},
    {text: 'Completed', clr: 'green'},
    {text: 'Failed', clr: 'red'}
];

export const additionalTasks = [
    'None',
    'QualityControl',
    'Repack',
    'Both'
];

export const ModalDeleteWarning = ({modalState, modalSetState, modalId, confirmHandle, cancelHandler}) => {
    return (
        <RelativeModal state={modalState} id={modalId} setOpen={modalSetState} onClick={e=>e.stopPropagation()} modalStyle={{top: 10, right: 0, width: 'max-content'}}>
            <div className='deleteWarning'>
                <div className='warningText'>Are you sure?</div>
                <div className='warningCtrl'>
                    <button className='btn edit' onClick={confirmHandle}><AiOutlineCheck className='icon'/></button>
                    <button className='btn delete' onClick={cancelHandler}><TiCancel className='cancelIcon'/></button>
                </div>
            </div>
        </RelativeModal>
    )
};