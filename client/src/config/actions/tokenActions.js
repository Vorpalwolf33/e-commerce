export const saveToken = (token) => {
    localStorage.setItem("token", token );
}

export const setToken = (token) => {
    saveToken(token);
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
    const token = localStorage.getItem('token').token;
    console.log(token);
    return setToken(token);
}