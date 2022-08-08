import './DatePickerModule.css'

import {useDispatch, useSelector} from "react-redux";
import SelectorsModule from "./SelectorsModule/SelectorsModule";
import getMonthData from "./Properties/getMonthData";
import {setSelectedDate} from "./Properties/dpStateSetters";

const CURRENT_DATE = new Date();
const YEAR_RANGE = 2;

const getYears = () => {
    return new Array(YEAR_RANGE + 3).fill(0).map((value, index) => {
        return CURRENT_DATE.getFullYear() - YEAR_RANGE + index;
    });
};

const selectProps = {
    years: getYears(),
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekDayNames: ['Mo', 'Tu', 'We', 'Th' , 'Fr', 'Sa', 'Su']
};

export const DatePickerModule = ({coords}) => {
    
    const dispatch = useDispatch();

    const {overallDate, selectedDate} = useSelector(state => {
        const dates = state.datePickerSlice;
        return {
            overallDate: new Date(dates.overallDate.year, dates.overallDate.month),
            selectedDate: dates.selectedDate ? new Date(dates.selectedDate) : null
        };
    });

    const handleDayClick = date => {
        setSelectedDate(dispatch, date);
    };

    const monthData = getMonthData(overallDate.getFullYear(), overallDate.getMonth());

    const makeDay = (date, index) => {
        let classname = "day";
        let onClick;
        let body;

        if (typeof date === 'number'){
            classname += " aesthetics";
            body = date;
        }else{
            classname += " practice";
            if (date.toDateString() === CURRENT_DATE.toDateString()) classname += " today";
            if (( selectedDate != null && date.toDateString() === selectedDate.toDateString() ) 
                || ( selectedDate === null && date.toDateString() === CURRENT_DATE.toDateString() )) 
                classname += " selected";
            
            onClick = () => handleDayClick(date);
            body = date.getDate();
        }
        
        return (
            <td key={index} className={classname} onClick={onClick}>
                {body}
            </td>
        )
    }

    return (
        <div className="datepicker" style={{left: coords.left, top: coords.top+coords.height+5}}>
            {/*<header>*/}
            {/*    <button className='dpBtn' onClick={() => handleMonthButtonClick(false)}>{'<'}</button>*/}
            {/*    */}
            {/*    <select className='dpSelect' onChange={(e) => {*/}
            {/*        handleSelectChange(e);*/}
            {/*    }} value={selectState.month}>*/}
            {/*        {selectProps.monthNames.map((name, index) =>*/}
            {/*            <option key={name} value={index}>{name}</option>*/}
            {/*        )}*/}
            {/*    </select>*/}
            {/*    */}
            {/*    <select className='dpSelect' onChange={(e) => {*/}
            {/*        handleSelectChange(e);*/}
            {/*    }} value={selectState.year}>*/}
            {/*        {selectProps.years.map(year =>*/}
            {/*            <option key={year} value={year}>{year}</option>*/}
            {/*        )}*/}
            {/*    </select>*/}
            {/*    */}
            {/*    <button className='dpBtn' onClick={() => handleMonthButtonClick(true)}>{'>'}</button>*/}
            {/*</header>*/}
            
            <SelectorsModule dispatch={dispatch} overallDate={overallDate} selectProps={selectProps}/>
            
            <table>
                <thead>
                    <tr>
                        {selectProps.weekDayNames.map(name =>
                            <th className={name === 'Sa' || name === 'Su' ? "weekends" : null} key={name}>{name}</th>
                        )}
                    </tr>
                </thead>
                
                <tbody>
                    {monthData.map((week, index) =>
                        <tr key={index} className="week">
                            { week.map( (date, index) => {return (makeDay(date, index))} ) }
                        </tr>
                    )}
                </tbody>
            </table>
            <hr className='dpSeparator'/>
            <div className='dpTime'>
                <input/>:<input/>
            </div>
        </div>
    )
};
