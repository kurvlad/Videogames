const usedFields = ["name", "password", "history", "favorites"];

export const setUserAuthData = (data) => {
  localStorage.setItem("name", data.name);
  localStorage.setItem("password", data.password); // no encription or hash
};

export const getUserAuthData = (name) => {
  return [localStorage.getItem("name"), localStorage.getItem("password")];
};

export const setSessionUserData = (data) => {
  localStorage.setItem("history", JSON.stringify(data.history));
};

export const getUserSessionData = () => {
  const login = localStorage.getItem("name");
  const password = localStorage.getItem("password");
  if (login) {
    const history = getUserHistory(login);
    const favorites = getUSerFavoritesData(login);

    return { user: { login, password }, favorites, history };
  }
};
//История из localstorage
export const getUserHistory = () => {
  return JSON.parse(localStorage.getItem("history"));
};

//функция записи в историю
export const setUserHistory = (history) => {
  let arrUniqId = [];
  let histNew = history
    .map((item) => {
      if (arrUniqId.includes(item.id)) {
        return null;
      } else {
        arrUniqId.unshift(item.id);
        return item;
      }
    })
    .filter((item) => item !== null);

  localStorage.setItem("history", JSON.stringify(histNew));
};

// функция записывает и удаляет объект в localstorage
export const setUserFavorites = (favorites) => {
  localStorage.setItem("favorites", [JSON.stringify(favorites)]);
};

// возвращает массив объектов
export const getUSerFavoritesData = (name) => {
  return JSON.parse(localStorage.getItem("favorites"));
};

export const clearUserData = () => {
  usedFields.forEach((el) => localStorage.removeItem(el));
};
