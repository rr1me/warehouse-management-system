import './TransitRow.sass';
import Label from "../../Label/Label";
import {additionalTasks, statusLabels, typeLabels} from "../TransitProps";
import {makeDateForInput} from "../../DatePicker/DatePicker";

const TransitRow = ({current}) => {
    
    return (
        <>
            <div className='transitRowItem'>{current.id}</div>
            <div className='transitRowItem'><Label list={typeLabels} value={current.type}/></div>
            <div className='transitRowItem'><Label list={statusLabels} value={current.status}/></div>
            <div className='transitRowItem'>{current.client}</div>
            <div className='transitRowItem dateTime'>
                {makeDateForInput(new Date(current.date))}
            </div>
            <div className='transitRowItem'>{additionalTasks[current.additionalTasks]}</div>
            <div className='transitRowItem'>{current.commentary ? current.commentary : 'No'}</div>
        </>
    )
};

export default TransitRow;