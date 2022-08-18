import './TransitPage.css';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOneTransit} from "../../../Services/transitService";
import SelectPicker from "../../SelectPicker/SelectPicker";
import {useSelector} from "react-redux";
import {DatePicker} from "../../DatePicker/DatePicker";
import {setArrivalDate} from "../../../redux/Slices/cargoSlice";

const TransitPage = () => {

    const location = useLocation();
    
    const [transit, setTransit] = useState(Object);
    const {transitEntities} = useSelector(state=>state.transitSlice);
    
    useEffect(() => {
        const id = /s\/(.*)/.exec(location.pathname)[1];
        if (id !== 'add') {
            console.log(transitEntities.length);
            const isBlank = transitEntities.length !== undefined;
            if (isBlank){
                console.log("!")
                setTransit(transitEntities[id].transit.curr);
            }else{
                console.log("?")
                getOneTransit(id).then(v=>{setTransit(v.data)});
            }
        }else{
            setTransit({id: 'new'})
        }
    }, [location.pathname, transitEntities]);
    
    if (transit !== undefined){
        return (
            <div className='transitPage'>
                <div className='trInfoElem elementTitle'>
                    Transit: {transit.id}
                </div>
                <div className='trInfoMain'>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Client</div>
                        <input className='trElemInfo' defaultValue={transit.client}/>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Type</div>
                        <SelectPicker defaultValue={types[transit.type]}>
                            {types.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Status</div>
                        <SelectPicker defaultValue={statuses[transit.status]}>
                            {statuses.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Additional tasks</div>
                        <SelectPicker defaultValue={additionalTasks[transit.additionalTasks]}>
                            {additionalTasks.map((value, index)=>{
                                return (
                                    <div key={index}>
                                        {value}
                                    </div>
                                )
                            })}
                        </SelectPicker>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Date</div>
                        <DatePicker incomeDate={transit.date} editState={true} dispatchIndex={transit.id} id={'ebaniy svet'} setDateDispatch={setArrivalDate}/>
                    </div>
                </div>
            </div>
        )
    }
};

const types = [
    'Acceptance',
    'Dispatching'
];

const statuses = [
    'Planned',
    'Completed',
    'Failed'
];

const additionalTasks = [
    'None',
    'QualityControl',
    'Repack',
    'Both'
]

export default TransitPage;