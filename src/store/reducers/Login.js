import { LOGINFAILL, LOGINSUCCESS, LOGOUTFAILL, LOGOUTSUCCESS } from "../actiontype";
const initialState = {
    token: null,
    error: null,
    username: null,
    phone_number: null,
    id: null,
    user_address:null,
};

const Loginreducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGINSUCCESS:
            return {
                token: action.token,
                id: action.user_id,
                username: action.user_name,
                phone_number: action.phone_number,
                user_address:action.user_address,
            }
        case LOGINFAILL:
            return {
                error: action.error
            }
        case LOGOUTSUCCESS:
            return {
                token: null,
                id: null,
                username:null,
                phone_number:null,
                user_address:null
            }
        case LOGOUTFAILL:
            return {
                error: action.error
            }
        default:
            return state;
    }
}
export default Loginreducer;