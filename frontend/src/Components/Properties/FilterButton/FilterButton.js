import BulletList from "../BulletList/BulletList";
import {useEffect, useState} from "react";

const FilterButton = ({sortType, sortList, sortDispatch, id}) => {

    useEffect(() => {
        const closeDp = e => {
            if (e.composedPath()[0].id !== id){
                setFilterOpen(false);
            }
        }
        document.body.addEventListener('click', closeDp);
        return () => document.body.removeEventListener('click', closeDp);
    });

    const [filterOpen, setFilterOpen] = useState(false);

    const handleFilterClick = e => {
        e.stopPropagation();
        setFilterOpen(value => !value);
    };
    
    return (
        <button onClick={handleFilterClick} className='btn apply-btn'>
            Filter
            <BulletList id={id} openState={filterOpen} bulletState={sortType} bulletList={sortList} bulletStateDispatch={sortDispatch}/>
        </button>
    )
};

export default FilterButton;