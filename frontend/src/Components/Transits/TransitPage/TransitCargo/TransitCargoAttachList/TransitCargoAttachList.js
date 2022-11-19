import SelectPicker from "../../../../SelectPicker/SelectPicker";
import RelativeModal from "../../../../RelativeModal/RelativeModal";
import {useState} from "react";
import './TransitCargoAttachList.sass'
import ItemList from "./ItemList/ItemList";

const AttachList = ({cargoToAttach, open, setOpen}) => {

    const [attachFilterType, setAttachFilterType] = useState(0);

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