import './TransitCargo.sass'
import BlueTable from "../../../BlueTable/BlueTable";
import TransitCargoRow from "./TransitCargoRow/TransitCargoRow";
import {useDispatch} from "react-redux";
import {addEmptyCargoToTransit} from "../../../../redux/Slices/transitSlice";
import Valid from "../../../Valid/Valid";
import {useState} from "react";
import RelativeModal from "../../../RelativeModal/RelativeModal";
import SelectPicker from "../../../SelectPicker/SelectPicker";

const TransitCargo = ({cargo, edit, cargoValid, transitType}) => {
    
    const [cargoToAttachModal, setCargoToAttachModal] = useState(false);
    const dispatch = useDispatch();
    
    const handleAddNewCargoButton = () => {
        if (!transitType)
            dispatch(addEmptyCargoToTransit());
        else 
            setCargoToAttachModal(value => !value);
    }
    
    return (
        <div className='fullRow'>
            <div className='element'>
                <div className='name'>Cargo</div>
                <Valid valid={cargoValid} errorMessage='Some cargo is editing right now'/>
                <div className='trCargoElem'>
                    <div className={'trCargoControls' + (edit ? ' block' : ' def')}>
                        {edit ?
                            <>
                                <button className='btn apply table'>Filter</button>
                                <div>
                                    <button className='btn apply table' onClick={handleAddNewCargoButton}>Add new</button>
                                    <RelativeModal doubleWrap={false} id={'cargoToAttach'} state={cargoToAttachModal} setOpen={setCargoToAttachModal}>
                                        <SelectPicker id={'cargoToAttachSP'} defaultValue={1}>
                                            <div>dd</div>
                                            <div>dd</div>
                                            <div>dd</div>
                                        </SelectPicker>
                                    </RelativeModal>
                                </div>
                            </>
                            : null}
                    </div>
                    <BlueTable header={cargoHeader} gridTemplate='trCargoGridTemplate' clickable={false} lightStyle={true}>
                        {cargo.map((value, index) => {
                            return {element: <TransitCargoRow cargo={value.object} states={value.states} index={index} globalEdit={edit}/> , id: index};
                        })}
                    </BlueTable>
                </div>
            </div>
        </div>
    )
};

export default TransitCargo;

const cargoHeader = [
    'Id',
    'Sticker id',
    'Description',
    'Actions'
];