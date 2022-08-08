import {useSelector} from "react-redux";
import {memo, useEffect, useState} from "react";

import './DatePicker.css';
import DatePickerBuilder from "./dpModules/DatePickerBuilder";
import {MdEditCalendar} from "react-icons/md";

export const DatePicker = memo(({incomeDate, setDateDispatch, id}) => {
    
    const dateObject = new Date(incomeDate);

    useEffect(() => {
        console.log("?ds");
        const closeDP = (e) => {
            if (e.composedPath()[0].id !== id){
                setDPState(false);
                console.log("?")
            }
        };

        document.body.addEventListener('click', closeDP);

        return () => document.body.removeEventListener('click', closeDP);
    });

    // const {inputState} = useSelector(state => state.datePickerSlice);
    
    // const inputState = 
    
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

    return year+"."+(month < 10 ? "0"+ month : month)+"."+(day < 10 ? "0"+ day : day)+" 00:00";
};