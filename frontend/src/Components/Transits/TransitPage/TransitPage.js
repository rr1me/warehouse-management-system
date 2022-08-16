import './TransitPage.css';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOneTransit} from "../../../Services/transitService";
import {Selector} from "react-redux";
import SelectPicker from "../../SelectPicker/SelectPicker";

const TransitPage = () => {

    const location = useLocation();
    
    const [transit, setTransit] = useState(Object);
    
    useEffect(() => {
        const id = /s\/(.*)/.exec(location.pathname)[1];
        if (id !== 'add') {
            getOneTransit(id).then(v=>{
                setTransit(v.data)
                console.log(v);
            });
        }else{

        }
    }, [location.pathname]);
    
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
                        <div className='trElemName'>Id</div>
                        <SelectPicker className='trElemInfo' defaultValue={transit.client}>
                            <div>ewwe</div>
                            <div>ewwe</div>
                            <div>ewwe</div>
                            <div>ewwe</div>
                        </SelectPicker>
                    </div>
                    <div className='trInfoElem elementTitle'>
                        <div className='trElemName'>Id</div>
                        <input className='trElemInfo' defaultValue={transit.client}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default TransitPage;