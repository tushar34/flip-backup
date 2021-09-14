import { GETDATAOFSUBCATEGORYSUCCESS, GETDATAOFSUBCATEGORYFAIL } from "../actiontype";
const initialState = {
    data: null,
    error: null
};

const Productofsuccategoryreducer = (state = initialState, action) => {
    switch (action.type) {
        case GETDATAOFSUBCATEGORYSUCCESS:
            return {
                data:action.data
            }
        case GETDATAOFSUBCATEGORYFAIL:
            return {
                error: action.error
            }
        default:
            return state;
    }
}
export default Productofsuccategoryreducer;
