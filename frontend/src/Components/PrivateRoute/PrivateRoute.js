import Navbar from '../../Components/Navbar/Navbar';
import { Navigate } from 'react-router-dom';

import {useSelector} from "react-redux";
import Sidebar from "../Navbar/Sidebar/Sidebar";
import {useState} from "react";
import './PrivateRoute.css';

const Private = ({Component}) => {
    
    const auth = useSelector(state => state.authSlice.logged);

    const [sidebarState, setSidebarState] = useState(false);
    
    return auth ? (
        <div className='privateRoute'>
            <Navbar/>
            <div className='main'>
                <Sidebar sidebarState={sidebarState} setSidebarState={setSidebarState}/>
                <div className='innerContent'>
                    {Component}
                </div>
            </div>
        </div>
    ) : <Navigate to="/login" />
}

export default Private;