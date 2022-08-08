import {useSelector} from "react-redux";
import {memo, useEffect, useState} from "react";

import './DatePicker.css';
import {DatePickerModule} from "./dpModules/DatePickerModule";
import {MdEditCalendar} from "react-icons/md";

export const DatePicker = memo(() => {

    useEffect(() => {
        const closeDP = (e) => {
            if (e.composedPath()[0].id !== 'datePicker'){
                setDPState(false);
                console.log("?")
            }
        };

        document.body.addEventListener('click', closeDP);

        return () => document.body.removeEventListener('click', closeDP);
    }, []);

    const {inputState} = useSelector(state => state.datePickerSlice);
    
    const inputElement = document.getElementById("datePicker");

    const [dpState, setDPState] = useState(false)

    const stopPropagationDiv = () => {
        return(
            <div onClick={e => e.stopPropagation()}>
                <DatePickerModule coords={inputElement.getBoundingClientRect()}/>
            </div>
        )
    };
    
    const handleInputClick = () => {
        setDPState(value => !value);
        console.log(document);
    }
    
    return (
        <div className='dpContainer'>
            <div className='dpInput' id='datePicker' onClick={handleInputClick}>
                {inputState}
                <MdEditCalendar className='dpInputIcon' id='datePicker'/>
            </div>
            {dpState ? stopPropagationDiv() : null}
        </div>
    )
});