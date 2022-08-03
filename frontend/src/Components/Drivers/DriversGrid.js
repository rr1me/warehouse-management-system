import './DriversGrid.css'
import {memo, useEffect, useRef, useState} from "react";
import {getDrivers} from "../../Services/DriversService";
import {useDispatch, useSelector} from "react-redux";
import {addEmptyDriver, setAllDrivers} from "../../redux/Slices/driversSlice";
import DriverCard from "./DriverCard/DriverCard";

const DriversGrid = memo(() => {
    
    const [filterOpen, setFilterOpen] = useState(false);
    
    const gridRef = useRef();
    
    const dispatch = useDispatch();
    const {drivers} = useSelector(state => state.driversSlice);

    useEffect(() => {
        getDrivers().then((res) => {
            const drivers = res.data.map(value => {
                value.editing = false;
                return value
            }).sort((a, b) => a.id - b.id);
            dispatch(setAllDrivers(drivers));
        });
    }, [dispatch]);
    
    const handleAddNewClick = () => {
        dispatch(addEmptyDriver());
    };
    
    const handleFilterClick = () => {
        setFilterOpen(value => !value);
    }
    
    return (
        <div className='gridContainer' ref={gridRef}>
            <div className='driversGridOperations'>
                <button onClick={handleAddNewClick} className='btn apply-btn'>Add new</button>
                <button onClick={handleFilterClick} className='btn apply-btn'>Filter</button>
            </div>
            {drivers[0] !== undefined ? drivers.map((value, index) => {
                return (
                    <DriverCard key={index} driver={value} index={index}/>
                )
            }) : null}
        </div>
    )
});

export default DriversGrid;