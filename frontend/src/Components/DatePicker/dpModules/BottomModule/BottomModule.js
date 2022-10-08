import './BottomModule.sass';
import TimeModule from "./TimeModule/TimeModule";

const BottomModule = ({dispatch, setDateDispatch, dispatchIndex, dateObject, setOverallDate}) => {

    const handleTodayClick = () => {
        const dateNow = new Date();
        setDateDispatch({month: dateNow.getMonth(), year: dateNow.getFullYear()})
        dispatch(setDateDispatch({date: dateNow.toJSON(), index: dispatchIndex})); //new date object is created because the CURRENT_DATE const is created after the page is opened, but time goes after that
    }
    
    return (
        <div className='bottomModule'>
            <TimeModule dispatch={dispatch} dateObject={dateObject} setDateDispatch={setDateDispatch} dispatchIndex={dispatchIndex}/>
            <button onClick={handleTodayClick} className='btn apply'>Today</button>
        </div>
    )
};

export default BottomModule;