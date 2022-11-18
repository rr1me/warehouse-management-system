import {actions} from "../../../../../../redux/Slices/transitSlice/transitSlice";
import {useDispatch} from "react-redux";
import './ItemList.sass';

const {attachCargo} = actions;

const ItemList = ({list}) => {

    const dispatch = useDispatch();



    return (
        <div className='attachItemList'>
            {list.map((v, i) => <AttachRow key={i} v={v}/>)}
        </div>
    )
};

const AttachRow = ({v}) =>
    <div className='attachRow'>
        <div className='attachElement'>
            <div className='tcal-item tcal-name'>ID</div>
            <div className='tcal-item tcal-expression'>{v.id}</div>
        </div>
        <div className='attachElement'>
            <div className='tcal-item tcal-name'>Sticker ID</div>
            <div className='tcal-item tcal-expression'>{v.stickerId}</div>
        </div>
        <div className='attachElement'>
            <div className='tcal-item tcal-name'>Description</div>
            <div className='tcal-item tcal-expression'>{v.description}</div>
        </div>
    </div>

export default ItemList;