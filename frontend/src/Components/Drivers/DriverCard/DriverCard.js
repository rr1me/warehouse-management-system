import './DriverCard.css'
import {memo} from "react";
import {AiOutlinePhone} from "react-icons/ai";
import {GiCargoShip} from "react-icons/gi";
import {
    cancelEditDriver,
    deleteDriverThunk,
    editDriverThunk,
    setDriverName,
    setDriverPhoneNumber
} from "../../../redux/Slices/driversSlice";
import {useDispatch} from "react-redux";
import Editable from "../../Properties/Editable";
import {Link} from "react-router-dom";
import StatusPicker from "../StatusPicker/StatusPicker";
import React from 'react';
import Operations from "../../Properties/Operations/Operations";

const DriverCard = memo(({driverEntity, index}) => {
    const {driver, states} = driverEntity;
    const current = driver.curr;
    
    const dispatch = useDispatch();
    
    const handleNameInput = e => {
        dispatch(setDriverName({index: index, name: e.target.value}))
    };
    
    const handlePhoneNumberInput = e => {
        const value = e.target.value;
        if (/\d/.test(value.slice(-1)))
            dispatch(setDriverPhoneNumber({index: index, phoneNumber: value}));
    };
    
    return (
        <div key={index} className='item'>
            <div className='name'>
                <Editable state={states.editing}>
                    <input className='col-input name' value={current.name} onChange={handleNameInput}/>
                </Editable>
            </div>
            <img src={current.imageSrc} alt='pic'/>
            <div className='side'>
                <StatusPicker status={current.status} editing={states.editing} index={index}/>
                <Operations index={index} editing={states.editing} id={current.id} editDispatch={editDriverThunk} deleteDispatch={deleteDriverThunk} cancelEditDispatch={cancelEditDriver}/>
            </div>
            <div className='about'>
                <div>{icons.phone} +
                    <Editable state={states.editing}>
                        <input className='col-input name' value={current.phoneNumber} onChange={handlePhoneNumberInput}/>
                    </Editable>
                </div>
                <div>{icons.cargo} {current.cargoes ? getCargoIds(current.cargoes) : 'No cargo assigned'}</div>
            </div>
        </div>
    )
});

export default DriverCard;

const getCargoIds = cargoes => {
    const length = cargoes.length-1;

    return cargoes.map((value, index) => {
        const id = value.id;
        return (
            <React.Fragment key={index}>
                <Link to={"/cargoes/"+id}>{id}</Link>
                {length === index ? null : ','}
            </React.Fragment>
        )
    });
};

const icons = {
    phone: <AiOutlinePhone className='icon'/>,
    cargo: <GiCargoShip className='icon'/>
};