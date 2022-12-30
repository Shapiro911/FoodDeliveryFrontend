import { Restaurant } from "../../../interfaces/restaurants.interface"

export const RestaurantItem = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div>{restaurant.name}</div>
    )
}