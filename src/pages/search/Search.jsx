import { useSearchParams} from "react-router-dom";
import styles from './Search.module.css';
import React, {useEffect, useState} from "react";
import {store} from "../../store/store";
import {fetchSearchItems} from "../../store/dataSlice";
import {Button, ButtonGroup, CircularProgress, TablePagination, Tooltip} from "@mui/material";
import GridCustom from "../../components/GridCustom";
import {checkFav} from "../../utils/favoritesUtils";
import Warnings from "../../components/UI/Warnings";
import ButtonBack from "../../components/UI/ButtonBack";
import ScrollToTop from "../../components/UI/scroll/ScrollToTop";

export default function Search(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchList, setSearchList] = useState(null);
    const [options, setOptions] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [itemsCount, setItemsCount] = useState(0);

    useEffect(() => {
        if(!searchList) store.dispatch(fetchSearchItems(searchParams));
        const unsub = store.subscribe(() => {
            //setSearchList(() => store.getState().data.searchList);

            setSearchList(() =>
            store.getState().data?.searchList?.map((el) => { // получаем данные со стора, конфигурируем их под свои нужды
                    return {
                        id: el.id,
                        name: el.name,
                        slug: el.slug,
                        playtime: el.playtime,
                        rating_top: el.rating_top,
                        background_image: el.background_image,
                        favorite: checkFav(el.id, store.getState().favorites),
                    };
            }));
            setItemsCount(() => store.getState().data?.searchCount);
            setOptions(prev => [...searchParams.values()]);
        });
        return () => unsub();
    }, [searchList]);


    const handleChangePage = (event, newPage) => {
        if(newPage < 0 || newPage > itemsCount) return;
        setPage(newPage);
        store.dispatch(fetchSearchItems(searchParams, rowsPerPage, newPage+1));
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 0));
        setPage(0);
        store.dispatch(fetchSearchItems(searchParams, event.target.value, 1));
    };
    const onRemoveOption = (event, item)=>{
        const index = options.findIndex(el => el === item);
        searchParams.delete([...searchParams.keys()][index]);
        setSearchParams(searchParams);
        store.dispatch(fetchSearchItems(searchParams));
    }

    return (
        <div className={styles.searchpage}>
            <ButtonBack toMain={true}/>
            {!searchList &&
                <div className={styles.centered}>
                    <CircularProgress size={150}/>
                </div>}
            {(searchList && searchList.length > 0 && options.length > 0) && (
                <>
                    <div className={styles.filterOptions}>
                        <span>Search results: </span>
                        <ButtonGroup variant="outlined" size="large" aria-label="Basic button group" >
                            {options.map(item =>
                                <Tooltip title="Delete" key={item}
                                         onClick={e => onRemoveOption(e, item)}>
                                    <Button>{item}</Button>
                                </Tooltip>
                            )}
                        </ButtonGroup>
                    </div>
                    <GridCustom data={searchList}/>
                    <TablePagination
                        component="div" className={styles.pagination}
                        count={itemsCount}
                        rowsPerPageOptions={[3, 6, 9, 18, 30]}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}
            {searchList && options.length === 0 && <Warnings message={'You removed all filters for search'}/>}
            {searchList?.length === 0 && <Warnings message={' No data with such filters'}/>}
        </div>);
}

