import {DatePicker} from "./DatePicker";
import {useSelector} from "react-redux";
import {memo, useEffect, useState} from "react";

import './DPContainer.css';

export const DPContainer = memo(() => {

    const {inputState} = useSelector(state => state.datePickerSlice);
    
    // useEffect(() => {
    //     const closeDP = (e) => {
    //         if (e.composedPath()[0].name !== 'firstDatePicker'){
    //             setDPState(false);
    //         }
    //     };
    //    
    //     document.body.addEventListener('click', closeDP);
    //    
    //     return () => document.body.removeEventListener('click', closeDP);
    // }, []);

    const [dpState, setDPState] = useState(false)

    const stopPropagationDiv = () => {
        return(
            <>
                <div className='special' onClick={() => setDPState(false)}></div>
                <div onClick={e => e.stopPropagation()}>
                    {/*<DatePicker/>*/}
                    <div className='menu'></div>
                </div>
            </>
        )
    };
    
    return (
        <div className='dpContainer'>
            <input name="firstDatePicker" type='date' readOnly={true} value={inputState} onClick={() => {
                setDPState(true);
                console.log(document);
            }}/>
            {dpState ? stopPropagationDiv() : null}
        </div>
    )
});

// const makeDateForInput = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth()+1;
//     const day = date.getDate();
//
//     return year+"-"+(month < 10 ? "0"+ month : month)+"-"+(day < 10 ? "0"+ day : day);
// };