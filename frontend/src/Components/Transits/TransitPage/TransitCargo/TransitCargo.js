﻿import './TransitCargo.sass'
import BlueTable from "../../../BlueTable/BlueTable";
import TransitCargoRow from "./TransitCargoRow/TransitCargoRow";
import {useDispatch} from "react-redux";
import {
    addEmptyCargoToTransit,
    attachCargoToTransit,
    setTransitPageCargoSort
} from "../../../../redux/Slices/transitSlice";
import {useState} from "react";
import RelativeModal from "../../../RelativeModal/RelativeModal";
import WideLabel, {WideLabelItem} from "../../../WideLabel/WideLabel";
import Error from "../../../Error/Error";
import BulletList from "../../../Properties/BulletList/BulletList";

const TransitCargo = ({cargo, edit, cargoValid, transitType, cargoToAttach, sort}) => {
    const [cargoToAttachModal, setCargoToAttachModal] = useState(false);
    
    const [filterModal, setFilterModal] = useState(false);
    
    const dispatch = useDispatch();
    
    const handleAddNewCargoButton = e => {
        e.stopPropagation();
        if (!transitType)
            dispatch(addEmptyCargoToTransit());
        else 
            setCargoToAttachModal(value => !value);
    };
    
    const handleWideLabelClick = id => {
        dispatch(attachCargoToTransit(id));
    };
    
    const handleFilterButton = e => {
        setFilterModal(value => !value);
        e.stopPropagation();
    };
    
    const filterList = ['by id', 'by stickerId'];
    
    return (
        <div className='fullRow'>
            <div className='element'>
                <div className='name'>Cargo</div>
                <Error state={cargoValid} errorMessage='Some cargo is editing right now'/>
                <div className='trCargoElem'>
                    <div className={'trCargoControls' + (edit ? ' block' : ' def')}>
                        {edit ?
                            <>
                                <div>
                                    <button className='btn apply table' onClick={handleFilterButton}>Filter</button>
                                    <RelativeModal doubleWrap={false} id={'transitCargoFilterModal'} state={filterModal} setOpen={setFilterModal} modalStyle={{padding: '5px 10px'}}>
                                        <BulletList bulletList={filterList} bulletState={sort} bulletStateDispatch={setTransitPageCargoSort}/>
                                    </RelativeModal>
                                </div>
                                <div>
                                    <button className='btn apply table' onClick={handleAddNewCargoButton}>Add new</button>
                                    <RelativeModal doubleWrap={false} id={'cargoToAttach'} state={cargoToAttachModal} setOpen={setCargoToAttachModal} modalStyle={{top: '5px', right: '315px'}}>
                                        <div className='cargoToAttachList'>
                                            {cargoToAttach.map((v, i) => {
                                                return (
                                                    <WideLabel key={i} clickable={true} onClick={() => handleWideLabelClick(v.id)}>
                                                        <WideLabelItem name='id' width='25px'>{v.id}</WideLabelItem>
                                                        <WideLabelItem name='Sticker id' width='50px'>{v.stickerId}</WideLabelItem>
                                                        <WideLabelItem name='Description' width='50px'>{v.description}</WideLabelItem>
                                                    </WideLabel>
                                                )
                                            })}
                                        </div>
                                    </RelativeModal>
                                </div>
                            </>
                            : null}
                    </div>
                    <BlueTable header={cargoHeader} gridTemplate='trCargoGridTemplate' clickable={false} lightStyle={true}>
                        {cargo.map((value, index) => {
                            return {element: <TransitCargoRow cargo={value.object} states={value.states} errors={value.errors} index={index} globalEdit={edit}/> , id: index};
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