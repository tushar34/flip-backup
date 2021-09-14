import { ADDTOCARTSUCCESS, ADDTOCARTFAILL, REMOVETOCARTSUCCESS, REMOVETOCARTFAILL } from "../actiontype";
const initialState = {
    data: [],
    error: null,
    // id: null
};

const Addtocartreducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDTOCARTSUCCESS:
            return {
                data: action.data
            }
        case ADDTOCARTFAILL:
            return {
                error: action.error
            }
        case REMOVETOCARTSUCCESS:
            return {
                data: action.data
            }
        case REMOVETOCARTFAILL:
            return {
                error: action.error
            }

        default:
            return state;
    }
}
export default Addtocartreducer;