import {
    SET_USER,
    SET_ROLES,
    SET_CATEGORIES,
} from "../actionTypes";

const initialState = {
    user: {},
    addressList: [],
    creditCards: [],
    roles: [],
    theme: "",
    language: "",
    categories: [],
};

export default function clientReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case SET_ROLES:
            return {
                ...state,
                roles: action.payload,
            };

        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        default:
            return state;
    }
}