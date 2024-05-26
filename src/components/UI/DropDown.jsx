import React, {memo} from "react";
import {Autocomplete, TextField} from "@mui/material";

const DropDown = memo(({
                           value,
                           setValue,
                           options,
                           label
                       })=>{

    return (
        <Autocomplete
            disablePortal
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }} key={label}
            options={options.length === 0 ? ["Loading..."] : options}
            sx={{width: 200}}
            renderInput={(params) => <TextField {...params} label={label} />}/>
    );
});
export default DropDown;