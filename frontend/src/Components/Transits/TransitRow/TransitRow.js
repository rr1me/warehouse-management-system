import './TransitRow.css';
import {DatePicker} from "../../DatePicker/DatePicker";
import Label from "../../Label/Label";
import {statusLabels, typeLabels} from "../TransitProps";

const TransitRow = ({current}) => {
    
    return (
        <>
            <div className='transitRowItem'>{current.id}</div>
            <div className='transitRowItem'><Label list={typeLabels} value={current.type}/></div>
            <div className='transitRowItem'><Label list={statusLabels} value={current.status}/></div>
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

// const typeLabels = [
//     {text: 'Acceptance', clr: 'green'},
//     {text: 'Dispatching', clr: 'blue'}
// ];
//
// const statusLabels = [
//     {text: 'Planned', clr: 'blue'},
//     {text: 'Completed', clr: 'green'},
//     {text: 'Failed', clr: 'red'}
// ]