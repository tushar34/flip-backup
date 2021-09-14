import { DELETECARTITEMSUCCESS, DELETECARTITEMFAILL, CARTLISTSUCCESS, CARTLISTFAILL } from "../actiontype";
const initialState = {
    data: null,
    error: null,
    // id: null
};

const Usercartlistreducer = (state = initialState, action) => {
    switch (action.type) {
        case CARTLISTSUCCESS:
            return {
                data: action.data
            }
        case CARTLISTFAILL:
            return {
                error: action.error
            }
        case DELETECARTITEMSUCCESS:
            return {
                data: action.data
            }
        case DELETECARTITEMFAILL:
            return {
                error: action.error
            }

        default:
            return state;
    }
}
export default Usercartlistreducer;