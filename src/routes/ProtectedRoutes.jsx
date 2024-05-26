import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {store} from '../store/store'

export default function ProtectedRoute({children}){
    const generalStore = store.getState();
    const isAuthenticated = generalStore.user.isAuthenticated;

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated) navigate('/');
    }, [isAuthenticated]);

    return isAuthenticated ? children: null;
}