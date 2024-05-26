import {Alert} from "@mui/material";
import React, {memo} from "react";

const Warnings = memo(({type= "warning", message = "No data"}) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '15px auto'}}>
            <Alert variant="filled" severity={type}>
                {message}
            </Alert>
        </div>
    );
});
export default Warnings;