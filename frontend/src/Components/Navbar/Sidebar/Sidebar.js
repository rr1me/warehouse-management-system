import './Sidebar.css'
import {AiOutlineClose} from "react-icons/ai";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import SidebarList from "./SidebarItems";

const Sidebar = ({sidebarState, setSidebarState, handleSidebarButtonClick}) => {

    useEffect(() => {
        const closeDP = (e) => {
            if (e.composedPath()[0].id !== 'sidebar'){
                setSidebarState(false);
            }
        };

        document.body.addEventListener('click', closeDP);

        return () => document.body.removeEventListener('click', closeDP);
    })
    
    return (
        <div className={sidebarState ? 'sidebar sidebar-active' : 'sidebar'} id='sidebar' onClick={e=>e.stopPropagation()}>
            <div onClick={handleSidebarButtonClick} className='sbContent'>
                <button className='sbClose'>
                    <AiOutlineClose className='sbCloseIcon'/>
                </button>
                {/*<Link className='navlink' to="/">*/}
                {/*    <AiFillHome className='sidebarItemIcon'/>*/}
                {/*    Home*/}
                {/*</Link>*/}
                {/*<Link className='navlink' to="/cargoes">*/}
                {/*    <FaWarehouse className='sidebarItemIcon'/>*/}
                {/*    Stored cargo*/}
                {/*</Link>*/}
                {/*<Link className='navlink' to="/drivers">*/}
                {/*    <BsFillPeopleFill className='sidebarItemIcon'/>*/}
                {/*    Workers*/}
                {/*</Link>*/}
                {/*<Link className='navlink AD' to="/ad">*/}
                {/*    <BiTransferAlt className='sidebarItemIcon'/>*/}
                {/*    Acceptance and Dispatching*/}
                {/*</Link>*/}
                {SidebarList.map((v, index)=>{
                    return (
                        <Link key={index} className={v.className} to={v.to}>
                            {v.icon}
                            {v.name}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
};

export default Sidebar;