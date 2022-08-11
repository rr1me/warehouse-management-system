import Editable from "../../Properties/Editable";
import {DatePicker} from "../../DatePicker/DatePicker";
import {
    cancelEditCargo,
    deleteCargoThunk,
    editCargoThunk,
    setArrivalAddress,
    setArrivalDate,
    setCargoName
} from "../../../redux/Slices/cargoSlice";
import Operations from "../../Properties/Operations/Operations";
import {useDispatch} from "react-redux";
import './CargoRow.css';
import HookedTextarea from "../../Properties/HookedTextarea";

const CargoRow = ({index, current, states}) => {
    
    const dispatch = useDispatch();

    const handleNameInput = e => {
        dispatch(setCargoName({index: index, name: e.target.value}))
    };
    
    const handleArrivalAddress = e => {
        dispatch(setArrivalAddress({index: index, arrivalAddress: e.target.value}));
    };
    
    return (
        <div className='cargoRow'>
            <div className='cargoRowItem'>{current.id}</div>
            <div className='cargoRowItem'>
                <Editable state={states.editing}>
                    <HookedTextarea className='col-input' value={current.name} onChange={handleNameInput}/>
                </Editable>
            </div>
            <div className='cargoRowItem'>
                <Editable state={states.editing}>
                    <HookedTextarea className='col-input' value={current.arrivalAddress} onChange={handleArrivalAddress}/>
                </Editable>
            </div>
            <div className='cargoRowItem'>{current.departureAddress ? current.departureAddress : 'No address'}</div>
            <div className='cargoRowItem'>
                <DatePicker id={'arrivalDate_'+index} incomeDate={current.arrivalDate} setDateDispatch={setArrivalDate} dispatchIndex={index} editState={states.editing}/>
            </div>
            <div className='cargoRowItem'>
                {current.departureDate ?
                    <DatePicker id={'departureDate_'+index} incomeDate={current.departureDate} setDateDispatch={setArrivalDate} dispatchIndex={index} editState={false}/>
                    : 'No date'
                }
            </div>
            <div className='cargoRowItem'>{current.cargoStatus}</div>
            <div className='cargoRowItem'>
                <Operations id={current.id} editing={states.editing} index={index} editDispatch={editCargoThunk} cancelEditDispatch={cancelEditCargo} deleteDispatch={deleteCargoThunk}/>
            </div>
        </div>
    )
};

export default CargoRow;