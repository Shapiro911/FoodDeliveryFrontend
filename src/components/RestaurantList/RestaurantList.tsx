import styles from "./RestaurantList.module.sass"
import { useEffect, useState } from "react";
import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { Restaurant } from "../../interfaces/restaurants.interface";
import { getRestaurants } from "../../store/restaurants/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

export const RestaurantList = () => {
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
    const [hasMore, setHasMore] = useState<Boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [pageMax] = useState<number>(20);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async (): Promise<any> => {
        const newRestaurants: Restaurant[] = await dispatch(getRestaurants());

        if (newRestaurants?.length !== pageMax) {
            setHasMore(false);
        }

        setRestaurantList([...restaurantList, ...newRestaurants])
    }

    const showMore = (): void => {
        setPage(page + 1);
    }

    return (
        <div className={styles.list}>
            {restaurantList && restaurantList.map((restaurant) => {
                return (
                    <RestaurantItem restaurant={restaurant} key={restaurant.id} />
                )
            })}
            {hasMore && <button onClick={showMore}>Show More</button>}
        </div>
    );
}