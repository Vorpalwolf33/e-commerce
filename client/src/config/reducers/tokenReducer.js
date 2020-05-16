export default (state = null, action) => {
    switch(action.type) {
        case "SET_TOKEN": 
            state = action.payload;
            break;
        case "RESET_TOKEN": 
            state = null;
            break;
        default: break;
    }
    return state;
}