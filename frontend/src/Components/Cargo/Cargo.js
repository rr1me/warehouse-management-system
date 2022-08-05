import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {thunkCargo} from "../../redux/Slices/cargoSlice";
import './Cargo.css';

const Cargo = () => {
    
    const {cargoEntities} = useSelector(state => state.cargoSlice);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(thunkCargo());
    }, [dispatch])

    if (cargoEntities.length !== undefined){
        return (
            <div className='cargoGrid'>
                {cargoEntities.map((value, index) => {
                    const current = value.cargo.curr;
                    let itemIndex = 0;
                    return (
                        <div key={index} className='gridRow'>
                            <div className={'gridItem item_'+itemIndex++}>{current.id}</div>
                            <div className={'gridItem item_'+itemIndex++}>{current.name}</div>
                            <div className={'gridItem item_'+itemIndex++}>{current.arrivalAddress}</div>
                            <div className={'gridItem item_'+itemIndex++}>{current.departureAddress}</div>
                            <div className={'gridItem item_'+itemIndex++}>{current.arrivalDate}</div>
                            <div className={'gridItem item_'+itemIndex++}>{current.departureDate}</div>
                            <div className={'gridItem item_'+itemIndex++}>{current.cargoStatus}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
    return (<div>uo</div>)
};

export default Cargo;