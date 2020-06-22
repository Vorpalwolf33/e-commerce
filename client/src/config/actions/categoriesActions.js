import Axios from '../configAxios';

export const addCategory = (categoryName) => {
    return (dispatch, getState) => {
        Axios.post("/account/category/add", {name: categoryName} ,{headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(!getState().categories)  dispatch(setCategories([data]));
                else    dispatch(addCategoryToList(data));
            })
            .catch()
    }
}

export const setCategories = (categories) => {
    return {
        type: "SET_CATEGORIES",
        payload: categories
    }
}

export const addCategoryToList = (category) => {
    return {
        type: "ADD_CATEGORY",
        payload: category
    }
}