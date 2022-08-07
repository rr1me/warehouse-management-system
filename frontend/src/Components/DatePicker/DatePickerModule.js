import './DatePickerModule.css'
import {useState} from "react";

import {getMonthData} from './PickerProps';
import {useDispatch, useSelector} from "react-redux";
import {overallDateReducer, selectedDateReducer} from "../../redux/Slices/datePickerSlice";

const CURRENT_DATE = new Date();
const YEAR_RANGE = 2;

export const DatePickerModule = () => {
    
    const dispatch = useDispatch();

    const {overallDate, selectedDate} = useSelector(state => {
        const dates = state.datePickerSlice;
        return {
            overallDate: new Date(dates.overallDate),
            selectedDate: dates.selectedDate ? new Date(dates.selectedDate) : null
        };
    });
    
    const getYears = () => {
        return new Array(YEAR_RANGE + 3).fill(0).map((value, index) => {
            return CURRENT_DATE.getFullYear() - YEAR_RANGE + index;
        });
    };

    const selectProps = {
        years: getYears(),
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekDayNames: ['Mo', 'Tu', 'We', 'Th' , 'Fr', 'Sa', 'Su']
    };

    const handleMonthButtonClick = (operator) => {
        const month = overallDate.getMonth() + (operator ? 1 : -1);
        const year = overallDate.getFullYear();
        
        const yearDistinction = year - CURRENT_DATE.getFullYear();
        
        if( !( (yearDistinction === 2 && month === 12)
            || (yearDistinction === -2 && month === -1) ) ){
            const date = new Date(year, month);

            setOverallDate(dispatch, date);
            setSelectState({year: date.getFullYear(), month: date.getMonth()});
        }
    };
    
    const handleSelectChange = e => {
        const value = Number(e.target.value);
        const month = (value < 12 ? value : selectState.month);
        const year = (value > 11 ? value : selectState.year);
        
        setOverallDate(dispatch, new Date(year, month));
        setSelectState({year: year, month: month});
    };
    
    const handleDayClick = date => {
        setSelectedDate(dispatch, date);
    };
    
    const [selectState, setSelectState] = useState({
        month: CURRENT_DATE.getMonth(),
        year: CURRENT_DATE.getFullYear()
    });

    const monthData = getMonthData(selectState.year, selectState.month);

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
        <div className="datepicker">
            <header>
                <button className='dpBtn' onClick={() => handleMonthButtonClick(false)}>{'<'}</button>
                
                <select className='dpSelect' onChange={(e) => {
                    handleSelectChange(e);
                }} value={selectState.month}>
                    {selectProps.monthNames.map((name, index) =>
                        <option key={name} value={index}>{name}</option>
                    )}
                </select>
                
                <select className='dpSelect' onChange={(e) => {
                    handleSelectChange(e);
                }} value={selectState.year}>
                    {selectProps.years.map(year =>
                        <option key={year} value={year}>{year}</option>
                    )}
                </select>
                
                <button className='dpBtn' onClick={() => handleMonthButtonClick(true)}>{'>'}</button>
            </header>
            
            <table>
                <thead>
                    <tr>
                        {selectProps.weekDayNames.map(name =>
                            <th className={name === 'Sa' || name === 'Su' ? "weekends" : null} key={name}>{name}</th>
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
        </div>
    )
};

const {setOverallDate, setSelectedDate} = {
    setOverallDate: (dispatch, date) => {
        const ticks = getTicks(date);
        dispatch(overallDateReducer(ticks));
    },
    setSelectedDate: (dispatch, date) => {
        const ticks = getTicks(date);
        dispatch(selectedDateReducer(ticks));
    }
}

const getTicks = date => {
    return date.getTime();
}
