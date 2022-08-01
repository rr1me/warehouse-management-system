﻿import './StatusPicker.css'
import RelativeModal from "../../RelativeModal/RelativeModal";
import {memo, useEffect, useState} from "react";
import {IoIosArrowDown} from "react-icons/io";
import {useDispatch} from "react-redux";
import {setDriverStatus} from "../../../redux/Slices/driversSlice";

const StatusPicker = memo(({status, editing, index}) => {
    
    const [statusModalOpened, setStatusModalOpened] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {

        const closeDP = (e) => {
            if (e.composedPath()[0].id !== 'relativeModal'){
                setStatusModalOpened(false);
            }
        };

        document.body.addEventListener('click', closeDP);

        return () => document.body.removeEventListener('click', closeDP);
    });

    const Status = ({status, editing, modalOpened}) => {
        let value;
        let className = 'status'+(editing ? ' bordered' : '');
        switch (status) {
            case 0: value = 'Active'; className += ' active'; break;
            case 1: value = 'Inactive'; className += ' inactive'; break;
            case 2: value = 'At work'; className += ' atwork'; break;
            default: value = 'No data'; className += ' inactive';
        }

        return (
            <div key={status} className={className} onClick={() => {
                if (editing){
                    setStatusModalOpened(value => !value)
                }else if(modalOpened){
                    dispatch(setDriverStatus({id: index, status: status}))
                }
            }}>
                <div>
                    {value}
                    <Arrow editing={editing} modalOpened={modalOpened}/>
                </div>
            </div>
    )};
    
    const getListOfStatuses = () => {
        return new Array(3).fill(0).map((value, index) => {
            return (<Status key={index} status={index} editing={false} modalOpened={true}/>)
        })
    };
    
    return (
        <div>
            <div className='statusContainer' onClick={e => e.stopPropagation()}>
                <Status status={status} editing={editing} modalOpened={statusModalOpened}/>
            </div>
            {statusModalOpened && editing ?
                <RelativeModal doubleWrap={true} id='relativeModal' modalStyle={{top: '3px', right: '3px'}} itemClassname='interactive'>
                    {getListOfStatuses()}
                </RelativeModal> : null}
        </div>
    )
});

export default StatusPicker;

const Arrow = ({editing, modalOpened}) => {
    if (editing){
        return (
            <div className={'arrow' + (modalOpened ? ' opened' : '')}>
                <IoIosArrowDown/>
            </div>
        )
    }
};