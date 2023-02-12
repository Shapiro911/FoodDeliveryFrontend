import { RequestStatus } from "../../utils/enums";

export enum ActionType {
    CHANGE_CART = "changeCart"
}

export enum ActionTypeRequestStatus {
    REQUEST_PRODUCTS_LOADING = RequestStatus.LOADING,
    REQUEST_PRODUCTS_SUCCESS = RequestStatus.SUCCESS,
    REQUEST_PRODUCTS_FAILURE = RequestStatus.FAILURE
}