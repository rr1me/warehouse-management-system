import {useDispatch} from "react-redux";
import './BulletList.sass';

const BulletList = ({openState, bulletState, bulletList, bulletStateDispatch, id}) => {
    
    const dispatch = useDispatch();

    const bulletClick = e => {
        e.stopPropagation();
        const index = Number(e.target.getAttribute('data-action'));
        console.log(index);
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
        <div className='bulletList'>
            {list}
        </div>
    );
    
}

export default BulletList;