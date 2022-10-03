import getMonthData from "../Properties/getMonthData";
import './DaysModule.sass';

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
            <div key={index} className={classname} onClick={onClick}>
                {body}
            </div>
        )
    }
    
    return (
        <div className='days'>
            <div className='dayGrid'>
                {selectProps.weekDayNames.map(name =>
                    <div className={'dayName'+(name === 'Sa' || name === 'Su' ? " weekends" : '')} key={name}>{name}</div>
                )}
            </div>

            <div>
                {monthData.map((week, index) =>
                    <div key={index} className="dayGrid week">
                        { week.map( (date, index) => {return (makeDay(date, index))} ) }
                    </div>
                )}
            </div>
        </div>
    )
};

export default DaysModule;