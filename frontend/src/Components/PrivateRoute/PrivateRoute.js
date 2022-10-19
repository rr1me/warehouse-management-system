import Navbar from '../../Components/Navbar/Navbar';
import { Navigate } from 'react-router-dom';

import {useSelector} from "react-redux";
import Sidebar from "../Navbar/Sidebar/Sidebar";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
// import './PrivateRoute.css';
import './PrivateRoute.sass';

const Private = ({Component}) => {
    
    const [ICStyle, setICStyle] = useState(getICStyle());
    useEffect(() => {
        const event = () => {
            // const isScrollExist = document.body.scrollWidth > window.innerWidth;
            //
            // const height = window.innerHeight - (isScrollExist ? 80 : 65);

            setICStyle(getICStyle());
        }
        
        window.addEventListener('scroll', event);
        return () => window.removeEventListener('scroll', event);
    }, []);
    
    const auth = useSelector(state => state.authSlice.logged);

    const [sidebarState, setSidebarState] = useState(false);
    
    return auth ? (
        <div className='privateRoute'>
            <Navbar/>
            <div className='main'>
                <Sidebar sidebarState={sidebarState} setSidebarState={setSidebarState}/>
                <div className='innerContent' style={ICStyle}>
                    {Component}
                </div>
            </div>
            {/*<div className='tst'>1</div>*/}
        </div>
    ) : <Navigate to="/login" />
}

export default Private;

const getICStyle = () => {
    const isScrollExist = document.body.scrollWidth > window.innerWidth;

    const height = window.innerHeight - (isScrollExist ? 80 : 65);
    console.log(height)
    return {minHeight: height + 'px'};
}