import './TransitRow.css';
import {DatePicker} from "../../DatePicker/DatePicker";

const TransitRow = ({current}) => {
    
    return (
        <>
            <div className='transitRowItem'>{current.id}</div>
            <div className='transitRowItem'>{current.transitType}</div>
            <div className='transitRowItem'>{current.transitStatus}</div>
            <div className='transitRowItem'>{current.client}</div>
            <div className='transitRowItem'>
                <DatePicker editState={false} incomeDate={current.date}/>
            </div>
            <div className='transitRowItem'>{current.additionalTasks}</div>
            <div className='transitRowItem'>{current.commentary ? current.commentary : 'No'}</div>
        </>
    )
};

export default TransitRow;