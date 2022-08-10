import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addEmptyCargo, sortCargo, thunkCargo} from "../../redux/Slices/cargoSlice";
import './Cargo.css';
import BulletList from "../Properties/BulletList/BulletList";
import CargoRow from "./CargoRow/CargoRow";

const Cargo = () => {
    
    const {cargoEntities, sort} = useSelector(state => state.cargoSlice);

    const dispatch = useDispatch();
    
    const [filterOpen, setFilterOpen] = useState(false);
    
    useEffect(() => {
        dispatch(thunkCargo());
    }, [dispatch])

    const handleFilterClick = e => {
        // e.stopPropagation();
        setFilterOpen(value => !value);
    };
    
    const handleAddNewClick = () => {
        dispatch(addEmptyCargo());
    }

    if (cargoEntities.length !== undefined){
        let headerItemIndex = 0;
        return (
            <div className='cargoGrid'>
                <div className='driversGridOperations'>
                    <button onClick={handleAddNewClick} className='btn apply-btn'>Add new</button>
                    <button onClick={handleFilterClick} className='btn apply-btn'>
                        Filter
                        <BulletList openState={filterOpen} bulletState={sort} bulletList={rows} bulletStateDispatch={sortCargo}/>
                    </button>
                </div>
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
                        // <div key={index} className='gridRow'>
                        //     <div className={'gridItem item_'+itemIndex++}>{current.id}</div>
                        //     <div className={'gridItem item_'+itemIndex++}>{current.name}</div>
                        //     <Editable state={states.editing}>
                        //         <input className='col-input name' value={current.name} onChange={handlePhoneNumberInput}/>
                        //     </Editable>
                        //     <div className={'gridItem item_'+itemIndex++}>{current.arrivalAddress}</div>
                        //     <div className={'gridItem item_'+itemIndex++}>{current.departureAddress}</div>
                        //     <div className={'gridItem item_'+itemIndex++}>
                        //         <DatePicker id={'ardate_'+index} incomeDate={current.arrivalDate} setDateDispatch={setArrivalDate} dispatchIndex={index} editState={states.editing}/>
                        //     </div>
                        //     <div className={'gridItem item_'+itemIndex++}>
                        //         <DatePicker id={'ardate_'+index} incomeDate={current.departureDate} setDateDispatch={setArrivalDate} dispatchIndex={index} editState={false}/>
                        //     </div>
                        //     <div className={'gridItem item_'+itemIndex++}>{current.cargoStatus}</div>
                        //     <div className={'gridItem item_'+itemIndex++}>
                        //         <Operations id={current.id} editing={states.editing} index={index} editDispatch={editCargoThunk} cancelEditDispatch={cancelEditCargo} deleteDispatch={deleteCargoThunk}/>
                        //     </div>
                        // </div>
                        <CargoRow key={index} index={index} itemIndex={itemIndex} current={current} states={states}/>
                    )
                })}
            </div>
        )
    }
    return (<div>uo</div>)
};

export default Cargo;

const rows = [
    'By id',
    'By name',
    'By status'
]