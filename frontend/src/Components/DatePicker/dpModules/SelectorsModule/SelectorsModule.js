import './SelectorsModule.css';
import {overallDateReducer} from "../../../../redux/Slices/datePickerSlice";

const CURRENT_DATE = new Date();

const SelectorsModule = ({dispatch, overallDate, selectProps}) => {

    const handleMonthButtonClick = (operator) => {
        const month = overallDate.getMonth() + (operator ? 1 : -1);
        const year = overallDate.getFullYear();

        const yearDistinction = year - CURRENT_DATE.getFullYear();

        if( !( (yearDistinction === 2 && month === 12)
            || (yearDistinction === -2 && month === -1) ) ){
            dispatch(overallDateReducer({month: month, year: year}));
        }
    };

    const handleSelectChange = e => {
        const value = Number(e.target.value);
        const month = (value < 12 ? value : overallDate.getMonth());
        const year = (value > 11 ? value : overallDate.getFullYear());

        dispatch(overallDateReducer({month: month, year: year}));
    };
    
    return (
        <header>
            <button className='dpBtn' onClick={() => handleMonthButtonClick(false)}>{'<'}</button>

            <select className='dpSelect' onChange={(e) => {
                handleSelectChange(e);
            }} value={overallDate.getMonth()}>
                {selectProps.monthNames.map((name, index) =>
                    <option key={name} value={index}>{name}</option>
                )}
            </select>

            <select className='dpSelect' onChange={(e) => {
                handleSelectChange(e);
            }} value={overallDate.getFullYear()}>
                {selectProps.years.map(year =>
                    <option key={year} value={year}>{year}</option>
                )}
            </select>

            <button className='dpBtn' onClick={() => handleMonthButtonClick(true)}>{'>'}</button>
        </header>
    )
};

export default SelectorsModule;