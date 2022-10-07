import getMonthData from "../Properties/getMonthData";
import './DaysModule.sass';

const DaysModule = ({selectProps, dispatch, setDateDispatch, dispatchIndex, overallDate, selectedDate, CURRENT_DATE, time}) => {
    const monthData = getMonthData(overallDate, time);

    const handleDayClick = e => {
        const date = e.target.getAttribute('data-date');
        dispatch(setDateDispatch({date: date, index: dispatchIndex}));
    };

    const makeDay = (date, index) => {
        let classname = "day";
        let onClick;
        let body;
        let data_date;

        if (typeof date === 'number'){
            classname += " aesthetics";
            body = date;
        }else{
            classname += " practice";
            if (date.toDateString() === CURRENT_DATE.toDateString()) classname += " today";
            if (( selectedDate != null && date.toDateString() === selectedDate.toDateString() )
                || ( selectedDate === null && date.toDateString() === CURRENT_DATE.toDateString() ))
                classname += " selected";

            onClick = handleDayClick;
            body = date.getDate();
            data_date = date.toJSON();
        }
        
        return (
            <div key={index} className={classname} onClick={onClick} data-date={data_date}>
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