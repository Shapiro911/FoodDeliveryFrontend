import { RootState } from "..";
import { RequestStatus } from "../../utils/enums";

export const cart = (state: RootState) => (state.products.cart);
export const productListLoading = (state: RootState) => (state.products.request.status === RequestStatus.LOADING);