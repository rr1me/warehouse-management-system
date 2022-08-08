﻿import './DatePickerBuilder.css'
import {useDispatch} from "react-redux";
import SelectorsModule from "./SelectorsModule/SelectorsModule";
import DaysModule from "./DaysModule/DaysModule";
import {useState} from "react";
import BottomModule from "./BottomModule/BottomModule";

const DatePickerBuilder = ({dateObject, setDateDispatch, mainElement, state}) => {
    
    const coords = mainElement ? mainElement.getBoundingClientRect() : null;
    
    const dispatch = useDispatch();
    
    const [overallDate, setOverallDate] = useState({
        year: CURRENT_DATE.getFullYear(),
        month: CURRENT_DATE.getMonth()
    });

    if (state){
        return (
            <div className="datepicker" style={{left: coords.left, top: coords.top+coords.height+5}} onClick={e=>e.stopPropagation()}>
                <SelectorsModule overallDate={overallDate} setOverallDate={setOverallDate} selectProps={selectProps}/>
                <DaysModule dispatch={dispatch} selectProps={selectProps} overallDate={overallDate} CURRENT_DATE={CURRENT_DATE} selectedDate={dateObject} 
                            setDateDispatch={setDateDispatch} time={{hours: dateObject.getHours(), minutes: dateObject.getMinutes()}}/>
                <hr className='dpSeparator'/>
                <BottomModule dispatch={dispatch} dateObject={dateObject} setDateDispatch={setDateDispatch}/>
            </div>
        )
    }
};

export default DatePickerBuilder;

const CURRENT_DATE = new Date();
const YEAR_RANGE = 2;

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
