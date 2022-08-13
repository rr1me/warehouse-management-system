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
            <div className='prWrapper logo'><div>MyWMS</div></div>
            <div className='prWrapper nav'><Navbar/></div>
            <div className='prWrapper side'><Sidebar sidebarState={sidebarState} setSidebarState={setSidebarState}/></div>
            <div className='prWrapper main'>
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
                {Component}
            </div>
            {/*<div>MyWMS</div>*/}
            {/*<div>MyWMS</div>*/}
            {/*<div>MyWMS</div>*/}
            {/*<div>MyWMS</div>*/}
            {/*<Navbar/>*/}
            {/*<Sidebar sidebarState={sidebarState} setSidebarState={setSidebarState}/>*/}
            {/*{Component}*/}
        </div>
    ) : <Navigate to="/login" />
}

export default Private;