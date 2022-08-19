import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Transits.css';
import TransitRow from "./TransitRow/TransitRow";
import {thunkTransits} from "../../redux/Slices/transitSlice";
import {useNavigate} from "react-router-dom";

const Transits = () => {
    
    const dispatch = useDispatch();
    const {transits, sort} = useSelector(state => state.transitSlice);
    
    useEffect(() => {
        if (transits.length === undefined)
            dispatch(thunkTransits());
    }, [dispatch, transits.length]);
    
    const navigate = useNavigate();
    
    const handleAddNewClick = () => {
        navigate('/transits/add');
    }
    
    return (
        <div className='transitContainer'>
            <div className='elementHeader'>
                <div className='elementTitle'>Transits</div>
                <button className="btn apply-btn tableButton" onClick={handleAddNewClick}>Add new</button>
            </div>
            <div className='transitGrid'>
                <div className='transitHeader'>
                    <div className='transitHeaderItem'>Id</div>
                    <div className='transitHeaderItem'>Type</div>
                    <div className='transitHeaderItem'>Status</div>
                    <div className='transitHeaderItem'>Client</div>
                    <div className='transitHeaderItem'>Date</div>
                    <div className='transitHeaderItem'>Additional Tasks</div>
                    <div className='transitHeaderItem'>Commentary</div>
                </div>
                {transits.length !== undefined ? transits.map((value, index) => {
                    // const transit = value.transit;
                    // const states = value.states;
                    return (
                        <TransitRow key={index} id={value.id} isOdd={index % 2} current={value}/>
                    )
                }) : null}
            </div>
        </div>
    )
};

export default Transits;