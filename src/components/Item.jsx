import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { dataHistoryArray, setDataHistoryArray } from "../data/dataHistory.js";
import { Widgets } from "@mui/icons-material";

export default function Item({ item }) {
  const navigate = useNavigate();
  return (
    <>
      {/* <Button
        key={item.name}
        sx={{
          padding: 0,
          borderRadius: "20px",
          overflow: "hidden",
          height: "200px",
          ":hover": {
            transform: "scale(1.1)",
            transition: "transform 0.3s",
          },
          ":active": {
            transform: "scale(.95)",
          },
        }}
        onClick={() => {
          // переходим на ссылку элемента
          navigate(`/:${item.id}`, { replace: false });
          // Изменяем массив элементов в истории
          setDataHistoryArray(item);
        }}
      >
        <ImageListItem sx={{ minHeight: "100%" }}>
          <img
            sx={{}}
            srcSet={`${item.background_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.background_image}?w=248&fit=crop&auto=format`}
            alt={item.slug}
            loading="lazy"
          />
          <ImageListItemBar title={item.name} subtitle={item.author} />
        </ImageListItem>
      </Button> */}
    </>
  );
}
