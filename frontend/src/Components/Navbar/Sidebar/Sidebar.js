import './Sidebar.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";
import SidebarList from "./SidebarItems";

const Sidebar = ({setSidebarState, handleSidebarButtonClick}) => {

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