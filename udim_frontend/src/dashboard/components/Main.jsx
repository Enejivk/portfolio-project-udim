import Details from './details/Details';
import { ToggleContext } from '../ContextWrapper'
import { useContext } from "react";
import Topbar from './topbar/Topbar';
import CardBox from './cardBox/CardBox';
import './Main.css'

const Main = () => {
    const { handleToggle, istoggleMenu } = useContext(ToggleContext)
    return (
        <div className={`main ${istoggleMenu ? 'active' : ''}`}>
            <Topbar/>
            <CardBox/>
            <Details/>
        </div>
    );
};

export default Main;
