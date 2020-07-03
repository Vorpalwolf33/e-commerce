export const imageParser = (array = []) => {
    const typedArray = new Uint8Array(array);
    const stringChar = String.fromCharCode.apply(null, typedArray);
    const base64String = btoa(stringChar);
    const imageUrl = 'data:image/jpg;base64,' + base64String;
    return imageUrl;
}

export const cartProductsImageParser = (cart) => {
    cart.forEach( (item, index) => {
        cart[index].product.images[0].img = imageParser(item.product.images[0].file.data);
    })  
}