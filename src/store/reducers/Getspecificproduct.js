import { GETSPECIFICPRODUCTFAILL, GETSPECIFICPRODUCTSUCCESS } from "../actiontype";
const initialState = {
    data: null,
    error: null,

};

const Getspecificproductreducer = (state = initialState, action) => {
    switch (action.type) {
        case GETSPECIFICPRODUCTSUCCESS:
            return {
                data: action.data
            }
        case GETSPECIFICPRODUCTFAILL:
            return {
                error: action.error
            }
        default:
            return state;
    }
}
export default Getspecificproductreducer;