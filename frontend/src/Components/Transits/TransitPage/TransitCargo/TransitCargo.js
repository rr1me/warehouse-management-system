import './TransitCargo.sass'
import BlueTable from "../../../BlueTable/BlueTable";
import TransitCargoRow from "./TransitCargoRow/TransitCargoRow";
import {useDispatch} from "react-redux";
import {memo, useState} from "react";
import Error from "../../../Error/Error";
import {actions} from "../../../../redux/Slices/transitSlice/transitSlice";
import TransitCargoAttachList from "./TransitCargoAttachList/TransitCargoAttachList";

const {addEmptyCargo, attachCargo, setCargoSort} = actions;

const TransitCargo = memo(({cargo, edit, cargoValid, transitType, cargoToAttach, sort}) => {
    const [cargoToAttachModal, setCargoToAttachModal] = useState(false);
    
    const dispatch = useDispatch();

    const handleAddNewCargoButton = e => {
        e.stopPropagation();
        if (!transitType)
            dispatch(addEmptyCargo());
        else 
            setCargoToAttachModal(value => !value);
    };
    
    return (
        <div className='fullRow'>
            <div className='element'>
                <div className='name'>Cargo</div>
                <Error state={cargoValid} errorMessage='Some cargo is editing right now'/>
                <div className='trCargoElem'>
                    <div className={'trCargoControls' + (edit ? ' block' : ' def')}>
                        {edit ?
                            <>
                                <button className='btn apply table' onClick={handleAddNewCargoButton}>Add new</button>
                                <TransitCargoAttachList cargoToAttach={cargoToAttach} open={cargoToAttachModal} setOpen={setCargoToAttachModal}/>
                            </>
                            : null}
                    </div>
                    <BlueTable header={cargoHeader} gridTemplate='trCargoGridTemplate' clickable={false} lightStyle={true} sort={sort} setSortDispatch={setCargoSort} actionColumn={true}>
                        {cargo.map((value, index) => {
                            return {element: <TransitCargoRow cargo={value.object} states={value.states} errors={value.errors} index={index} globalEdit={edit}/> , id: index};
                        })}
                    </BlueTable>
                </div>
            </div>
        </div>
    )
});

export default TransitCargo;

const cargoHeader = [
    'Id',
    'Sticker id',
    'Description',
    'Actions'
];