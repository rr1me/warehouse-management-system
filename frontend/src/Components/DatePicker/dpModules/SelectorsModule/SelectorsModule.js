import './SelectorsModule.sass';
import {RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/ri";

const CURRENT_DATE = new Date();

const SelectorsModule = ({overallDate, setOverallDate, selectProps}) => {
    
    const overallDateMonth = overallDate.month;
    const overallDateYear = overallDate.year;

    const handleMonthButtonClick = (operator) => {
        const month = overallDateMonth + (operator ? 1 : -1);

        // const yearDistinction = overallDateYear - CURRENT_DATE.getFullYear();
        let monthToDate;
        let yearToDate;
        if (month === 12){
            monthToDate = 0;
            yearToDate = overallDateYear + 1;
        }else if(month === -1){
            monthToDate = 11;
            yearToDate = overallDateYear -1;
        }else{
            monthToDate = month;
            yearToDate = overallDateYear;
        }

        setOverallDate({month: monthToDate, year: yearToDate})
    };

    const handleSelectChange = e => {
        const value = Number(e.target.value);
        const month = (value < 12 ? value : overallDateMonth);
        const year = (value > 11 ? value : overallDateYear);
        
        setOverallDate({month: month, year: year});
    };
    console.log(overallDateMonth+" "+overallDateYear);
    return (
        <div className='dpHeader'>
            {/*<div className='dpArrows'>*/}
            {/*    <div>*/}
            {/*        <RiArrowLeftSLine className='dpIcon double left'/>*/}
            {/*        <RiArrowLeftSLine className='dpIcon double right'/>*/}
            {/*    </div>*/}
            {/*    <RiArrowLeftSLine className='dpIcon' onClick={() => handleMonthButtonClick(false)}/>*/}
            {/*</div>*/}

            <div className='dpArrows'>
                <div className='iconObject'>
                    <RiArrowLeftSLine className='dpIcon double left'/>
                    <RiArrowLeftSLine className='dpIcon double right'/>
                </div>
                <div className='iconObject' onClick={() => handleMonthButtonClick(false)}>
                    <RiArrowLeftSLine className='dpIcon'/>
                </div>
            </div>
            
            {/*<div>*/}
            {/*    <RiArrowRightSLine className='dpIcon double left'/>*/}
            {/*    <RiArrowRightSLine className='dpIcon double right'/>*/}
            {/*</div>*/}

            {/*<select className='dpSelect' onChange={(e) => {*/}
            {/*    handleSelectChange(e);*/}
            {/*}} value={overallDateMonth}>*/}
            {/*    {selectProps.monthNames.map((name, index) =>*/}
            {/*        <option key={name} value={index}>{name}</option>*/}
            {/*    )}*/}
            {/*</select>*/}
            <div className='monthAndYear'>
                {selectProps.monthNames[overallDateMonth]} {overallDateYear}
            </div>
            
            {/*<select className='dpSelect' onChange={(e) => {*/}
            {/*    handleSelectChange(e);*/}
            {/*}} value={overallDateYear}>*/}
            {/*    {selectProps.years.map(year =>*/}
            {/*        <option key={year} value={year}>{year}</option>*/}
            {/*    )}*/}
            {/*</select>*/}

            {/*<RiArrowRightSLine className='dpIcon' onClick={() => handleMonthButtonClick(true)}/>*/}
            <div className='dpArrows'>
                <div className='iconObject' onClick={() => handleMonthButtonClick(true)}>
                    <RiArrowRightSLine className='dpIcon'/>
                </div>
                <div className='iconObject'>
                    <RiArrowRightSLine className='dpIcon double left'/>
                    <RiArrowRightSLine className='dpIcon double right'/>
                </div>
            </div>
        </div>
    )
};

export default SelectorsModule;