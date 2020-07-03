import Axios from '../configAxios';

import {imageParser} from '../generalFunctions/imageParser';

export const addProduct = (product, redirect) => {
    return (dispatch, getState) => {
        const data = new FormData();
        delete product.image;
        delete product.displayImage;
        for( let key in product) {
            data.append(key, product[key]);
        }
        Axios.post('/account/product/add', data, {headers: {"x-auth": getState().token}})
            .then( response => {
                const {data} = response;
                if(data) {
                    redirect("/admin/product");
                }
            })
    }
}

export const updateProduct = (product, redirect) => {
    const data = new FormData();
    delete product.image;
    delete product.displayImage;
    product.images = product.images[0].filename;
    for(let key in product) {
        data.append(key, product[key]);
    }
    return (dispatch, getState) => {
        Axios.post('/account/product/update', data, {headers: {"x-auth": getState().token}})
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
                        redirect(`/admin/product`);
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
                    if(data.images.length > 0) {
                        data.images[0].img = imageParser(data.images[0].file.data);
                    }
                        dispatch(setProduct(data));
                }
            })
            .catch(err => console.log(err))
    }
}