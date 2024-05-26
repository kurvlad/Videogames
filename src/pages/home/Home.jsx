import {getDTO, } from "../../utils/general";
import {
    Box, Button,
    CircularProgress,
    FormControl,
    InputLabel,  TablePagination,
} from "@mui/material";
import styles from './Home.module.css'
import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {store} from '../../store/store'
import {fetchItems} from "../../store/dataSlice";
import {_API_KEY} from '../../store/dataSlice'
import GridCustom from "../../components/GridCustom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { checkFav } from "../../utils/favoritesUtils";
import SearchInput from "../../components/UI/SearchInput";
import DropDown from "../../components/UI/DropDown";
import ScrollToTop from "../../components/UI/scroll/ScrollToTop";

export default function Home(){
    const generalStore = store.getState();

    const [genres, setGenres] = useState(null);
    const [platforms, setPlatforms] = useState(null);
    const [stores, setStores] = useState(null);

    const [valueGenres, setValueGenres] = useState(null);
    const [valuePlatforms, setValuePlatforms] = useState(null);
    const [valueStores, setValueStores] = useState(null);

    const [query, setQuery] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [itemsCount, setItemsCount] = useState(0);

    const [items, setItems] = useState(null);

    const navigate = useNavigate();

    useEffect(  () => {
        if(generalStore.data.items) {
            setItems(() =>
                store.getState().data?.items?.map((el) => { // получаем данные со стора, конфигурируем их под свои нужды
                    return {
                        id: el.id,
                        name: el.name,
                        slug: el.slug,
                        playtime: el.playtime,
                        rating_top: el.rating_top,
                        background_image: el.background_image,
                        favorite: checkFav(el.id, store.getState().favorites),
                    };
                })
            );
            setItemsCount(() => store.getState().data.itemsCount);
        }else{
            store.dispatch(fetchItems());
        }
        const unsub = store.subscribe(() => {
            //setItems(() => store.getState().data.items);

            setItems(() =>
                store.getState().data?.items?.map((el) => { // получаем данные со стора, конфигурируем их под свои нужды
                    return {
                        id: el.id,
                        name: el.name,
                        slug: el.slug,
                        auth: el.auth,
                        rating_top: el.rating_top,
                        background_image: el.background_image,
                        favorite: checkFav(el.id, store.getState().favorites),
                    };
                })
            );

            setItemsCount(() => store.getState().data.itemsCount);
        });
        const fetchCustom = async (item, cb)=>{
            try{
                const res = await fetch(`https://api.rawg.io/api/${item}?key=` + _API_KEY);
                const data = await res.json();
                const prepared = getDTO(data.results);
                cb(prepared);
                store.dispatch({type: `${item}/loaded`, payload: prepared});
            }catch (e) {
                console.log(e);
            }
        }

        if(!generalStore.data.genres){
            fetchCustom('genres', setGenres);
        } else{
            setGenres(generalStore.data.genres);
        }
        if(!generalStore.data.platforms){
            fetchCustom('platforms', setPlatforms);
        } else{
            setPlatforms(generalStore.data.platforms);
        }
        if(!generalStore.data.stores){
            fetchCustom('stores', setStores);
        } else{
            setStores(generalStore.data.stores);
        }

        return () => unsub();
    }, [items]);

    const handleChangePage = (event, newPage) => {
        if(newPage < 0 || newPage > itemsCount) return;
        setPage(newPage);
        store.dispatch(fetchItems(rowsPerPage, newPage+1));
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 0));
        setPage(0);
        store.dispatch(fetchItems(event.target.value, 1));
    };

    const onQueryFilterSearch = useCallback(()=> {
        let str = '';
        if(query) str += "&name=" + query.toLowerCase();
        if(valueGenres) str += "&genres=" + valueGenres.toLowerCase();
        if(valuePlatforms) str += "&platforms=" + valuePlatforms.toLowerCase();
        if(valueStores) str += "&stores=" + valueStores.toLowerCase();

        if(!str) {
            console.log('error while searching, no data provided');
            return;
        }
        navigate({
            pathname: '/search',
            search: '?' + str,
        });

        setValueGenres(null);
        setValuePlatforms(null);
        setValueStores(null);
        setQuery('')
    }, [query, valueGenres, valuePlatforms, valueStores]);

    return (
        <div className={styles.homepage}>
            <div className={styles.top}>
                {page > 0 ?
                    <Button onClick={event => handleChangePage(event, page-1)}>
                        <ArrowBackIosIcon fontSize={'large'} />
                    </Button> :
                    <Button>
                        <ArrowBackIosIcon fontSize={'large'} htmlColor={'#ddd'}/>
                    </Button>}

                <section>
                    <h1>Video Games Database</h1>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <FormControl variant="standard" style={{margin: '10px auto', padding: '5px 0'}}>
                            <InputLabel style={{paddingLeft: '200px'}} htmlFor="input-with-icon-adornment">
                                Find games, you're interested in:
                            </InputLabel>
                            <SearchInput query={query}
                                         setQuery={setQuery}
                                         onBtnClick={onQueryFilterSearch}/>

                            <div className={styles.filterBox}>
                                {genres && genres.length > 0 &&
                                    <DropDown value={valueGenres} setValue={setValueGenres}
                                              label={"Genres"} options={genres}/>}
                                {platforms && platforms.length > 0
                                    && <DropDown value={valuePlatforms} setValue={setValuePlatforms}
                                                 label={"Platforms"} options={platforms}/>}
                                {stores && stores.length > 0
                                    && <DropDown value={valueStores} setValue={setValueStores}
                                                 label={"Stores"} options={stores}/>}
                            </div>
                        </FormControl>
                    </Box>
                </section>

                {page < itemsCount ?
                    <Button  onClick={event => handleChangePage(event, page+1)}>
                        <ArrowForwardIosIcon  fontSize={'large'}/>
                    </Button> :
                    <Button>
                        <ArrowForwardIosIcon  fontSize={'large'} htmlColor={'#ddd'}/>
                    </Button>}
            </div>
            <section>
                {!items ? <CircularProgress size={150}/>
                    : <GridCustom data={items}/>}
            </section>
            {items && <section>
                <TablePagination
                    component="div" className={styles.pagination}
                    count={itemsCount}
                    rowsPerPageOptions={[3, 6, 9, 18, 30]}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </section>}
        </div>
    );
}
