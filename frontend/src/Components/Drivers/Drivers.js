import './Drivers.css';
import {useEffect, useState} from "react";
import {getDrivers} from "../../Services/DriversService";
import {Link} from "react-router-dom";
import {AiFillDelete, AiFillEdit, AiOutlineCheck} from "react-icons/ai";
import Editable from "../ULTable/Editable";
import GenerateTable from "../ULTable/TableGenerator";

export const Drivers = () => {

    const [drivers, setDrivers] = useState(Array);
    const [edit, setEdit] = useState({});
    
    useEffect(() => {
        getDrivers().then((res) => {
            setDrivers(res.data);
            setEdit(() => {
                return res.data.map(() => {return false;});
            })
        });
    }, [setDrivers]);

    const getOperations = index => {
        return (
            <>
                <button className='operation' onClick={() => {
                    edit[index] = !edit[index];
                    setEdit([...edit]);
                }}>
                    {edit[index] ? <AiOutlineCheck className='icon'/> : <AiFillEdit className='icon'/>}
                </button>
                <button className='operation' onClick={() => {
                    console.log(edit);
                }}>
                    <AiFillDelete className='icon'/>
                </button>
            </>
        )
    };
    
    const tableHeader = ['Name', 'Mobile', 'Status', 'Cargoes', 'Operations'];
    
    const rowFunctions = [
        (value, index) => {
            return (
                <Editable state={edit[index]}>
                    <input className='col-input' value={value} onInput={e => {
                        value.name = e.target.value;
                        setDrivers([...drivers]);
                    }}/>
                </Editable>
            )},
        (value) => '+'+value,
        (value) => getStatus(value),
        (value) => value ? getCargoIds(value) : 'No',
        (index) => getOperations(index)
    ];

    return (
        <GenerateTable headerValues={tableHeader} rowFunctions={rowFunctions} array={drivers}/>
    )
};

const getStatus = status => {
    switch (status) {
        case 0: return 'Active';
        case 1: return 'Inactive';
        case 2: return 'At work';
    }
};

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
}