import {sortDrivers} from "../../../redux/Slices/driversSlice";
import {useDispatch} from "react-redux";
import './BulletList.css';
import RelativeModal from "../../RelativeModal/RelativeModal";

const BulletList = ({filterOpen, sort}) => {
    
    const dispatch = useDispatch();

    const bulletClick = e => {
        e.stopPropagation();
        const index = Number(e.target.getAttribute('data-action'));
        dispatch(sortDrivers(index));
    };
    
    const list = rows.map((value, index) => {
        return (
            <div key={index} onClick={bulletClick} data-action={index} className='bulletRow'>
                <div data-action={index} className={'bullet' + (sort === index ? ' bullet_active' : '')}/>
                <div data-action={index} className='bulletText'>{value}</div>
            </div>
        )
    });

    return (
        <RelativeModal state={filterOpen}
                       doubleWrap={true} itemClassname='bulletMenu'
                       id='filterModal'
                       modalStyle={{right: '115px', bottom: '30px', padding: '2px'}}>
            {list}
        </RelativeModal>
    )
    
}

export default BulletList;

const rows = [
    'By id',
    'By name',
    'By status'
]