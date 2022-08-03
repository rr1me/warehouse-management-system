import './DriverCard.css'
import {memo, useEffect, useState} from "react";
import {AiFillDelete, AiFillEdit, AiOutlineCheck, AiOutlinePhone} from "react-icons/ai";
import {GiCargoShip} from "react-icons/gi";
import {
    changeEditWithReq,
    driverToDelete,
    setDriverName,
    setDriverPhoneNumber
} from "../../../redux/Slices/driversSlice";
import {useDispatch} from "react-redux";
import Editable from "../../ULTable/Editable";
import {Link} from "react-router-dom";
import StatusPicker from "../StatusPicker/StatusPicker";
import RelativeModal from "../../RelativeModal/RelativeModal";

const DriverCard = memo(({driver, index}) => {
    
    useEffect(() => {
        const closeDp = e => {
            if (e.composedPath()[0].id !== 'deleteModal'){
                setDeleting(false);
            }
        }
        
        document.body.addEventListener('click', closeDp);
        
        return () => document.body.removeEventListener('click', closeDp);
    })
    
    const [deleting, setDeleting] = useState(false);
    
    const dispatch = useDispatch();
    
    const handleEditClick = () => {
        dispatch(changeEditWithReq(index));
    };
    
    const handleYesDelete = () => {
        dispatch(driverToDelete({index: index, id: driver.id}));
        setDeleting(false);
    };
    
    const handleNoDelete = () => {
        setDeleting(false);
    }
    
    const getOperations = () => {
        return (
            <div className='operationContainer'>
                <button className='operation' onClick={handleEditClick}>
                    {driver.editing ? icons.check : icons.edit}
                </button>
                <button className='operation' onClick={e => {
                    e.stopPropagation();
                    setDeleting(value => !value)
                }}>
                    {icons.delete}
                </button>
                <RelativeModal state={deleting}
                               doubleWrap={false} id='deleteModal'
                               modalStyle={{padding: '3px 6px', width: '140px', textAlign: 'center', top: '30px', right: '65px'}}
                               onClick={e => e.stopPropagation()}>
                    <div>Are you sure you want to delete this?</div>
                    <div className='deleteOperations'>
                        <button className='btn apply-btn' onClick={handleYesDelete}>Yes</button>
                        <button className='btn delete-btn' onClick={handleNoDelete}>No</button>
                    </div>
                </RelativeModal>
            </div>
        )
    };
    
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
                {getOperations()}
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