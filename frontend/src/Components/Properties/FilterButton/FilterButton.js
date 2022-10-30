import BulletList from "../BulletList/BulletList";
import {useEffect, useState} from "react";
import {makeCloseEvent} from "../makeCloseEvent";

const FilterButton = ({sortType, sortList, sortDispatch, id}) => {

    // useEffect(() => {
    //     makeCloseEvent(id, setFilterOpen);
    // });

    const [filterOpen, setFilterOpen] = useState(false);

    const handleFilterClick = e => {
        e.stopPropagation();
        setFilterOpen(value => !value);
    };
    
    return (
        <button onClick={handleFilterClick} className='btn apply-btn tableButton'>
            Filter
            <BulletList id={id} openState={filterOpen} bulletState={sortType} bulletList={sortList} bulletStateDispatch={sortDispatch}/>
        </button>
    )
};

export default FilterButton;