import {memo, useEffect, useState} from "react";

import './DatePicker.css';
import DatePickerBuilder from "./dpModules/DatePickerBuilder";
import {MdEditCalendar} from "react-icons/md";

export const DatePicker = memo(({incomeDate, setDateDispatch, id}) => {
    
    const dateObject = new Date(incomeDate);

    useEffect(() => {
        const closeDP = (e) => {
            if (e.composedPath()[0].id !== id){
                setDPState(false);
            }
        };

        document.body.addEventListener('click', closeDP);

        return () => document.body.removeEventListener('click', closeDP);
    });
    
    const inputElement = document.getElementById(id);

    const [dpState, setDPState] = useState(false)
    
    const handleInputClick = () => {
        setDPState(value => !value);
        console.log(document);
    };
    
    return (
        <div className='dpContainer'>
            <div className='dpInput' id={id} onClick={handleInputClick}>
                {makeDateForInput(dateObject)}
                <MdEditCalendar className='dpInputIcon' id={id}/>
            </div>
            <DatePickerBuilder dateObject={dateObject} setDateDispatch={setDateDispatch} mainElement={inputElement} state={dpState}/>
        </div>
    )
});

const makeDateForInput = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return year+"."+(month < 10 ? "0"+ month : month)+"."+(day < 10 ? "0"+ day : day)+" "+(hours < 10 ? "0"+hours : hours)+":"+(minutes < 10 ? "0"+minutes : minutes);
};