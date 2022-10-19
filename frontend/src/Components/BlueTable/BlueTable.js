import './BlueTable.sass'

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted} from "react-icons/ti";

const BlueTable = ({header, children, gridTemplate, clickable, lightStyle, sort, setSortDispatch, actionColumn}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const handleRowClick = id => {
        navigate('/transits/'+id);
    }
    
    const getStyle = () => (lightStyle ? 'light' : 'hard')
    
    const getRowStyle = isOdd => {
        let style = gridTemplate + ' row ' + getStyle();
        if (clickable) style += ' clickable';
        if (!lightStyle && isOdd) style += ' odd'
        return style;
    };
    
    const getHeaderStyle = () => gridTemplate + ' trCargoHeader ' + getStyle();
    
    const handleArrowClick = index => dispatch(setSortDispatch(index === Math.abs(sort) && !isNegative(sort) ? -index : index));
    
    const SortArrows = ({index, length}) => {
        if (actionColumn && length === index) return null;
        
        if (index === Math.abs(sort)){
            return isNegative(sort) ? <TiArrowSortedUp className='btIcon' onClick={() => handleArrowClick(index)}/> : <TiArrowSortedDown className='btIcon' onClick={() => handleArrowClick(index)}/>
        }
        return <TiArrowUnsorted className='btIcon' onClick={() => handleArrowClick(index)}/>
    }
    
    return (
        <div className={'blueTable '+getStyle()}>
            <div className={getHeaderStyle()}>
                {header.map((value, index) => {
                    return (
                        <div className={'item '+getStyle()} key={index}>
                            {value}
                            <SortArrows index={index} length={header.length-1}/>
                        </div>
                    )
                })}
            </div>
            {children ? children.map((value, index) => {
                return (
                    <div className={getRowStyle(index % 2)} key={index} onClick={clickable ? () => handleRowClick(value.id) : null}>
                        {value.element}
                    </div>
                )
            }) : null}
        </div>
    )
};

export default BlueTable;

export const isNegative = number => {
    if (number === 0){
        return Object.is(number, -0);
    }else{
        return number < 0
    }
}