import React, {memo} from "react";
import {Button, Input, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";

const SearchInput = memo(({
                         query,
                         setQuery,
                         onBtnClick,
                         btnMessage = 'Search...',
                         icon = <SendIcon />,
                         isConditionalBtn = true})=>{


    return (
        <div style={{paddingLeft: '20px', display: 'flex', alignItems: 'center', gap: '30px', margin: '20px auto', width: '100%'}}>
            <Input sx={{width: '350px'}}
                   value={query}
                   onChange={event => setQuery(event.target.value)}
                   id="input-with-icon-adornment"
                   startAdornment={
                       <InputAdornment position="start">
                           <SearchIcon/>
                       </InputAdornment>}/>
            {isConditionalBtn && (
                <Button onClick={onBtnClick} variant="contained" endIcon={icon}>
                    {btnMessage}
                </Button>
            )}
        </div>
    );
});
export default SearchInput;