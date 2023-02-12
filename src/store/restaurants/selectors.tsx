import { RootState } from "..";
import { RequestStatus } from "../../utils/enums";

export const destinationLatLng = (state: RootState) => (state.restaurants?.destination?.latLng);
export const destinationAddress = (state: RootState) => (state.restaurants?.destination?.address);
export const restaurantListLoading = (state: RootState) => (state.restaurants.request.status === RequestStatus.LOADING);
export const restaurantListError = (state: RootState) => (state.restaurants.request.error);