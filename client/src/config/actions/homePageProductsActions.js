import Axios from '../configAxios';

import {imageParser} from '../generalFunctions/imageParser';

export const loadHomePageProducts = () => {
    return (dispatch, getState) => {
        const token = getState().token;
        Axios.get(`${(token)?'/account':''}/homePageProducts`, (token)?{headers: {"x-auth": token}}:{})
            .then( response => {
                const homePageProducts = response.data;
                if(homePageProducts.length > 0)  {
                    // console.log(homePageProducts);
                    homePageProducts.forEach( (cat, index) => {
                        cat.products.forEach( (product, ind) => {
                            homePageProducts[index].products[ind].images[0].img = imageParser(product.images[0].file.data);
                        })
                    })
                    dispatch( setHomePageProducts(homePageProducts) );
                }
                
                // To test the functionality when the products are available
                else dispatch(setHomePageProducts([
                    {type: 'a', products: ['a', 'b', 'c']},
                    {type: 'b', products: ['a', 'b', 'c']}
                ]));

            })
            .catch(err => console.log(err))
    }
}

export const setHomePageProducts = (homePageProducts) => {
    return {
        type: "SET_HOME_PAGE_PRODUCTS",
        payload: homePageProducts
    }
}

export const resetHomePageProducts = () => {
    return {
        type: "RESET_HOME_PAGE_PRODUCTS"
    }
}