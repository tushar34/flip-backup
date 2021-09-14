import { GETUSERSUCCESS, GETUSERFAIL,LOGOUTSUCCESS } from "../actiontype";
const initialState = {
    data: null,
    error: null,
};

const Userreducer = (state = initialState, action) => {
    switch (action.type) {
        case GETUSERSUCCESS:
            return {
                data: action.data
            }
        case GETUSERFAIL:
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
export default Userreducer;