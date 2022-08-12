import './Navbar.css';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {unlogged} from "../../redux/Slices/authSlice";
import {logoutRequest} from "../../Services/AuthService";
import {useState} from "react";
import {FaBars} from "react-icons/fa";
import Sidebar from "./Sidebar/Sidebar";

const Navbar = () => {

    const dispatch = useDispatch();
    
    const username = useSelector(state => state.authSlice.username);
    
    const logout = () => {
        dispatch(unlogged());
        logoutRequest();
    }
    
    const [sidebarState, setSidebarState] = useState(false);
    
    const handleSidebarButtonClick = e => {
        e.stopPropagation();
        setSidebarState(value => !value);
    }

    return (
        <nav className='navbar'>
            <ul>
                <div className='rightsideNavbar'>
                    <button className='sidebarButton' onClick={handleSidebarButtonClick}>
                        <FaBars className='sidebarIcon'/>
                    </button>
                </div>

                <div className='leftsideNavbar'>
                    <Link className='navlink' to="/1">{username}</Link>
                    <Link className='navlink' onClick={() => { logout() }} to="/login">Logout</Link>
                </div>
                
                {/*<div className={sidebar ? 'sidebar sidebar-active' : 'sidebar'} id={sidebar} onClick={e=>e.stopPropagation()}>*/}
                {/*    <div onClick={handleSidebarButtonClick} className='sidebarContent'>*/}
                {/*        <button className='sbClose'>*/}
                {/*            <AiOutlineClose className='sidebarIcon'/>*/}
                {/*        </button>*/}
                {/*        <Link className='navlink' to="/">*/}
                {/*            <AiFillHome className='sidebarItemIcon'/>*/}
                {/*            Home*/}
                {/*        </Link>*/}
                {/*        <Link className='navlink' to="/cargoes">*/}
                {/*            <FaWarehouse className='sidebarItemIcon'/>*/}
                {/*            Stored cargo*/}
                {/*        </Link>*/}
                {/*        <Link className='navlink' to="/drivers">*/}
                {/*            <BsFillPeopleFill className='sidebarItemIcon'/>*/}
                {/*            Workers*/}
                {/*        </Link>*/}
                {/*        <Link className='navlink AD' to="/ad">*/}
                {/*            <BiTransferAlt className='sidebarItemIcon'/>*/}
                {/*            Acceptance and Dispatching*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Sidebar sidebarState={sidebarState} setSidebarState={setSidebarState} handleSidebarButtonClick={handleSidebarButtonClick}/>
            </ul>
        </nav>
    )
};

export default Navbar;

