import {Grid} from "@mui/material";
import "./ListCustom.css";
import React from "react";
import GridItem from "./GridItem";

export default function GridCustom({ data }) {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {data.map(item =>
                <Grid key={item.id} item xs={2} sm={4} md={4} >
                    <GridItem  el={item}/>
                </Grid>
            )}
        </Grid>
    );
}