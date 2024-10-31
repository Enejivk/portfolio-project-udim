
import './Navigation.css'
import logoWhite from '../../../assets/logoWhite.png'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { ToggleContext } from '../../ContextWrapper'

import {
    MdSpaceDashboard,
    MdPermIdentity,
    FaMoneyBillTrendUp,
    GrGroup,
    TbZoomMoneyFilled,
    IoMdNotifications,
    IoMdLogOut,
    IoCloseSharp,
} from '../allIcon'


const navNameAndIcon = [
    { name: 'OVERVIEW', icon: MdSpaceDashboard, link: "/home" },
    // { name: 'MEMBERS', icon: GrGroup },
    { name: 'PROFILE', icon: MdPermIdentity, link: '/profile' },
    { name: 'FINANCE', icon: FaMoneyBillTrendUp, link: "/finances" },
    { name: 'DEBTORS', icon: TbZoomMoneyFilled, link: '/debtors' },
    { name: 'GROUPS', icon: GrGroup, link: '/groups' },
    // { name: 'NOTIFICATION', icon: IoMdNotifications },
    { name: 'LOGOUT', icon: IoMdLogOut, link: '/Logout' },
]

const Navigation = () => {
    const { handleToggle, istoggleMenu } = useContext(ToggleContext)
    return (
        <div className={`navigation ${istoggleMenu ? 'active' : ''}`}>
            <ul>
                <li className="brand">
                    <div className="toggle">
                        <IoCloseSharp color='white' onClick={handleToggle} />
                    </div>
                    <Link to='/'>
                        <span className="icon">
                            <img src={logoWhite} alt="" className='brandLogo' />
                        </span>
                    </Link>
                </li>

                {navNameAndIcon.map((IconName, index) => (
                    <li key={index}>
                        <Link to={IconName?.link} >
                            <span className="icon">
                                <IconName.icon fontSize={27} />
                            </span>
                            <span className="title">{IconName.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navigation;