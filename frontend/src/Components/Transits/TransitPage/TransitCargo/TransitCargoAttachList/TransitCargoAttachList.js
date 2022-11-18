import SelectPicker from "../../../../SelectPicker/SelectPicker";
import RelativeModal from "../../../../RelativeModal/RelativeModal";
import {useState} from "react";
import WideLabel, {WideLabelItem} from "../../../../WideLabel/WideLabel";
import {actions} from "../../../../../redux/Slices/transitSlice/transitSlice";
import {useDispatch} from "react-redux";
import './TransitCargoAttachList.sass'
import ItemList from "./ItemList/ItemList";

const AttachList = ({cargoToAttach, open, setOpen}) => {

    const [attachFilterType, setAttachFilterType] = useState(0);

    // const handleWideLabelClick = id => dispatch(attachCargo(id));

    // const attachList = cargoToAttach.length > 0 ? cargoToAttach.map((v, i) => {
    //     return (
            // <WideLabel key={i} clickable={true} onClick={() => handleWideLabelClick(v.id)}>
            //     <WideLabelItem name='id' width='25px'>{v.id}</WideLabelItem>
            //     <WideLabelItem name='Sticker id' width='maxContent'>{v.stickerId}</WideLabelItem>
            //     <WideLabelItem name='Description' width='50px'>{v.description ? v.description : 'No'}</WideLabelItem>
            // </WideLabel>
            // <ItemList/>
    //     )
    // }) : 'No cargo to attach';

    return (
        <RelativeModal id={'cargoToAttach'} state={open} setOpen={setOpen} modalStyle={{top: 10, maxHeight: '150px'}}>
            <div className='cargoToAttachList' onClick={e=>e.stopPropagation()}>
                <div className='attachFilter'>
                    <input type='text' placeholder='Search' aria-label='Search' className='attachSearch'/>
                    <SelectPicker id='attachSearchType' defaultValue={attachFilterType} setValue={setAttachFilterType} customStyle='attachSearchTypeSelect' customControls='none'>
                        <div>ID</div>
                        <div>Sticker ID</div>
                        <div>Description</div>
                    </SelectPicker>
                </div>
                <ItemList list={cargoToAttach}/>
            </div>
        </RelativeModal>
    )
};

export default AttachList;