import styles from "./RestaurantList.module.sass"
import { useState, useEffect } from "react";
import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { Restaurant } from "../../interfaces/restaurants.interface";
import { getRestaurants } from "../../store/restaurants/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { destinationLatLng, listLoading } from "../../store/restaurants/selectors";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SortList } from "../SortList/SortList";
import { SortValues } from "../../interfaces/restaurants.interface"
import ContentLoader from "styled-content-loader"

export const RestaurantList = () => {
    // const rList: Restaurant[] = useSelector(list);
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
    const [hasMore, setHasMore] = useState<Boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [pageMax] = useState<number>(21);
    const [sortValues, setSortValues] = useState<SortValues>({ sortBy: "popular", priceRange: [], fee: "0" });
    const isLoading = useSelector(listLoading);
    const dispatch: AppDispatch = useDispatch();
    const destination = useSelector(destinationLatLng);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        const newRestaurants: Restaurant[] = await dispatch(getRestaurants(destination));

        if (newRestaurants?.length > 0 && newRestaurants?.length !== pageMax) {
            setHasMore(false);
        }
        else {
            setRestaurantList([...restaurantList, ...newRestaurants]);
            console.log(newRestaurants)
        }
    }

    const showMore = async () => {
        setPage(page + 1);
    }

    const getSortValues = (sortValues: SortValues): void => {
        setSortValues(sortValues);
    }

    return (
        <>
            <Header scrolled={false} />
            <main className={styles.main}>
                <SortList sortValuesProp={sortValues} sendSortValues={getSortValues} />
                {isLoading || restaurantList.length === 0 ?
                    <div className={styles.restaurants}>
                        <div className={styles.list}>
                            {Array(12).fill(0).map((_, index) => {
                                return (
                                    <ContentLoader isLoading={isLoading} className={styles.loadingItem} key={index}>
                                        <div></div>
                                        <h3></h3>
                                        <p></p>
                                        <div className={styles.rating}></div>
                                    </ContentLoader>
                                );
                            }
                            )}
                        </div>
                    </div>
                    :
                    <div className={styles.restaurants}>
                        <div className={styles.list}>
                            {restaurantList && restaurantList.map((restaurant) => {
                                return (
                                    <RestaurantItem restaurant={restaurant} key={restaurant.id} />
                                )
                            })}
                        </div>
                        {hasMore && <button onClick={showMore} className={styles.showMore}>Show more</button>}
                    </div>}
            </main>
            <Footer />
        </>
    );
}