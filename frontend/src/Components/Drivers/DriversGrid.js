import './DriversGrid.css'
import {memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addEmptyDriver, getDriversThunk, sortDrivers} from "../../redux/Slices/driversSlice";
import DriverCard from "./DriverCard/DriverCard";
import BulletList from "../Properties/BulletList/BulletList";

const DriversGrid = memo(() => {
    
    const [filterOpen, setFilterOpen] = useState(false);
    
    const gridRef = useRef();
    
    const dispatch = useDispatch();
    const {driversEntities, sort} = useSelector(state => state.driversSlice);

    useEffect(() => {
        dispatch(getDriversThunk());

        const closeDp = e => {
            if (e.composedPath()[0].id !== 'filterModal'){
                setFilterOpen(false);
            }
        }
        document.body.addEventListener('click', closeDp);
        return () => document.body.removeEventListener('click', closeDp);
    }, [dispatch]);
    
    const handleAddNewClick = () => {
        dispatch(addEmptyDriver());
    };
    
    const handleFilterClick = e => {
        e.stopPropagation();
        setFilterOpen(value => !value);
    };
    
    return (
        <div className='gridContainer' ref={gridRef}>
            <div className='driversGridOperations'>
                <button onClick={handleAddNewClick} className='btn apply-btn'>Add new</button>
                <button onClick={handleFilterClick} className='btn apply-btn'>
                    Filter
                    <BulletList openState={filterOpen} bulletState={sort} bulletList={rows} bulletStateDispatch={sortDrivers}/>
                </button>
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