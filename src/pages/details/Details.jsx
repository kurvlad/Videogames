import React from "react";
import ButtonBack from "../../components/UI/ButtonBack";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { store } from "../../store/store";
import {fetchItem, updFavorite} from "../../store/dataSlice";
import {Alert, Button, ButtonGroup, CircularProgress, Rating, Tooltip, Typography} from "@mui/material";
import styles from "./Details.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {addFavorite, removeFavorite} from "../../store/favoriteSlice";
import Warnings from "../../components/UI/Warnings";

export default function Details() {
  const params = useParams();
  const detailsId = params.detailsId;
  const [data, setData] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if(store.getState().data.currentItem?.id !== detailsId){
      store.dispatch(fetchItem(detailsId));
    }
    const unsub = store.subscribe(() => {
      setData(() => store.getState().data.currentItem);
      setIsLoad(true);
    });
    setIsFavorite(() => {
      let found  = null;
      if(store.getState()?.favorites.length > 0){
        found =  store.getState().favorites?.find(el => el?.id === store.getState().data.currentItem.id);
      }
      return !!found;
    })
    return () => unsub();
  }, [detailsId]);

  function favorite(willDelete = false) {
    if (isFavorite) {
      store.dispatch(removeFavorite(data.id));
    } else {
      store.dispatch(addFavorite(data));
    }
    store.dispatch(updFavorite(data.id));
    setIsFavorite(prev => !prev);
  }

  return (
      <div className={styles.container}>
        <div className={styles.top}>
          <ButtonBack toMain={true}/>
          {!isFavorite && (
              <Tooltip title={'Add to favorites'}>
              <Button
                  size="large"
                  aria-label="add to favorites"
                  onClick={favorite}>
                <FavoriteBorderIcon style={{fontSize: '50px'}}/>
              </Button>
              </Tooltip>
          )}
          {isFavorite && (
              <Tooltip title={'Remove from favorites'}>
              <Button
                  size="large"
                  aria-label="remove from favorites"
                  onClick={() => {
                    favorite(true);
                  }}>
                <FavoriteIcon style={{fontSize: '50px'}}/>
              </Button>
              </Tooltip>
          )}
        </div>
        {(isLoad && !data) && <Warnings type={"error"}/>}
        {isLoad && data && (
            <div className={styles.box}>
              <h1 className={styles.title}>{data.name}</h1>
              <Swiper className={styles.swiper}
                  navigation={true}
                  modules={[Navigation]}>
                <SwiperSlide className={styles.swiperSlide}>
                  <img src={data.background_image} alt={data.slug}
                       style={{height: '500px'}}/>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <img src={data.background_image_additional} alt={data.slug}
                         style={{height: '500px'}}/>
                </SwiperSlide>
              </Swiper>

              <section>
                <span style={{fontSize: '20px'}}><b>Игровое время: </b>{data.playtime} (ч.)</span>

                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                  <span style={{fontSize: '20px'}}><b>Rating:</b></span>
                  <Rating name="Rating" value={data.rating_top} readOnly />
                </div>
              </section>

              <section style={{justifyContent: 'start', gap: '15px'}}>
                <span style={{fontSize: '20px'}}><b>Genres:</b></span>
                {data?.genres && <ButtonGroup size="large" aria-label="Large button group">
                  {data.genres.map((item) => (
                      <Button key={item.name}>{item.name}</Button>
                  ))}
                </ButtonGroup>}
              </section>

              <section>
                <span style={{fontSize: '20px'}}><b>Developer: </b>{data.developers[0].name}</span>
              </section>


              <Typography paragraph style={{ padding: '0 10%', textAlign: 'justify'}}>
                {data.description_raw}
              </Typography>
            </div>
        )}
        {!isLoad && <CircularProgress className={styles.centered} size={'250px'} />}
      </div>
  );
}