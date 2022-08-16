import './Navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {unlogged} from "../../redux/Slices/authSlice";
import {logoutRequest} from "../../Services/AuthService";

const Navbar = () => {

    const dispatch = useDispatch();
    
    const username = useSelector(state => state.authSlice.username);
    
    const logout = () => {
        dispatch(unlogged());
        logoutRequest();
    }

    return (
        <div className='navbar'>
            <div className='navInner'>
                <div>
                    <Link className='navlink myWMS' to='/'>MyWMS</Link>
                </div>

                <div className='leftsideNavbar'>
                    <Link className='navlink' to="/1">{username}</Link>
                    <Link className='navlink' onClick={() => { logout() }} to="/login">Logout</Link>
                </div>
            </div>
        </div>
    )
};

export default Navbar;

