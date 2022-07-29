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
        <nav className='navbar'>
            <ul>
                <h1 className='navbar__h1'><Link to="/">Home</Link></h1>
                <h1 className='navbar__h1'><Link to="/cargoes">Cargoes</Link></h1>
                <h1 className='navbar__h1'><Link to="/drivers">Drivers</Link></h1>
                
                <h1 className="navbar__h1 right"><Link onClick={() => { logout() }} to="/login">Logout</Link></h1>
                <h1 className="navbar__h1 right"><Link to="/1">{username}</Link></h1>
            </ul>
        </nav>
    )
};

export default Navbar;

