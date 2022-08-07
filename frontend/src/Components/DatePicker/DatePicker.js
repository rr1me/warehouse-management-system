import {useSelector} from "react-redux";
import {memo, useState} from "react";

import './DatePicker.css';
import {DatePickerModule} from "./DatePickerModule";

export const DatePicker = memo(() => {

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
                    <DatePickerModule/>
                </div>
            </>
        )
    };
    
    const handleInputClick = () => {
        setDPState(true);
        console.log(document);
    }
    
    return (
        <div className='dpContainer'>
            {/*<input className='dpInput' name="firstDatePicker" type='datetime-local' readOnly={true} value={inputState} onClick={() => {*/}
            {/*    setDPState(true);*/}
            {/*    console.log(document);*/}
            {/*}}/>*/}
            <div className='dpInput' id='firstDatePicker' onClick={handleInputClick}>
                {inputState}
            </div>
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