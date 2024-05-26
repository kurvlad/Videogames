import ListCustom from "../components/ListCustom";
import { getUserHistory } from "../utils/dataStorage/user";
import React, { useCallback, useMemo, useState } from "react";
import ButtonBack from "../components/UI/ButtonBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchInput from "../components/UI/SearchInput";
import Warnings from "../components/UI/Warnings";

export default function History() {
  const [query, setQuery] = useState("");
  const dataHistoryFromLocalstorage = getUserHistory() ?? [];

  const searchedHistory = useMemo(() => {
    return query.length > 3
      ? dataHistoryFromLocalstorage.filter((game) =>
          game.name.toLowerCase().includes(query.toLowerCase())
        )
      : dataHistoryFromLocalstorage;
  }, [dataHistoryFromLocalstorage, query]);

  const clearQuery = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <section
      style={{
        padding: "0.5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <ButtonBack toMain={true} />

      <h1>Last opened cards:</h1>

      {dataHistoryFromLocalstorage.length > 0 && (
        <>
          <SearchInput
            query={query}
            setQuery={setQuery}
            onBtnClick={clearQuery}
            btnMessage={"Clear..."}
            icon={<RefreshIcon />}
            isConditionalBtn={query.length > 3}
          />

          {searchedHistory.length > 0 && <ListCustom data={searchedHistory} />}

          {searchedHistory.length === 0 && (
            <Warnings message={"No favorites with this query"} />
          )}
        </>
      )}
      {dataHistoryFromLocalstorage.length === 0 && (
        <Warnings message={"You haven't yet checked out games"} />
      )}
    </section>
  );
}
