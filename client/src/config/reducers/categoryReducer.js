export default (state = null, action) => {
    switch(action.type) {
        case "SET_CATEGORIES": 
            state = action.payload;
            break;
        case "RESET_CATEGORIES":
            state = null;
            break;
        default: break;
    }
    return state;
}