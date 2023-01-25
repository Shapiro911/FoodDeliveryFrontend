import { RootState } from "..";

export const listError = (state: RootState) => (state.restaurants.request.error);
export const deliveryDetailsVisibility = (state: RootState) => (state.helper.deliveryDetailsVisibility);