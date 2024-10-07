import { useState, createContext, useContext } from "react";


const ToggleContext = createContext()

const ContextWrapper = ({ children }) => {
    const [istoggleMenu, setIsToggle] = useState(false);

    const handleToggle = () => {
        setIsToggle(!istoggleMenu)
    }

    return (
        <ToggleContext.Provider value={{ istoggleMenu, handleToggle }}>
            {children}
        </ToggleContext.Provider>
    )
}

export { ContextWrapper, ToggleContext }
