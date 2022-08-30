import './Sidebar.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";
import SidebarList from "./SidebarItems";
import {makeCloseEvent} from "../../Properties/makeCloseEvent";

const Sidebar = ({setSidebarState, handleSidebarButtonClick}) => {

    useEffect(() => {
        makeCloseEvent('sidebar', setSidebarState);
    })
    
    return (
        <div className='sidebar' id='sidebar' onClick={e=>e.stopPropagation()}>
            <div onClick={handleSidebarButtonClick} className='sbContent'>
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