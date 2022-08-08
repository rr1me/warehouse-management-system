import './TimeModule.css';

const TimeModule = ({dispatch, dateObject, setDateDispatch}) => {

    const handleHoursInput = e => {
        let value = e.target.value;
        
        if (/\d/.test(value.slice(-1)) || value === ''){
            if (value < 0 || value === '')
                value = 0;
            else if(value > 23)
                value = 23
            
            dispatch(setDateDispatch(dateObject.setHours(value)));
        }
    }
    
    const handleMinutesInput = e => {
        let value = e.target.value;

        if (/\d/.test(value.slice(-1)) || value === ''){
            if (value < 0 || value === '')
                value = 0;
            else if(value > 59)
                value = 59;
            
            dispatch(setDateDispatch(dateObject.setMinutes(value)));
        }
    };
    
    return (
        <div className='dpTime'>
            <input value={dateObject.getHours()} onInput={handleHoursInput}/>:<input value={dateObject.getMinutes()} onInput={handleMinutesInput}/>
        </div>
    )
};

export default TimeModule;