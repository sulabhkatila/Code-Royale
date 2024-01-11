import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        return {
            ...state,
            user: action.payload
        };
        case "LOGOUT":
        localStorage.clear();
        return {
            ...state,
            user: null,
            token: null,
        };
        default:
        return state;
    }
}

export const AuthContextProvider = ({children}) => {
    return (
        <AuthContext.Provider value={useReducer(authReducer, {
            user: JSON.parse(localStorage.getItem("user")) || null
        })}>
            {children}
        </AuthContext.Provider>
    )
}