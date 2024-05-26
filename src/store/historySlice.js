/*-- HISTORY --*/

// Initial state:
const initialHistory = [];
// Action creators:
export function addHistory(newItem) {
    return {
        type: "history/add",
        payload: {
            newItem
        }
    };
}

export function initHistory(items) {
    return {
        type: "history/init",
        payload: items
    };
}

// Reducer:
export function historyReducer(state = initialHistory, action) {
    switch (action.type) {
        case "history/add":
            return [...state, action.payload.newItem];
        case "history/init":
            return [...action.payload];
        default:
            return state;
    }
}

