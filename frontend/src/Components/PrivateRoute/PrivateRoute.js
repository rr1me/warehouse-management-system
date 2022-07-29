import Navbar from '../../Components/Navbar/Navbar';
import { Navigate } from 'react-router-dom';

import {useSelector} from "react-redux";

const Private = ({Component}) => {
    
    const auth = useSelector(state => state.authSlice.logged);
    
    return auth ? (
        <div>
            <Navbar/>
            {Component}
        </div>
    ) : <Navigate to="/login" />
}

export default Private;