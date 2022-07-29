import {useEffect, useState} from "react";
import {getCargoes} from "../../Services/CargoesService";
import GenerateTable from "../ULTable/TableGenerator";

const Cargoes = () => {
    
    const [cargoes, setCargoes] = useState(Array);
    const [edit, setEdit] = useState({});
    
    useEffect(() => {
        getCargoes().then((res) => {
            setCargoes(res.data);
            setEdit(() => {
                return res.data.map(() => {return false;});
            })
            console.log(res.data);
        })
    }, [setCargoes]);
    
    const tableHeader = ['Name', 'Arrival Address', 'Departure Address', 'Arrival Date', 'Departure Date', 'On The Way', 'Delivered'];
    
    const rowFunctions = [
        (value) => value,
        (value) => value,
        (value) => value,
        (value) => value,
        (value) => value,
        (value) => value ? 'Yes': 'No',
        (value) => value ? 'Yes': 'No',
    ]
    
    return (
        <GenerateTable headerValues={tableHeader} rowFunctions={rowFunctions} array={cargoes}/>
    )
}

export default Cargoes;