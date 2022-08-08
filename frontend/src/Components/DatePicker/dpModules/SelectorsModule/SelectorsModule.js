import './SelectorsModule.css';

const CURRENT_DATE = new Date();

const SelectorsModule = ({overallDate, setOverallDate, selectProps}) => {
    
    const overallDateMonth = overallDate.month;
    const overallDateYear = overallDate.year;
    // console.log(overallDateYear+" "+overallDateMonth);

    const handleMonthButtonClick = (operator) => {
        const month = overallDateMonth + (operator ? 1 : -1);

        const yearDistinction = overallDateYear - CURRENT_DATE.getFullYear();

        if( !( (yearDistinction === 2 && month === 12)
            || (yearDistinction === -2 && month === -1) ) ){
            // dispatch(overallDateReducer({month: month, year: year}));
            setOverallDate({month: month, year: overallDateYear});
        }
    };

    const handleSelectChange = e => {
        const value = Number(e.target.value);
        const month = (value < 12 ? value : overallDateMonth);
        const year = (value > 11 ? value : overallDateYear);

        // dispatch(overallDateReducer({month: month, year: year}));
        setOverallDate({month: month, year: year});
    };
    
    return (
        <header>
            <button className='dpBtn' onClick={() => handleMonthButtonClick(false)}>{'<'}</button>

            <select className='dpSelect' onChange={(e) => {
                handleSelectChange(e);
            }} value={overallDateMonth}>
                {selectProps.monthNames.map((name, index) =>
                    <option key={name} value={index}>{name}</option>
                )}
            </select>

            <select className='dpSelect' onChange={(e) => {
                handleSelectChange(e);
            }} value={overallDateYear}>
                {selectProps.years.map(year =>
                    <option key={year} value={year}>{year}</option>
                )}
            </select>

            <button className='dpBtn' onClick={() => handleMonthButtonClick(true)}>{'>'}</button>
        </header>
    )
};

export default SelectorsModule;