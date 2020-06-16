export const saveToken = () => {
    return (dispatch, getData) => {
        localStorage.setItem("token", JSON.stringify(getData().token) );
    }
}

export const setToken = (token) => {
    localStorage.setItem("token", token );
    return {
        type: "SET_TOKEN",
        payload: token
    }
}

export const resetToken = () => {
    localStorage.removeItem('token');
    return {type: "RESET_TOKEN"}
}

export const loadTokenFromLocalDevice = () => {
    const token = JSON.parse(localStorage.getItem('token')).token;
    return setToken(token);
}