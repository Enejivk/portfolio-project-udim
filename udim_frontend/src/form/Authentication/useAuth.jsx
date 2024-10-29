import { useContext } from 'react'
import { ContextProvider } from '../../apiAndContext/AuthContext'

const useAuth = () => {
    return useContext(ContextProvider);
}

export default useAuth;