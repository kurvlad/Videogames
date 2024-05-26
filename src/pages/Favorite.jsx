import React, {useCallback, useMemo, useState} from "react";
import ListCustom from "../components/ListCustom.jsx";
import RefreshIcon from '@mui/icons-material/Refresh';
import Warnings from "../components/UI/Warnings";
import ButtonBack from "../components/UI/ButtonBack";
import SearchInput from "../components/UI/SearchInput";
import {getUSerFavoritesData} from "../utils/dataStorage/user";

export default function Favorite() {
    const dataFavoriteFromLocalstorage = getUSerFavoritesData() ?? [];
    const [query, setQuery] = useState('');

    const clearQuery = useCallback(()=>{
        setQuery('');
    },[]);

    const searchedFavorites = useMemo(()=> {
        return query.length > 3
            ? dataFavoriteFromLocalstorage.filter((game) =>
                game.name.toLowerCase().includes(query.toLowerCase())
            )
            : dataFavoriteFromLocalstorage;
    }, [dataFavoriteFromLocalstorage, query]);

  return (
      <section style={{
          padding: '0.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start'}}>

        <ButtonBack toMain={true}/>

        <h1>Favorite:</h1>

        {dataFavoriteFromLocalstorage.length > 0 && (
            <>
                <SearchInput query={query}
                             setQuery={setQuery}
                             onBtnClick={clearQuery}
                             btnMessage={'Clear...'}
                             icon={<RefreshIcon/>}
                             isConditionalBtn={query.length > 3} />

                <ListCustom data={searchedFavorites}/>
                {(searchedFavorites.length === 0) && (
                    <Warnings message={'No favorites with this query'}/>
                )}
            </>
        )}
        {dataFavoriteFromLocalstorage.length === 0 && (
            <Warnings message={'You haven\'t yet marked games as your favorites'}/>
        )}
      </section>
  );
}