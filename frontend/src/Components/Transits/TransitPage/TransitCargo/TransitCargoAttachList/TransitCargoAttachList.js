import SelectPicker from "../../../../SelectPicker/SelectPicker";
import RelativeModal from "../../../../RelativeModal/RelativeModal";
import {useState} from "react";
import './TransitCargoAttachList.sass'
import ItemList from "./ItemList/ItemList";

const AttachList = ({cargoToAttach, open, setOpen}) => {

    const [search, setSearch] = useState('');
    const [attachFilterType, setAttachFilterType] = useState(0);

    const handleFilterInput = e => setSearch(e.target.value)

    const stopPropagationClick = e => e.stopPropagation();

    return (
        <RelativeModal id={'cargoToAttach'} state={open} setOpen={setOpen} modalStyle={{top: 10, maxHeight: '242px'}} elemIndex={9}>
            <div className='cargoToAttachList'>
                <div className='attachFilter'>
                    <input onClick={stopPropagationClick} value={search} onChange={handleFilterInput} placeholder='Search' aria-label='Search' className='attachSearch'/>
                    <SelectPicker id='attachSearchType' defaultValue={attachFilterType} setValue={setAttachFilterType} customStyle='attachSearchTypeSelect' customControls='none'>
                        {/*<div>ID</div>*/}
                        {/*<div>Sticker ID</div>*/}
                        {/*<div>Description</div>*/}
                        {filterTypes.map((v, i) => <div>{v[0]}</div>)}
                    </SelectPicker>
                </div>
                <ItemList list={cargoToAttach} search={search} filterType={filterTypes[attachFilterType][1]}/>
            </div>
        </RelativeModal>
    )
};

const filterTypes = [
    ['ID', 'id'],
    ['Sticker ID', 'stickerId'],
    ['Description', 'description']
]

export default AttachList;