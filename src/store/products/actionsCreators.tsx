import { AppDispatch } from "..";
import { Category, ProductCart } from "../../interfaces/products.interface";
import { ActionType, ActionTypeRequestStatus } from "./actionTypes";

export const getProductsLoading = () => ({
    type: ActionTypeRequestStatus.REQUEST_PRODUCTS_LOADING
})

export const getProductsSuccess = () => ({
    type: ActionTypeRequestStatus.REQUEST_PRODUCTS_SUCCESS,
})

export const getProductsFailure = (error: string) => ({
    type: ActionTypeRequestStatus.REQUEST_PRODUCTS_FAILURE,
    payload: error
})

export const changeProductCart = (product: ProductCart[]) => ({
    type: ActionType.CHANGE_CART,
    payload: product
})

export const getProducts = (restaurantId: string | undefined): (dispatch: AppDispatch) => Promise<Category[]> => async (dispatch: AppDispatch) => {
    let res: Category[] = [];
    const param = `?restaurantId=${restaurantId}`;
    dispatch(getProductsLoading());
    await fetch(process.env.REACT_APP_API_KEY + "products" + param, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then((response) => {
        if (!response.ok) {
            throw Error("Could not fetch the data for that resource");
        }
        return response.json();
    }).then((data) => {
        dispatch(getProductsSuccess());
        return res = data;
    }).catch(err => {
        dispatch(getProductsFailure(err.message));
        return res = err.message;
    })
    return res;
}