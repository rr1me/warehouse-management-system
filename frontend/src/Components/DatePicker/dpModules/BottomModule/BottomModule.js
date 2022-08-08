import './BottomModule.css';
import TimeModule from "./TimeModule/TimeModule";

const BottomModule = ({dispatch, setDateDispatch, dispatchIndex, dateObject}) => {

    const handleTodayClick = () => {
        dispatch(setDateDispatch({date: new Date().toJSON(), index: dispatchIndex})); //new date object is created because the CURRENT_DATE const is created after the page is opened, but time goes after that
    }
    
    return ( //todo make set overall date after pressing Today button
        <div className='bottomModule'>
            <TimeModule dispatch={dispatch} dateObject={dateObject} setDateDispatch={setDateDispatch}/>
            <button onClick={handleTodayClick} className='btn apply-btn today'>Today</button>
        </div>
    )
};

export default BottomModule;