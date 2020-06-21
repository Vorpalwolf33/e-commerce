export default (state = null, action) => {
    switch(action.type) {
        case "SET_PRODUCTS_LIST":
            state = action.payload;
            break;
        case "RESET_PRODUCTS_LIST":
            state = null;
            break;
        default: break;
    }
    return state;
}