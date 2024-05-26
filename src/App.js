import { BrowserRouter, Route, Routes } from "react-router-dom";
import Applayout from "./pages/Applayout";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import History from "./pages/History";
import SignUp from "./pages/SignUp";
import PageNotFound from "./pages/PageNotFound";
import Details from "./pages/details/Details";
import { useEffect } from "react";
import { getUserSessionData } from "./utils/dataStorage/user";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { initUser } from "./utils/auth/userData";

function App() {
  /*    useEffect(() => {
        const userData = getUserSessionData();
        if (userData?.user.login && userData?.user.password) {
            initUser(userData);
        }
    }, []);*/

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Applayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="games/:detailsId" element={<Details />} />
          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <Favorite />
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
