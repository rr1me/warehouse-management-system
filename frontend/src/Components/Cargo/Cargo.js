import {useDispatch, useSelector} from "react-redux";
import {addEmptyCargo, sortCargo, thunkCargo} from "../../redux/Slices/cargoSlice";
import './Cargo.css';
import CargoRow from "./CargoRow/CargoRow";
import FilterButton from "../Properties/FilterButton/FilterButton";
import {useEffect} from "react";

const Cargo = () => {
    
    const {cargoEntities, sort} = useSelector(state => state.cargoSlice);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkCargo());
    }, [dispatch])
    
    const handleAddNewClick = () => {
        dispatch(addEmptyCargo());
    }

    if (cargoEntities.length !== undefined){
        return (
            <div className='cargoGrid'>
                <div className='driversGridOperations'>
                    <button onClick={handleAddNewClick} className='btn apply-btn'>Add new</button>
                    <FilterButton id='cargoFilter' sortType={sort} sortList={rows} sortDispatch={sortCargo}/>
                </div>
                <div className='cargoHeader'>
                    <div className='cargoHeaderItem'>Id</div>
                    <div className='cargoHeaderItem'>Name</div>
                    <div className='cargoHeaderItem'>Arrival Address</div>
                    <div className='cargoHeaderItem'>Departure Address</div>
                    <div className='cargoHeaderItem'>Arrival Date</div>
                    <div className='cargoHeaderItem'>Departure Date</div>
                    <div className='cargoHeaderItem'>Status</div>
                    <div className='cargoHeaderItem'>Operations</div>
                </div>
                {cargoEntities.map((value, index) => {
                    const current = value.cargo.curr;
                    const states = value.states;
                    return (
                        <CargoRow key={index} index={index} current={current} states={states}/>
                    )
                })}
            </div>
        )
    }
};

export default Cargo;

const rows = [
    'By id',
    'By name',
    'By status'
]