import './SelectorsModule.sass';
import {RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/ri";


const SelectorsModule = ({overallDate, setOverallDate, selectProps}) => {
    
    const overallDateMonth = overallDate.month;
    const overallDateYear = overallDate.year;

    const handleMonthButtonClick = (operator) => {
        const month = overallDateMonth + (operator ? 1 : -1);
        
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
    
    return (
        <div className='dpHeader'>

            <div className='dpArrows'>
                <div className='iconObject'>
                    <RiArrowLeftSLine className='dpIcon double left'/>
                    <RiArrowLeftSLine className='dpIcon double right'/>
                </div>
                <div className='iconObject' onClick={() => handleMonthButtonClick(false)}>
                    <RiArrowLeftSLine className='dpIcon'/>
                </div>
            </div>

            <div className='monthAndYear'>
                {selectProps.monthNames[overallDateMonth]} {overallDateYear}
            </div>
            
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