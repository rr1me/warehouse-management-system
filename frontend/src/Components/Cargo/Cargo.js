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

    const handleFilterClick = () => {
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
                <div className='cargoGridHeader cargoGridRow'>
                    <div className={'cargoGridItem cargoHeaderItem_'+headerItemIndex++}>Id</div>
                    <div className={'cargoGridItem cargoHeaderItem_'+headerItemIndex++}>Name</div>
                    <div className={'cargoGridItem cargoHeaderItem_'+headerItemIndex++}>Arrival Address</div>
                    <div className={'cargoGridItem cargoHeaderItem_'+headerItemIndex++}>Departure Address</div>
                    <div className={'cargoGridItem cargoHeaderItem_'+headerItemIndex++}>Arrival Date</div>
                    <div className={'cargoGridItem cargoHeaderItem_'+headerItemIndex++}>Departure Date</div>
                    <div className={'cargoGridItem cargoHeaderItem_'+headerItemIndex++}>Status</div>
                    <div className={'cargoGridItem cargoHeaderItem_'+headerItemIndex++}>Operations</div>
                </div>
                {cargoEntities.map((value, index) => {
                    const current = value.cargo.curr;
                    const states = value.states;
                    
                    let itemIndex = 0;
                    return (
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