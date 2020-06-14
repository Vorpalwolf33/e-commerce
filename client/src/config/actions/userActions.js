import Axios from '../configAxios';

export const userLogin = (userData) => {
    return (dispatch, getData) => {
        Axios.post('/login', userData)
            .then( (response => {
                if(response) {
                    const user = response.data.user;
                    dispatch(setUser(user));
                }
            }))
            .catch( err => console.log(err))
    }
}

export const setUser = (userData) => {
    console.log(userData);
    return {
        payload: userData
    }
}