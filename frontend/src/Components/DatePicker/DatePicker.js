import {memo, useState} from "react";

import './DatePicker.sass';
import DatePickerBuilder from "./dpModules/DatePickerBuilder";
import {MdEditCalendar} from "react-icons/md";

export const DatePicker = memo(({incomeDate, setDateDispatch, dispatchIndex, id, editState}) => {
    
    const dateObject = new Date(incomeDate);

    const [dpState, setDPState] = useState(false)
    
    const handleInputClick = e => {
        e.stopPropagation();
        if (editState)
            setDPState(value => !value);
    };
    
    return (
        <div className='dpContainer'>
            <div className={'dpInput'+(editState ? '' : ' readonly')} id={id} onClick={handleInputClick}>
                {makeDateForInput(dateObject)}
                {editState ? <MdEditCalendar className='dpInputIcon' id={id}/> : null}
            </div>
            <DatePickerBuilder id={id} dateObject={dateObject} setDateDispatch={setDateDispatch} dispatchIndex={dispatchIndex} state={dpState} setState={setDPState}/>
        </div>
    )
});

export const makeDateForInput = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return year+"."+(month < 10 ? "0"+ month : month)+"."+(day < 10 ? "0"+ day : day)+" "+(hours < 10 ? "0"+hours : hours)+":"+(minutes < 10 ? "0"+minutes : minutes);
};