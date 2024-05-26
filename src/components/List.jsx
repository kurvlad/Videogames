import React from "react";
import ImageList from "@mui/material/ImageList";
import Item from "./Item.jsx";

export default function List({ data }) {
  return (
    <ImageList cols={4} gap={8} sx={{ overflow: "visible" }}>
      {data.map((item) => {
        return <Item key={item.id} item={item} />;
      })}
    </ImageList>
  );
}
