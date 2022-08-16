import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './Transits.css';
import TransitRow from "./TransitRow/TransitRow";
import {thunkTransits} from "../../redux/Slices/transitSlice";
import {useNavigate} from "react-router-dom";

const Transits = () => {
    
    const dispatch = useDispatch();
    const {transitEntities, sort} = useSelector(state => state.transitSlice);
    
    useEffect(() => {
        dispatch(thunkTransits());
    }, [dispatch]);
    
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
                {transitEntities.length !== undefined ? transitEntities.map((value, index) => {
                    const current = value.transit.curr;
                    const states = value.states;
                    return (
                        <TransitRow key={index} id={current.id} isOdd={index % 2} current={current}/>
                    )
                }) : null}
            </div>
        </div>
    )
};

export default Transits;