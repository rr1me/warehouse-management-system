import getMonthData from "../Properties/getMonthData";
import './DaysModule.css';

const DaysModule = ({selectProps, dispatch, setDateDispatch, dispatchIndex, overallDate, selectedDate, CURRENT_DATE, time}) => {

    const monthData = getMonthData(overallDate, time);

    const handleDayClick = date => {
        console.log(dispatchIndex);
        dispatch(setDateDispatch({date: date.toJSON(), index: dispatchIndex}));
    };

    const makeDay = (date, index) => {
        let classname = "day";
        let onClick;
        let body;

        if (typeof date === 'number'){
            classname += " aesthetics";
            body = date;
        }else{
            classname += " practice";
            if (date.toDateString() === CURRENT_DATE.toDateString()) classname += " today";
            if (( selectedDate != null && date.toDateString() === selectedDate.toDateString() )
                || ( selectedDate === null && date.toDateString() === CURRENT_DATE.toDateString() ))
                classname += " selected";

            onClick = () => handleDayClick(date);
            body = date.getDate();
        }

        return (
            <td key={index} className={classname} onClick={onClick}>
                {body}
            </td>
        )
    }
    
    return (
        <table>
            <thead>
            <tr>
                {selectProps.weekDayNames.map(name =>
                    <th className={'dayName'+(name === 'Sa' || name === 'Su' ? " weekends" : null)} key={name}>{name}</th>
                )}
            </tr>
            </thead>

            <tbody>
            {monthData.map((week, index) =>
                <tr key={index} className="week">
                    { week.map( (date, index) => {return (makeDay(date, index))} ) }
                </tr>
            )}
            </tbody>
        </table>
    )
};

export default DaysModule;