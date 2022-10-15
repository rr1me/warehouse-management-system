import './BlueTable.sass'

import {HiOutlineArrowDown} from "react-icons/hi";

import {useNavigate} from "react-router-dom";

const BlueTable = ({header, children, gridTemplate, clickable, lightStyle, sort, setSortDispatch}) => { //todo BiDotsVerticalRounded HiOutlineArrowsUpDown
    
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
    
    const UpDownArrows = () => {
        return (
            <div className='btIconBlock'>
                <HiOutlineArrowDown className='btIcon'/>
                <HiOutlineArrowDown className='btIcon inverted'/>
            </div>
        )
    }
    
    return (
        <div className={'blueTable '+getStyle()}>
            <div className={getHeaderStyle()}>
                {header.map((value, index) => {
                    return (
                        <div className={'item '+getStyle()} key={index}>
                            {value}
                            {/*<HiOutlineArrowDown className='btIcon'/>*/}
                            <UpDownArrows/>
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