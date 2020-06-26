export default (state = null, action) => {
    switch(action.type) {
        case "SET_CART_PRODUCTS":
            state = action.payload;
            break;
        case "RESET_CART_PRODUCTS":
            state = null;
            break;
        default: break;
    }
    return state;
}