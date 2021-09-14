import { GETPRODUCTFAILL, GETPRODUCTSUCCESS } from "../actiontype";
const initialState = {
    product_data: null,
    error: null
};

const Getallproductreducer = (state = initialState, action) => {
    switch (action.type) {
        case GETPRODUCTSUCCESS:
            return {
                product_data:action.data
            }
        case GETPRODUCTFAILL:
            return {
                error: action.error
            }
        default:
            return state;
    }
}
export default Getallproductreducer;