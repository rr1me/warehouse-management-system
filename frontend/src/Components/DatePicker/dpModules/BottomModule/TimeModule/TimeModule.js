import './TimeModule.css';

const TimeModule = ({dispatch, dateObject, setDateDispatch, dispatchIndex}) => {

    const handleHoursInput = e => {
        let value = e.target.value;
        
        if (/\d/.test(value.slice(-1)) || value === ''){
            if (value < 0 || value === '')
                value = 0;
            else if(value > 23)
                value = 23
            console.log(dateObject.setHours(value));
            dateObject.setHours(value)
            dispatch(setDateDispatch({index: dispatchIndex, date: dateObject.toJSON()}));
        }
    }
    
    const handleMinutesInput = e => {
        let value = e.target.value;

        if (/\d/.test(value.slice(-1)) || value === ''){
            if (value < 0 || value === '')
                value = 0;
            else if(value > 59)
                value = 59;
            dateObject.setMinutes(value);
            dispatch(setDateDispatch({index: dispatchIndex, date: dateObject.toJSON()}));
        }
    };
    
    return (
        <div className='dpTime'>
            <input value={dateObject.getHours()} onInput={handleHoursInput}/>:<input value={dateObject.getMinutes()} onInput={handleMinutesInput}/>
        </div>
    )
};

export default TimeModule;