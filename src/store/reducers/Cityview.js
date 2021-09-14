import { CITYSUCCESS, CITYFAILL } from "../actiontype";
const initialState = {
    data: null,
    error: null
};

const Cityreducer = (state = initialState, action) => {
    switch (action.type) {
        case CITYSUCCESS:
            return {
                data:action.data
            }
        case CITYFAILL:
            return {
                error: action.error
            }
        default:
            return state;
    }
}
export default Cityreducer;