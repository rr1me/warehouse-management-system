import {useEffect} from "react";
import {getCargoes} from "../../Services/CargoesService";
import GenerateTable from "../ULTable/TableGenerator";
import {useDispatch, useSelector} from "react-redux";
import {setAllCargoes} from "../../redux/Slices/cargoesSlice";

const Cargoes = () => {
    
    const dispatch = useDispatch();
    
    const {cargoesEntities, sort} = useSelector(state => state.cargoesSlice);
    
    useEffect(() => {
        getCargoes().then((res) => {
            const arr = res.data.map(
                v => {return {cargo: v, editing: false}}
            );
            dispatch(setAllCargoes(arr));
        })
    }, [dispatch]);
    
    const tableHeader = ['Name', 'Arrival Address', 'Departure Address', 'Arrival Date', 'Departure Date', 'Status', 'Actions'];
    
    const rowFunctions = [
        (value) => value,
        (value) => value,
        (value) => value,
        (value) => value,
        (value) => value,
        (value) => value ? 'Yes': 'No',
        (value) => value
    ]
    
    if (cargoesEntities !== undefined){
        console.log(cargoesEntities);
        return (
            <GenerateTable headerValues={tableHeader} rowFunctions={rowFunctions} array={cargoesEntities}/>
        )
    }
}

export default Cargoes;