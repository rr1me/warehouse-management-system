import {useDispatch} from "react-redux";
import './BulletList.css';
import RelativeModal from "../../RelativeModal/RelativeModal";

const BulletList = ({openState, bulletState, bulletList, bulletStateDispatch, id}) => {
    
    const dispatch = useDispatch();

    const bulletClick = e => {
        e.stopPropagation();
        const index = Number(e.target.getAttribute('data-action'));
        dispatch(bulletStateDispatch(index));
    };
    
    const list = bulletList.map((value, index) => {
        return (
            <div key={index} onClick={bulletClick} data-action={index} className='bulletRow'>
                <div data-action={index} className={'bullet' + (bulletState === index ? ' bullet_active' : '')}/>
                <div data-action={index} className='bulletText'>{value}</div>
            </div>
        )
    });

    return (
        <RelativeModal state={openState}
                       doubleWrap={true} itemClassname='bulletMenu'
                       id={id}
                       modalStyle={{right: '115px', bottom: '30px', padding: '2px'}}>
            {list}
        </RelativeModal>
    )
    
}

export default BulletList;

// const rows = [
//     'By id',
//     'By name',
//     'By status'
// ]