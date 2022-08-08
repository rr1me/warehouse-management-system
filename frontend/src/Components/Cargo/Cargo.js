import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    cancelEditCargo,
    deleteCargoThunk,
    editCargoThunk,
    setArrivalDate,
    thunkCargo
} from "../../redux/Slices/cargoSlice";
import './Cargo.css';
import {DatePicker} from "../DatePicker/DatePicker";
import Operations from "../Properties/Operations";

const Cargo = () => {
    
    const {cargoEntities} = useSelector(state => state.cargoSlice);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkCargo());
    }, [dispatch])

    if (cargoEntities.length !== undefined){
        let headerItemIndex = 0;
        return (
            <div className='cargoGrid'>
                <div className='gridHeader gridRow'>
                    <div className={'gridItem headerItem_'+headerItemIndex++}>Id</div>
                    <div className={'gridItem headerItem_'+headerItemIndex++}>Name</div>
                    <div className={'gridItem headerItem_'+headerItemIndex++}>Arrival Address</div>
                    <div className={'gridItem headerItem_'+headerItemIndex++}>Departure Address</div>
                    <div className={'gridItem headerItem_'+headerItemIndex++}>Arrival Date</div>
                    <div className={'gridItem headerItem_'+headerItemIndex++}>Departure Date</div>
                    <div className={'gridItem headerItem_'+headerItemIndex++}>Status</div>
                    <div className={'gridItem headerItem_'+headerItemIndex++}>Operations</div>
                </div>
                {cargoEntities.map((value, index) => {
                    const current = value.cargo.curr;
                    const states = value.states;
                    
                    let itemIndex = 0;
                    return (
                        <div key={index} className='gridRow'>
                            <div className={'gridItem item_'+itemIndex++}>{current.id}</div>
                            <div className={'gridItem item_'+itemIndex++}>{current.name}</div>
                            <div className={'gridItem item_'+itemIndex++}>{current.arrivalAddress}</div>
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
                })}
            </div>
        )
    }
    return (<div>uo</div>)
};

export default Cargo;