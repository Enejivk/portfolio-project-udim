import './Topbar.css'
import { userLogin, FiAlignJustify } from '../allIcon'
import { useState } from 'react';
import { useContext } from "react";
import { ToggleContext } from '../../ContextWrapper'

const Groups = () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <label>
                Select Group  
                <select value={selectedValue} onChange={handleChange}>
                    <option value="option1">Peace</option>
                    <option value="option2">Unity</option>
                    <option value="option3">Love</option>
                </select>
            </label>
        </div>
    );
}

const Topbar = () => {
    const { handleToggle, istoggleMenu } = useContext(ToggleContext)
    return (
        <div className="topbar">
            <div className="toggle">
                <FiAlignJustify color='black' onClick={handleToggle} />
            </div>
            <div className="search">
                <Groups />
                </div>
            <div className="user">
                <img src={userLogin} alt="" />
            </div>
        </div>
    );
};

export default Topbar;
