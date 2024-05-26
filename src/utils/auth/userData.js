import { getUserAuthData, setUserAuthData } from "../dataStorage/user";
import { store } from "../../store/store";
import { login as storeLogin } from "../../store/userSlice";

export const checkAuthData = (login, password) => {
  const [userName, userPassword] = getUserAuthData(login);
  if (userName === login && userPassword === password) return { ok: true, message: "Welcome" };
  if (userName !== login && userPassword === password) return { ok: false, input: 'login', message: "Логин введен неверно" };
  if (userName === login && userPassword !== password) return { ok: false, input: 'password', message: "Пароль введен неверно" };
  return { ok: false, message: "Пользователя не существует" };
};

export const setNewUser = (login, password) => {
  setUserAuthData({ name: login, password });
  store.dispatch(storeLogin(login, password));
};

export const setUser = (login, password) => {
  store.dispatch(storeLogin(login, password));
}

export const initUser = (userData) => {
  const { user, favorites, history } = userData;
  store.dispatch(storeLogin(user.login, user.password));
}