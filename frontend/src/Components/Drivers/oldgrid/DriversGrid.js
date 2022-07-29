import './DriversGrid.css'
import {memo, useEffect, useMemo, useState} from "react";
import {getDrivers} from "../../Services/DriversService";
import {AiFillDelete, AiFillEdit, AiOutlineCheck, AiOutlinePhone} from "react-icons/ai";
import {Link} from "react-router-dom";
import {GiCargoShip} from "react-icons/gi";
import {IoIosArrowDown} from "react-icons/io";
import {MdOutlineHorizontalRule} from "react-icons/md";
import Editable from "../ULTable/Editable";
import SelectPicker from "../SelectPicker/SelectPicker";
import RelativeModal from "../RelativeModal/RelativeModal";

const DriversGrid = memo(() => {

    const [drivers, setDrivers] = useState();
    const [edit, setEdit] = useState({});
    const [statusModalOpened, setStatusModalOpened] = useState(false);

    useEffect(() => {
        getDrivers().then((res) => {
            setDrivers(res.data);
            setEdit(() => {
                return res.data.map(() => {return false;});
            })
            // setStatusModalOpened(() => {
            //     return res.data.map(() => {return false;});
            // })
            console.log(res.data);
        });

        const closeDP = (e) => {
            if (e.composedPath()[0].id !== 'relativeModal'){
                console.log('yes')
                setStatusModalOpened(false);
            }
        };

        document.body.addEventListener('click', closeDP);

        return () => document.body.removeEventListener('click', closeDP);
    }, [setDrivers]);
    
    
    const icons = useMemo(() => {
        return(
            {
                check: <AiOutlineCheck className='icon'/>,
                edit: <AiFillEdit className='icon'/>,
                delete: <AiFillDelete className='icon'/>,
                phone: <AiOutlinePhone className='icon'/>,
                cargo: <GiCargoShip className='icon'/>,
                separator: <MdOutlineHorizontalRule/>,
                arrow: <IoIosArrowDown/>
            }
        )
    }, [])

    const getOperations = index => {
        return (
            <div className='operationContainer'>
                <button className='operation' onClick={() => {
                    edit[index] = !edit[index];
                    setEdit([...edit]);
                }}>
                    {edit[index] ? icons.check : icons.edit}
                </button>
                <button className='operation' onClick={() => {
                    console.log(edit);
                }}>
                    {icons.delete}
                </button>
            </div>
        )
    };
    
    const statuses =  [
        <div className='status active'><div>Active</div></div>,
        <div className='status inactive'><div>Inactive</div></div>,
        <div className='status atwork'><div>At work</div></div>
    ]

    const getStatus = (status, index) => {
        const editing = edit[index];
        // const modalOpened = statusModalOpened[index];
        
        let value;
        let className = 'status'+(editing ? ' bordered' : '');
        switch (status) {
            case 0: value = 'Active'; className += ' active'; break;
            case 1: value = 'Inactive'; className += ' inactive'; break;
            case 2: value = 'At work'; className += ' atwork'; break;
            default: value = 'No data'; className += ' inactive';
        }
        return (
            <div>
                <div className='statusContainer' onClick={e => e.stopPropagation()}>
                    <div className={className} onClick={() => {
                        if (editing){
                            // statusModalOpened[index] = true;
                            // setStatusModalOpened([...statusModalOpened]);
                            setStatusModalOpened(true);
                        }
                    }}>
                        <div>
                            {value}
                            {editing ?
                                <div className={'arrow'+(statusModalOpened ? ' opened' : '')}>
                                    {icons.arrow}
                                </div> : null}

                        </div>
                    </div>
                </div>
                {statusModalOpened && editing ?
                    <>
                        {/*<div className='closingElement' onClick={() => {*/}
                        {/*    statusModalOpened[index] = !statusModalOpened[index];*/}
                        {/*    setStatusModalOpened([...statusModalOpened]);*/}
                        {/*}}/>*/}
                        <RelativeModal name={'relativeModal'}>
                            {statuses}
                        </RelativeModal>
                    </> : null}
            </div>
        )
    };
    
    
    return (
        <div className='gridContainer'>
            {drivers?.map((value, index) => {
                return (
                    <div key={index} className='item'>
                        <div className='name'>
                            <Editable state={edit[index]}>
                                <input className='col-input name' value={value.name} onInput={e => {
                                    value.name = e.target.value;
                                    setDrivers([...drivers]);
                                }}/>
                            </Editable>
                        </div>
                        <img src={value.image} alt='pic'/>
                        <div className='side'>
                            {getStatus(value.status, index)}
                            {getOperations(index)}
                        </div>
                        <div className='about'>
                            <div>{icons.phone} +{value.phoneNumber}</div>
                            <div>{icons.cargo} {value.cargoes ? getCargoIds(value.cargoes) : 'No cargo assigned'}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
});

export default DriversGrid;

// const getStatus = (status, index) => {
//     let value;
//     let className = 'status'+{edit[index] ? ' bordered' : ''};
//     switch (status) {
//         case 0: value = 'Active'; className += ' active'; break;
//         case 1: value = 'Inactive'; className += ' inactive'; break;
//         case 2: value = 'At work'; className += ' atwork'; break;
//         default: value = 'No data'; className += ' inactive';
//     }
//     return (
//         <div className={className}><div>{value}</div></div>
//     )
// };

// const status = () => {
//     const getCurrent = statusId => {
//         let value;
//         let className = 'status';
//         switch (status) {
//             case 0: value = 'Active'; className += ' active'; break;
//             case 1: value = 'Inactive'; className += ' inactive'; break;
//             case 2: value = 'At work'; className += ' atwork'; break;
//             default: value = 'No data'; className += ' inactive';
//         }
//         return (
//             <div className={className}><div>{value}</div></div>
//         )
//     }
// }

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