import './DriversGrid.css'
import {useEffect} from "react";
import {getDrivers} from "../../Services/DriversService";
import {useDispatch, useSelector} from "react-redux";
import {setAllDrivers} from "../../redux/Slices/driversSlice";
import DriverCard from "./DriverCard/DriverCard";

const DriversGrid = () => {
    
    const dispatch = useDispatch();
    const {drivers} = useSelector(state => state.driversSlice);

    useEffect(() => {
        getDrivers().then((res) => {
            dispatch(setAllDrivers(res.data.map(value=>{
                value.editing = false;
                return value;
            })));
        });
    }, [dispatch]);
    
    return (
        <div className='gridContainer'>
            {drivers[0] !== undefined ? drivers.map((value, index) => {
                return (
                    <DriverCard key={index} driver={value} driverId={index}/>
                )
            }) : null}
        </div>
    )
};

export default DriversGrid;