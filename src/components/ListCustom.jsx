import { List } from "@mui/material";
import ItemCustom from "./ItemCustom";
import "./ListCustom.css";

export default function ListCustom({ data }) {
    return (
        <>
            <List className="list-custom" data={data}>
                {data.map((el) => {
                    return <ItemCustom key={el.id} el={el}></ItemCustom>;
                })}
            </List>
        </>
    );
}