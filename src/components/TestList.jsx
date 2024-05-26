// import { Fragment } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
// import { setDataHistoryArray } from "../data/dataHistory.js";

// export default function TestList({ data }) {
//   const navigate = useNavigate();
//   return (
//     <div>
//       {data.map((item, val) => {
//         return (
//           <Fragment key={val}>
//             <Button
//               onClick={() => {
//                 // переходим на ссылку элемента
//                 navigate(`/${item.id}:detailsId`, { replace: false });
//                 // Изменяем массив элементов в истории
//                 setDataHistoryArray(item);
//               }}
//             >
//               <img src={item.background_image} alt="" width={300}/>
//               <p>{item.name}</p>
//             </Button>
//           </Fragment>
//         );
//       })}
//     </div>
//   );
// }
