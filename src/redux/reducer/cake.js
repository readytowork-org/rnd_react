import { BUY_CAKE } from "../actions";
import {initialState} from "../reducer";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numOfCake: state.numOfCake - 1
        }
        default: return state
    }
}