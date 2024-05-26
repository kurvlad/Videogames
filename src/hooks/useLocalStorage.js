import {useEffect, useState} from "react";

export function useLocalStorageState(initialState, key){
    const [value, setValue] = useState(() => {
        let stored =  localStorage.getItem(key);
        if(!stored) return initialState;
        return JSON.parse(stored);
    });

    useEffect(()=> {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue]
}