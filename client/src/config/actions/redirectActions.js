const { PromiseProvider } = require("mongoose");

export const setRedirect = (path) => {
    return {
        type: "SET_REDIRECT",
        payload: path
    }
}

export const resetRedirect = () => ({type: "RESET_REDIRECT"})