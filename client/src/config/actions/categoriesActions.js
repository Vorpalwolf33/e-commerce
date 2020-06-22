import Axios from '../configAxios';

export const addCategory = (categoryName) => {
    return (dispatch, getState) => {
        Axios.post("/account/category/add", {name: categoryName} ,{headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(!getState().categories && data)  dispatch(setCategories([data]));
                else {
                    const state = getState().categories;
                    state.push(data);
                    dispatch(setCategories(state));
                }  
            })
            .catch(err => console.log(err))
    }
}

export const setCategories = (categories) => {
    return {
        type: "SET_CATEGORIES",
        payload: categories
    }
}

export const loadCategories = () => {
    return (dispatch, getState) => {
        Axios.get('/account/categories', {headers: {"x-auth": getState().token}})
            .then( response => {
                dispatch(setCategories(response.data));
            })
            .catch(err => console.log(err))
    }
}

export const removeCategory = (category) => {
    return (dispatch, getState) => {
        Axios.post('account/categories/remove', {_id: category._id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                if(response.data.status) {
                    let state = getState().categories;
                    state = state.filter( cat => category._id != cat._id);
                    dispatch(setCategories(state));
                }
            })
            .catch(err => console.log(err))
    }
}