import { AnyAction } from "redux";
import { ProductCart } from "../../interfaces/products.interface";
import { Request } from "../../interfaces/restaurants.interface";
import { RequestStatus } from "../../utils/enums";
import { ActionType, ActionTypeRequestStatus } from "./actionTypes";

type productsState = {
    cart: ProductCart[],
    request: Request
}

const initialState: productsState = {
    cart: [],
    request: { status: RequestStatus.IDLE, error: "" }
}

export const productsReducer = (state: productsState = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionTypeRequestStatus.REQUEST_PRODUCTS_LOADING:
            return {
                ...state,
                request: { ...state.request, status: RequestStatus.LOADING }
            }
        case ActionTypeRequestStatus.REQUEST_PRODUCTS_SUCCESS:
            return {
                ...state,
                request: {
                    ...state.request, status: RequestStatus.SUCCESS
                }
            }
        case ActionTypeRequestStatus.REQUEST_PRODUCTS_FAILURE:
            return {
                ...state,
                request: { ...state.request, status: RequestStatus.FAILURE, error: action.payload }
            }
        case ActionType.CHANGE_CART:
            return {
                ...state,
                cart: [...action.payload]
            }
        default:
            return state;
    }
}