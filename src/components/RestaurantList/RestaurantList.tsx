import styles from "./RestaurantList.module.sass"
import { useState, useEffect, PropsWithChildren, ChangeEvent } from "react";
import { RestaurantItem } from "./RestaurantItem/RestaurantItem";
import { Restaurant } from "../../interfaces/restaurants.interface";
import { getRestaurants } from "../../store/restaurants/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { destinationLatLng, restaurantListLoading } from "../../store/restaurants/selectors";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SortList } from "../SortList/SortList";
import { SortValues } from "../../interfaces/restaurants.interface"
import { CircularProgress } from "@mui/material";
import ContentLoader from "styled-content-loader"
import { PAGE_LIMIT } from "../../utils/const";
import { useWindowDimensions } from "../../utils/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export const RestaurantList: React.FC<PropsWithChildren> = () => {
    const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [pageMax] = useState<number>(PAGE_LIMIT);
    const [search, setSearch] = useState<string>("");
    const [sortValues, setSortValues] = useState<SortValues>({ sortBy: "popular", priceRange: [], fee: "0" });
    const [isOpenSort, setOpenSort] = useState<boolean>(true);
    const { height, width } = useWindowDimensions();
    const isLoading = useSelector(restaurantListLoading);
    const dispatch: AppDispatch = useDispatch();
    const destination = useSelector(destinationLatLng);

    useEffect(() => {
        if (page === 1) {
            fetchData([]);
        } else {
            fetchData(restaurantList)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [page, destination]);

    const fetchData = async (restaurantList: Restaurant[]) => {
        const newRestaurants: Restaurant[] = await dispatch(getRestaurants(destination, sortValues, page, pageMax, search));
        if (newRestaurants?.length !== pageMax) {
            setHasMore(false);
            setRestaurantList([...restaurantList, ...newRestaurants]);
        }
        else {
            setHasMore(true);
            setRestaurantList([...restaurantList, ...newRestaurants]);
        }
    }

    const showMore = (): void => {
        setPage(page + 1);
    }

    const getSortValues = (sortValues: SortValues): void => {
        setSortValues(sortValues);
        setRestaurantList([])
        if (page === 1) {
            fetchData([]);
        } else {
            setPage(1);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            setRestaurantList([])
            if (page === 1) {
                fetchData([]);
            } else {
                setPage(1);
            }
        }, 500);

        return () => clearTimeout(searchTimeout);
    }, [search])

    return (
        <>
            <Header scrolled={false} />
            <main className={styles.main}>
                {width > 480 && height ?
                    <>
                        <div className={styles.aside}>
                            {isLoading ?
                                <ContentLoader isLoading={isLoading} className={styles.sortLoader}>
                                    <p className={styles.loadingSort}>0</p>
                                </ContentLoader> : ""}
                            <SortList sortValuesProp={sortValues} sendSortValues={getSortValues} />
                        </div>
                    </>
                    :
                    <details className={styles.filterDetails}>
                        <summary className={styles.filterDetailsSummary} onClick={() => { setOpenSort(!isOpenSort) }}>Filter
                            {isOpenSort ?
                                <FontAwesomeIcon className={styles.summaryArrow} icon={faAngleDown} />
                                :
                                <FontAwesomeIcon className={styles.summaryArrow} icon={faAngleUp} />
                            }
                        </summary>
                        <SortList sortValuesProp={sortValues} sendSortValues={getSortValues} />
                    </details>}
                <div className={styles.restaurants}>
                    <input value={search} onChange={(event) => { handleChange(event) }} placeholder="Find restaurant" className={styles.searchBar} />
                    {isLoading && restaurantList.length === 0 ?
                        <div className={styles.list}>
                            {Array(12).fill(0).map((_, index) => {
                                return (
                                    <ContentLoader isLoading={isLoading} className={styles.loadingItem} key={index}>
                                        <div>0</div>
                                        <h3>0</h3>
                                        <p>0</p>
                                        <div className={styles.rating}></div>
                                    </ContentLoader>
                                );
                            }
                            )}
                        </div>
                        :
                        <>
                            {restaurantList.length !== 0 ?
                                <div className={styles.list}>
                                    {restaurantList.map((restaurant) => {
                                        return (
                                            <RestaurantItem restaurant={restaurant} key={restaurant.id} />
                                        )
                                    })}
                                </div> :
                                <h2 className={styles.noResults}>No results</h2>}
                        </>}
                    <div className={styles.showMore}>
                        {isLoading && restaurantList.length !== 0 ?
                            <CircularProgress size={100} color="inherit" thickness={5} /> :
                            <>{(hasMore && !isLoading) && <button onClick={showMore} className={styles.showMoreBtn}>Show more</button>}</>
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}