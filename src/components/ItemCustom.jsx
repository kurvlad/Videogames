import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import "./ItemCustom.css";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addFavorite, removeFavorite } from "../store/favoriteSlice.js";
import { store } from "../store/store.js";
import { addHistory } from "../store/historySlice.js";
import { updFavorite } from "../store/dataSlice.js";
import { useState } from "react";

// получаем на вход объект элемента
export default function ItemCustom({ el }) {
  // создаем состояние видимости кнопок избранного
  // const [favoriteVisible, setFavoriteVisible] = useState(isFavorite(el.id), store.getState().favorites);
  // кнопка навигации назад
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(el.favorite);
  //   функция меняющаяя массив избранного (второй параметр отвечает за то нужно ли удалять объект из избранного)
  function favorite(el) {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      store.dispatch(removeFavorite(el.id));
    } else {
      store.dispatch(addFavorite(el));
    }
    store.dispatch(updFavorite(el.id));
  }
  return (
    <ListItem className="item-custom" el={el}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={el.name} subheader={el.released} />
        <CardMedia
          component="img"
          height="194"
          image={el.background_image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <Rating name="read-only" value={el.rating_top} readOnly />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => {
              // переходим на ссылку элемента
              navigate(`/games/${el.id}`, { replace: false });
              store.dispatch(addHistory(el));
            }}
          >
            Learn More
          </IconButton>

          {!isFavorite && (
            <Button
              size="small"
              aria-label="add to favorites"
              onClick={() => {
                favorite(el);
              }}
            >
              <FavoriteBorderIcon />
            </Button>
          )}
          {isFavorite && (
            <Button
              size="small"
              aria-label="remove from favorites"
              onClick={() => {
                favorite(el);
              }}
            >
              <FavoriteIcon />
            </Button>
          )}
        </CardActions>
      </Card>
    </ListItem>
  );
}
