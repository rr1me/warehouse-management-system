import './DriverCard.css'
import {memo} from "react";
import {AiFillDelete, AiFillEdit, AiOutlineCheck, AiOutlinePhone} from "react-icons/ai";
import {GiCargoShip} from "react-icons/gi";
import {setDriverName, setDriverPhoneNumber} from "../../../redux/Slices/driversSlice";
import {useDispatch} from "react-redux";
import Editable from "../../Properties/Editable";
import {Link} from "react-router-dom";
import StatusPicker from "../StatusPicker/StatusPicker";
import Operations from "../../Properties/Operations";

const DriverCard = memo(({driver, index}) => {
    
    const dispatch = useDispatch();
    
    const handleNameInput = e => {
        dispatch(setDriverName({id: index, name: e.target.value}))
    };
    
    const handlePhoneNumberInput = e => {
        const value = e.target.value;
        if (/\d/.test(value.slice(-1)))
            dispatch(setDriverPhoneNumber({id: index, phoneNumber: value}));
    };
    
    return (
        <div key={index} className='item'>
            <div className='name'>
                <Editable state={driver.editing}>
                    <input className='col-input name' value={driver.name} onChange={handleNameInput}/>
                </Editable>
            </div>
            <img src={driver.imageSrc} alt='pic'/>
            <div className='side'>
                <StatusPicker status={driver.status} editing={driver.editing} index={index}/>
                <Operations driver={driver} index={index}/>
            </div>
            <div className='about'>
                <div>{icons.phone} +
                    <Editable state={driver.editing}>
                        <input className='col-input name' value={driver.phoneNumber} onChange={handlePhoneNumberInput}/>
                    </Editable>
                </div>
                <div>{icons.cargo} {driver.cargoes ? getCargoIds(driver.cargoes) : 'No cargo assigned'}</div>
            </div>
        </div>
    )
});

export default DriverCard;

const getCargoIds = cargoes => {
    const length = cargoes.length-1;

    const getClassName = index => {
        return 'array'+(length === index ? null : ' comma');
    }

    return cargoes.map((value, index) => {
        const id = value.id;
        return (
            <div key={id} className={getClassName(index)}>
                <Link to={"/cargoes/"+id}>{id}</Link>
            </div>
        )
    });
};

const icons = {
    check: <AiOutlineCheck className='icon'/>,
    edit: <AiFillEdit className='icon'/>,
    delete: <AiFillDelete className='icon'/>,
    phone: <AiOutlinePhone className='icon'/>,
    cargo: <GiCargoShip className='icon'/>
};