import './DriversGrid.css'
import {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addEmptyDriver, getDriversThunk, sortDrivers} from "../../redux/Slices/driversSlice";
import DriverCard from "./DriverCard/DriverCard";
import FilterButton from "../Properties/FilterButton/FilterButton";

const DriversGrid = memo(() => {
    
    const {driversEntities, sort} = useSelector(state => state.driversSlice);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDriversThunk());
    }, [dispatch]);
    
    const handleAddNewClick = () => {
        dispatch(addEmptyDriver());
    };
    
    return (
        <div className='gridContainer'>
            <div className='driversGridOperations'>
                <button onClick={handleAddNewClick} className='btn apply-btn tableButton'>Add new</button>
                <FilterButton id='driverFilter' sortType={sort} sortList={rows} sortDispatch={sortDrivers}/>
            </div>
            {driversEntities.length !== undefined ? driversEntities.map((value, index) => {
                return (
                    <DriverCard key={index} driverEntity={value} index={index}/>
                )
            }) : null}
        </div>
    )
});

export default DriversGrid;

const rows = [
    'By id',
    'By name',
    'By status'
]