import {memo, useEffect, useRef, useState} from "react";

// import './DatePicker.css';
import './DatePicker.sass';
import DatePickerBuilder from "./dpModules/DatePickerBuilder";
import {MdEditCalendar} from "react-icons/md";
import {makeCloseEvent} from "../Properties/makeCloseEvent";

export const DatePicker = memo(({incomeDate, setDateDispatch, dispatchIndex, id, editState}) => {
    
    const dateObject = new Date(incomeDate);

    useEffect(() => {
        makeCloseEvent(id, setDPState);
    });
    
    const inputElement = useRef();

    const [dpState, setDPState] = useState(false)
    
    const handleInputClick = () => {
        if (editState)
            setDPState(value => !value);
    };
    
    return (
        <div className='dpContainer'>
            <div className={'dpInput'+(editState ? '' : ' noEdit')} id={id} onClick={handleInputClick} ref={inputElement}>
                {makeDateForInput(dateObject)}
                {/*{editState ? <MdEditCalendar className='dpInputIcon' id={id}/> : null}*/}
            </div>
            <DatePickerBuilder dateObject={dateObject} setDateDispatch={setDateDispatch} dispatchIndex={dispatchIndex} mainElement={inputElement} state={dpState}/>
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