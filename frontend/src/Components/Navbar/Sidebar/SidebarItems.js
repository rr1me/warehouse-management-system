import {AiFillHome} from "react-icons/ai";
import {FaWarehouse} from "react-icons/fa";
import {BsFillPeopleFill} from "react-icons/bs";
import {BiTransferAlt} from "react-icons/bi";
import './SidebarItems.css';
import {IoGitNetworkSharp} from "react-icons/io5";

const itemIconClassName = 'sbItemIcon'
const itemClassName = 'sbItem';

const SidebarList = [ //todo roleAccess?
    {
        name: 'Home',
        icon: <AiFillHome className={itemIconClassName}/>,
        to: '/',
        className: itemClassName
    },
    {
        name: 'Stored cargo',
        icon: <FaWarehouse className={itemIconClassName}/>,
        to: '/cargo',
        className: itemClassName
    },
    {
        name: 'Workers',
        icon: <BsFillPeopleFill className={itemIconClassName}/>,
        to: '/drivers', //todo change to workers
        className: itemClassName
    },
    {
        name: 'Acceptance and Dispatching',
        icon: <BiTransferAlt className={itemIconClassName+' adIcon'}/>,
        to: '/ad',
        className: itemClassName
    },
    {
        name: 'Inner works',
        icon: <IoGitNetworkSharp className={itemIconClassName}/>,
        to: '/innerworks',
        className: itemClassName
    }
];

export default SidebarList;