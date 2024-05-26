import { Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Rating,
    Typography} from "@mui/material";
import "./ItemCustom.css";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {store} from "../store/store";
import {addFavorite, removeFavorite} from "../store/favoriteSlice";
import {updFavorite} from "../store/dataSlice";
import {addHistory} from "../store/historySlice";
import './../css/item.css'


export default function GridItem({ el }) {
  const navigate = useNavigate();
  function favorite(el, willDelete = false) {
    if (el.favorite) {
      store.dispatch(removeFavorite(el.id));
    } else {
      store.dispatch(addFavorite(el));
    }
    store.dispatch(updFavorite(el.id));
  }

    return (
            <Card sx={{ maxWidth: 345 }} className='hover'>
                <CardHeader style={{wordBreak: 'break-all', height: '60px', padding: '5px'}}
                            title={el.name}
                            subheader={el.released} />
                <CardMedia
                    component="img"
                    height="194"
                    image={el.background_image}
                    alt={el.slug}/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary"  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px'}}>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <span><b>Игровое время:</b></span>
                            <span>{el.playtime} (ч.)</span>
                        </div>
                        <Rating name="read-only" value={el.rating_top} readOnly />
                    </Typography>
                </CardContent>
                <CardActions disableSpacing
                             style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'space-around'}}>
                    <Button style={{fontSize: '12px'}}
                            onClick={() => {
                                // переходим на ссылку элемента
                                navigate(`/games/${el.id}`, { replace: false });
                                // Изменяем массив элементов в истории
                                //   setDataHistoryArray(el);
                                // viktor
                                //setUserHistory(el);
                                store.dispatch(addHistory(el)); }}>
                        Learn More
                    </Button>

                    {!el.favorite && (
                        <Button
                            size="medium"
                            aria-label="add to favorites"
                            onClick={() => {
                                favorite(el);
                            }}>
                            <FavoriteBorderIcon style={{fontSize: '30px'}}/>
                        </Button>
                    )}
                    {el.favorite && (
                        <Button
                            size="medium"
                            aria-label="remove from favorites"
                            onClick={() => {
                                favorite(el, true);
                            }}>
                            <FavoriteIcon  style={{fontSize: '30px'}}/>
                        </Button>
                    )}
                </CardActions>
            </Card>
    );
}
