import Editable from "../../Properties/Editable";
import {DatePicker} from "../../DatePicker/DatePicker";
import {
    cancelEditCargo,
    deleteCargoThunk,
    editCargoThunk, setArrivalAddress,
    setArrivalDate,
    setCargoName
} from "../../../redux/Slices/cargoSlice";
import Operations from "../../Properties/Operations/Operations";
import {useDispatch} from "react-redux";
import './CargoRow.css';
import {useEffect, useLayoutEffect, useRef} from "react";

const CargoRow = ({itemIndex, index, current, states}) => {
    
    const dispatch = useDispatch();

    const handleNameInput = e => {
        dispatch(setCargoName({index: index, name: e.target.value}))
    };
    
    const handleArrivalAddress = e => {
        dispatch(setArrivalAddress({index: index, arrivalAddress: e.target.value}));
    };
    
    const nameRef = useRef();
    
    const arrivalAddressRef = useRef()
    
    useLayoutEffect(() => {
        if (nameRef.current !== null && nameRef.current !== undefined){
            console.log(nameRef)
            nameRef.current.style.height = '15px';
            nameRef.current.style.height = nameRef.current.scrollHeight-4+'px';
        }
    }, [current.name, states.editing])

    useLayoutEffect(() => {
        console.log("?");
        if (arrivalAddressRef.current !== null && arrivalAddressRef.current !== undefined){
            console.log(arrivalAddressRef)
            arrivalAddressRef.current.style.height = '15px';
            arrivalAddressRef.current.style.height = arrivalAddressRef.current.scrollHeight-4+'px';
        }
    }, [current.arrivalAddress, states.editing])
    
    return (
        <div className='cargoGridRow cargoItem'>
            <div className={'cargoGridItem cargoItem_'+itemIndex++}>{current.id}</div>
            <div className={'cargoGridItem cargoItem_'+itemIndex++}>
                <Editable state={states.editing}>
                    <textarea ref={nameRef} className='col-input' value={current.name} onChange={handleNameInput}/>
                </Editable>
            </div>
            <div className={'cargoGridItem cargoItem_'+itemIndex++}>
                <Editable state={states.editing}>
                    <textarea ref={arrivalAddressRef} className='col-input' value={current.arrivalAddress} onChange={handleArrivalAddress}/>
                </Editable>
            </div>
            <div className={'cargoGridItem cargoItem_'+itemIndex++}>{current.departureAddress ? current.departureAddress : 'No address'}</div>
            <div className={'cargoGridItem cargoItem_'+itemIndex++}>
                <DatePicker id={'arrivalDate_'+index} incomeDate={current.arrivalDate} setDateDispatch={setArrivalDate} dispatchIndex={index} editState={states.editing}/>
            </div>
            <div className={'cargoGridItem cargoItem_'+itemIndex++}>
                {current.departureDate ?
                    <DatePicker id={'departureDate_'+index} incomeDate={current.departureDate} setDateDispatch={setArrivalDate} dispatchIndex={index} editState={false}/>
                    : 'No date'
                }
            </div>
            <div className={'cargoGridItem cargoItem_'+itemIndex++}>{current.cargoStatus}</div>
            <div className={'cargoGridItem cargoItem_'+itemIndex++}>
                <Operations id={current.id} editing={states.editing} index={index} editDispatch={editCargoThunk} cancelEditDispatch={cancelEditCargo} deleteDispatch={deleteCargoThunk}/>
            </div>
        </div>
    )
};

export default CargoRow;