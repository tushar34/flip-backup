import { GETADDRESSSUCCESS, GETADDRESSFAILL,LOGOUTSUCCESS } from "../actiontype";
const initialState = {
    data: null,
    error: null,
    // id: null
};

const Addressreducer = (state = initialState, action) => {
    switch (action.type) {
        case GETADDRESSSUCCESS:
            return {
                data: action.data
            }
        case GETADDRESSFAILL:
            return {
                error: action.error
            }
        case LOGOUTSUCCESS:
            return {
                data: null
            }

        default:
            return state;
    }
}
export default Addressreducer;