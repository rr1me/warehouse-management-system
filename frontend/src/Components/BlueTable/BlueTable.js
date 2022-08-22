import './BlueTable.css';
import {useNavigate} from "react-router-dom";

const BlueTable = ({header, children, gridTemplate, clickable}) => {
    
    const navigate = useNavigate()
    
    const handleRowClick = id => {
        navigate('/transits/'+id);
    } 
    
    return (
        <div className='blueTable'>
            <div className={'bt_header ' + gridTemplate}>
                {header.map((value, index) => {
                    return (
                        <div className='bt_headerItem' key={index}>
                            {value}
                        </div>
                    )
                })}
            </div>
            {children.map((value, index) => {
                return (
                    <div className={(clickable ? 'bt_clickable ' : '' )+'bt_row ' + gridTemplate + (index % 2 ? ' bt_odd' : '')} key={index} onClick={clickable ? () => handleRowClick(value.id) : null}>
                        {value.element}
                    </div>
                )
            })}
        </div>
    )
};

export default BlueTable;