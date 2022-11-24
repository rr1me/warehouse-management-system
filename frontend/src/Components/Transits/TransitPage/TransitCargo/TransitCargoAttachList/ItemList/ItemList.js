import {actions} from "../../../../../../redux/Slices/transitSlice/transitSlice";
import {useDispatch} from "react-redux";
import './ItemList.sass';
import {memo} from "react";

const {attachCargo} = actions;

const ItemList = memo(({list}) => {

    const dispatch = useDispatch();



    return (
        <div className='attachItemList'>
            {list.map((v, i) => <AttachRow key={i} v={v}/>)}
        </div>
    )
});

const AttachRow = ({v}) =>
    <>
        <div className='tcal-item tcal-name'>ID</div>
        <div className='tcal-item tcal-expression'>{v.id}</div>
        <div className='tcal-item tcal-name'>Sticker ID</div>
        <div className='tcal-item tcal-expression'>{v.stickerId}</div>
        <div className='tcal-item tcal-name'>Description</div>
        <div className='tcal-item tcal-expression'>{v.description}</div>
    </>

export default ItemList;