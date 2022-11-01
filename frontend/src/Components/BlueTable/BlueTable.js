import './BlueTable.sass'

import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted} from "react-icons/ti";
import {MdArrowForwardIos} from "react-icons/md";
import SelectPicker from "../SelectPicker/SelectPicker";
import {useState} from "react";

const BlueTable = ({header, children, gridTemplate, clickable, lightStyle, sort, setSortDispatch, actionColumn}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(0);
    
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
    
    const getHeaderStyle = () => gridTemplate + ' blueTableHeader ' + getStyle();
    
    const handleArrowClick = index => dispatch(setSortDispatch(index === Math.abs(sort) && !isNegative(sort) ? -index : index));
    
    const SortArrows = ({index, length}) => {
        if (actionColumn && length === index) return null;
        
        if (index === Math.abs(sort)){
            return isNegative(sort) ? <TiArrowSortedUp className='btIcon' onClick={() => handleArrowClick(index)}/> : <TiArrowSortedDown className='btIcon' onClick={() => handleArrowClick(index)}/>
        }
        return <TiArrowUnsorted className='btIcon' onClick={() => handleArrowClick(index)}/>
    }
    
    const rowsPerPageToActualValue = () => {
        if (rowsPerPage === 0) return 10;
        if (rowsPerPage === 1) return 25;
        if (rowsPerPage === 2) return 50;
    }
    
    const tableBody = () => {
        if (!children) return {info: ''};
        
        const firstElement = page * rowsPerPageToActualValue();
        const lastElement = ((page+1) * rowsPerPageToActualValue());
        
        const body = Array.from(children)
        const slice = body.slice(firstElement, lastElement)
        return {info: (firstElement+1) + '-' + (lastElement >= children.length ? children.length : lastElement) + ' of ' + children.length, array: slice};
    }
    
    const setRowPerPageForSelectPicker = rpp => {
        setRowsPerPage(rpp);
        
        const lastPage = Math.floor(children.length / rowsPerPageToActualValue());
        if (page > 0 && page >= lastPage) setPage(lastPage-1);
    };
    
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
            {children ? tableBody().array.map((value, index) => {
                return (
                    <div className={getRowStyle(index % 2)} key={index} onClick={clickable ? () => handleRowClick(value.id) : null}>
                        {value.element}
                    </div>
                )
            }) : null}
            <div className='blFooter'>
                <div className='rowsPerPage'>
                    Rows per page:
                    <SelectPicker defaultValue={rowsPerPage} id='blfSelectPicker' upwardModal={true} customStyle='blfSelectPicker' customControls={<MdArrowForwardIos className='ninetyDegArrow'/>} 
                                  setValue={setRowPerPageForSelectPicker}>
                        <div>10</div>
                        <div>25</div>
                        <div>50</div>
                    </SelectPicker>
                </div>
                
                <div>
                    {tableBody().info}
                </div>
                
                <div className='blfArrows'>
                    <MdArrowForwardIos className='blfIcon reversed' onClick={() => setPage(value => value !== 0 ? value-1 : value)}/>
                    <MdArrowForwardIos className='blfIcon' onClick={() => setPage(value => Math.floor(children.length / rowsPerPageToActualValue()) !== value ? value+1 : value )}/>
                </div>
            </div>
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