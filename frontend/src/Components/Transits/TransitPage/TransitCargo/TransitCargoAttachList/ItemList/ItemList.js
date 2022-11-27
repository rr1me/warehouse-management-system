import {actions} from "../../../../../../redux/Slices/transitSlice/transitSlice";
import {useDispatch} from "react-redux";
import './ItemList.sass';
import {memo} from "react";

const {attachCargo} = actions;

const ItemList = memo(({list}) => {

    const dispatch = useDispatch();

    const handleRowClick = id => dispatch(attachCargo(id));



    return (
        <div className='attachItemList'>
            {!list.length ? 'No cargo to attach'
                : list.map((v, i) => <AttachRow key={i} v={v} handleRowClick={handleRowClick}/>)
            }
        </div>
    )
});

const AttachRow = ({v, handleRowClick}) => {

    const onClick = () => handleRowClick(v.id);

    return (
        <>
            <div onClick={onClick} className='tcal-item tcal-name'>ID</div>
            <div onClick={onClick} className='tcal-item tcal-expression'>{v.id}</div>
            <div onClick={onClick} className='tcal-item tcal-name'>Sticker ID</div>
            <div onClick={onClick} className='tcal-item tcal-expression'>{v.stickerId}</div>
            <div onClick={onClick} className='tcal-item tcal-name'>Description</div>
            <div onClick={onClick} className='tcal-item tcal-expression'>{v.description ? v.description : 'No desc.'}</div>
        </>
    )
}

export default ItemList;