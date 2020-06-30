import Axios from '../configAxios';

export const addProduct = (product, redirect) => {
    return (dispatch, getState) => {
        const token = (getState().token)?getState().token : localStorage.getItem('token');
        Axios.post('/account/product/add', {...product      }, {headers: {"x-auth": token}})
            .then( response => {
                const {data} = response;
                if(data) {
                    redirect("/admin/product");
                }
            })
    }
}

export const updateProduct = (product, redirect) => {
    return (dispatch, getState) => {
        Axios.post('/account/product/update', {product}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const {data} = response;
                if(data) {
                    redirect("/admin/product/" + product._id);
                }
            })
            .catch(err => console.log(err))
    }
}

export const removeProduct = (id, redirect) => {
    return (dispatch, getState) => {
        Axios.post('/account/product/remove', {id}, {headers: {"x-auth": getState().token}})
            .then( response => {
                const data = response.data;
                if(data) {
                    if(data.success) {
                        redirect('/admin/product');
                    }
                }
            })
            .catch(err => console.log(err))
    }
}

export const setProduct = (product) => {
    return {
        type: "SET_PRODUCT",
        payload: product
    }
}

export const resetProduct = () => ({type: "RESET_PRODUCT"})

export const loadProduct = (id) => {
    return (dispatch, getState) => {
        Axios.get(`/product/${id}`)
            .then( response => {
                const data = response.data;
                if(data) {
                    dispatch(setProduct(data));
                }
            })
            .catch(err => console.log(err))
    }
}