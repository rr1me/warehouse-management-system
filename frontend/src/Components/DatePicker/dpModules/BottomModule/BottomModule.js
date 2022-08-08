import './BottomModule.css';
import TimeModule from "./TimeModule/TimeModule";

const BottomModule = ({dispatch, dateObject, setDateDispatch}) => {

    const handleTodayClick = () => {
        dispatch(setDateDispatch(new Date().toJSON())); //new date object is created because the CURRENT_DATE const is created after the page is opened, but time goes after that
    }
    
    return (
        <div className='bottomModule'>
            <TimeModule dispatch={dispatch} dateObject={dateObject} setDateDispatch={setDateDispatch}/>
            <button onClick={handleTodayClick} className='btn apply-btn today'>Today</button>
        </div>
    )
};

export default BottomModule;