import React, {useEffect, useState} from "react";
import styles from "./ScrollToTop.module.css";
import {Fab} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ScrollToTop(){
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return ()=> window.removeEventListener('scroll', toggleVisible);
    }, []);
    const toggleVisible = () => {
        const el = document.documentElement.scrollTop;
        if(el > 500) setVisible(true);
        else setVisible(false);
        //setVisible(document.documentElement.scrollTop > 500)
    };
    const onScrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <>
            {visible && (
                <button color="primary"
                     aria-label="up" tabIndex={10}
                     className={styles.upBtn}
                     onClick={onScrollToTop}>
                    <ArrowUpwardIcon htmlColor='white'/>
                </button>
            )}
        </>
    );
}