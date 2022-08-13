import './TransitRow.css';
import {useNavigate} from "react-router-dom";
import {DatePicker} from "../../DatePicker/DatePicker";

const TransitRow = ({current, isOdd, id}) => {

    const navigate = useNavigate();
    
    const handleRowClick = () => {
        console.log(current);
        navigate('/transits/'+id);
    }
    
    return (
        <div className={'transitRow'+(isOdd ? ' odd' : '')} onClick={handleRowClick}>
            <div className='transitRowItem'>{current.id}</div>
            <div className='transitRowItem'>{current.transitType}</div>
            <div className='transitRowItem'>{current.transitStatus}</div>
            <div className='transitRowItem'>
                {current.client}
            </div>
            <div className='transitRowItem'>
                <DatePicker editState={false} incomeDate={current.date}/>
            </div>
            <div className='transitRowItem'>{current.additionalTasks}</div>
            <div className='transitRowItem'>{current.commentary ? current.commentary : 'No'}</div>
        </div>
    )
};

export default TransitRow;