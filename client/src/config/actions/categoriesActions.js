import Axios from '../configAxios';

export const addCategory = (categoryName) => {
    return (dispatch, getState) => {
        const token = (getState().token)?getState().token:localStorage.getItem('token');
        Axios.post("/account/category/add", {name: categoryName} ,{headers: {"x-auth": token}})
            .then( response => {
                const data = response.data;
                if(!getState().categories && data)  dispatch(setCategories([data]));
                else {
                    const categories = [...getState().categories];
                    categories.push(data);
                    dispatch(setCategories(categories));
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
        const token = (getState().token)?getState().token:localStorage.getItem('token');
        Axios.get('/account/categories', {headers: {"x-auth": token}})
            .then( response => {
                dispatch(setCategories(response.data));
            })
            .catch(err => console.log(err))
    }
}

export const removeCategory = (category) => {
    return (dispatch, getState) => {
        Axios.post('account/category/remove', {_id: category._id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                if(response.data.status) {
                    let state = getState().categories;
                    state = state.filter( cat => category._id !== cat._id);
                    dispatch(setCategories(state));
                }
            })
            .catch(err => console.log(err))
    }
}

export const updateCategory = (category) => {
    return (dispatch, getState) => {
        Axios.post('/account/category/update', {category}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data) {
                    const categories = [...getState().categories];
                    for(let i = 0; i < categories.length; ++i) {
                        if(categories[i]._id === data._id) {
                            categories[i] = data;
                            break;
                        }
                    }
                    dispatch(setCategories(categories));                
                }
            })
            .catch(err => console.log(err))
    }
}