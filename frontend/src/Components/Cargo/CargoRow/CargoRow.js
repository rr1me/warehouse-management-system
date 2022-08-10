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

const CargoRow = ({itemIndex, index, current, states}) => {
    
    const dispatch = useDispatch();

    const handleNameInput = e => {
        dispatch(setCargoName({index: index, name: e.target.value}))
    };
    
    const handleArrivalAddress = e => {
        dispatch(setArrivalAddress({index: index, arrivalAddress: e.target.value}));
    };
    
    return (
        <div className='gridRow'>
            <div className={'gridItem item_'+itemIndex++}>{current.id}</div>
            <div className={'gridItem item_'+itemIndex++}>
                <Editable state={states.editing}>
                    <input className={'col-input'} value={current.name} onChange={handleNameInput}/>
                </Editable>
            </div>
            <div className={'gridItem item_'+itemIndex++}>
                <Editable state={states.editing}>
                    <input className={'col-input'} value={current.arrivalAddress} onChange={handleArrivalAddress}/>
                </Editable>
            </div>
            <div className={'gridItem item_'+itemIndex++}>{current.departureAddress}</div>
            <div className={'gridItem item_'+itemIndex++}>
                <DatePicker id={'ardate_'+index} incomeDate={current.arrivalDate} setDateDispatch={setArrivalDate} dispatchIndex={index} editState={states.editing}/>
            </div>
            <div className={'gridItem item_'+itemIndex++}>
                <DatePicker id={'ardate_'+index} incomeDate={current.departureDate} setDateDispatch={setArrivalDate} dispatchIndex={index} editState={false}/>
            </div>
            <div className={'gridItem item_'+itemIndex++}>{current.cargoStatus}</div>
            <div className={'gridItem item_'+itemIndex++}>
                <Operations id={current.id} editing={states.editing} index={index} editDispatch={editCargoThunk} cancelEditDispatch={cancelEditCargo} deleteDispatch={deleteCargoThunk}/>
            </div>
        </div>
    )
};

export default CargoRow;