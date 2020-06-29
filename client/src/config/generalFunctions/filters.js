export const sortProductsByPrice = (products, sortBy) => {
    let temp;
    if(sortBy === 1) {
        for(let i = 0; i < products.length; ++i) {
            for(let j = 0; j < products.length - i - 1; ++j) {
                if(products[j].price > products[j + 1].price) {
                    temp = products[j]
                    products[j] = products[j + 1];
                    products[j + 1] = temp;
                }
            }
        }
    }
    if(sortBy === 2) {
        for(let i = 0; i < products.length; ++i) {
            for(let j = 0; j < products.length - i - 1; ++j) {
                if(products[j].price < products[j + 1].price) {
                    temp = products[j]
                    products[j] = products[j + 1];
                    products[j + 1] = temp;
                }
            }
        }
    }
    return products;
}