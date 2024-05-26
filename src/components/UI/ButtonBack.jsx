import { useMoveBack } from "../../hooks/useMoveBack";
import { Button } from "@mui/material";
import {NavLink} from "react-router-dom";
import React from "react";

export default function ButtonBack({toMain = false}) {
    const moveBack = useMoveBack();
    if(!toMain) return <Button variant="contained" onClick={moveBack}>
        &larr; Go back
    </Button>
    else return (
        <NavLink to='/'>
            <Button variant="contained">
                &larr; Go back
            </Button>
        </NavLink>
    )
}


