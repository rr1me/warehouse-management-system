import './BlueTable.sass'

import {HiOutlineArrowDown} from "react-icons/hi";

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const BlueTable = ({header, children, gridTemplate, clickable, lightStyle, sort, setSortDispatch, actionRow}) => { //todo BiDotsVerticalRounded HiOutlineArrowsUpDown
    
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
    
    const UpDownArrows = ({index}) => index === Math.abs(sort) ? <HiOutlineArrowDown className={'btIcon' + (isNegative(sort) ? ' inverted' : '')} onClick={() => handleArrowClick(index)}/>
        : (
            <div className='btIconBlock' onClick={() => handleArrowClick(index)}>
                <HiOutlineArrowDown className='btIcon'/>
                <HiOutlineArrowDown className='btIcon inverted positioned'/>
            </div>
        );
    
    return (
        <div className={'blueTable '+getStyle()}>
            <div className={getHeaderStyle()}>
                {header.map((value, index) => {
                    return (
                        <div className={'item '+getStyle()} key={index}>
                            {value}
                            {actionRow && header.length-1 === index ? null : <UpDownArrows index={index}/>}
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