/*-- USER --*/

// Initial state:
const initialStateUser = {
    login: "",
    password: "",
    avatar: "https://i.pravatar.cc/100?u=zz",
    isAuthenticated: false
}
// Action creators:
export function login(login, password) {
    return {
        type: "user/login",
        payload: {
            login,
            password
        }
    };

}
export function logout() {
    return {
        type: "user/logout"
    };
}

// Reducer:
export function userReducer(state = initialStateUser, action) {
    switch (action.type) {
        case "user/login":
            return {
                ...state,
                login: action.payload.login,
                password: action.payload.password,
                isAuthenticated: true,
            };
        case "user/logout":
            return {
                ...state,
                user: '',
                password: '',
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

