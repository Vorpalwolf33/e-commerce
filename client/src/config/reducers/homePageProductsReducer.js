export default (state = [], action) => {
    switch(action.type) {
        case "SET_HOME_PAGE_PRODUCTS": 
            state = action.payload;
            break;
        case "RESET_HOME_PAGE_PRODUCTS":
            state = [];
            break;
        default: 
            break;    
    }
    return state;
}