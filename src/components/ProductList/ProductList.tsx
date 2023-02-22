import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Category } from "../../interfaces/products.interface"
import { AppDispatch } from "../../store";
import { productListLoading } from "../../store/products/selectors";
import ContentLoader from "styled-content-loader"
import styles from "./ProductList.module.sass"
import { getProducts } from "../../store/products/actionsCreators";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { useLocation, useParams } from "react-router";
import { ProductCategory } from "./ProductCategory/ProductCategory";
import { ProductAside } from "../ProductAside/ProductAside";
import { Restaurant } from "../../interfaces/restaurants.interface";
import { useWindowDimensions } from "../../utils/hooks";

export const ProductList = () => {
    const [productList, setProductList] = useState<Category[]>([]);
    const dispatch: AppDispatch = useDispatch();
    const isLoading = useSelector(productListLoading);
    const location = useLocation();
    const { state } = location;
    const [restaurant] = useState<Restaurant>(state.restaurant);
    const { height, width } = useWindowDimensions();
    const { restaurantId } = useParams();

    useEffect(() => {
        document.title = restaurant.name;
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [restaurantId])

    const fetchData = async () => {
        const productList: Category[] = await dispatch(getProducts(restaurantId));
        setProductList(productList);
    }

    return (
        <>
            <Header scrolled={false} />
            <main className={`${styles.main} + container`}>
                <div className={styles.productList}>
                    {isLoading ?
                        <>
                            <ContentLoader isLoading={isLoading} className={styles.loadingRestaurantInfo}>
                                <h1>0</h1>
                                <p>0</p>
                                <p>0</p>
                            </ContentLoader>
                            <div className={styles.loadingList}>
                                {Array(12).fill(0).map((_, index) => {
                                    return (
                                        <ContentLoader isLoading={isLoading} className={styles.loadingItem} key={index}>
                                            <div>0</div>
                                            <h3>0</h3>
                                            <p>0</p>
                                        </ContentLoader>
                                    );
                                }
                                )}
                            </div>
                        </ >
                        :
                        <>
                            <div className={styles.restaurantInfo}>
                                <h1>{restaurant.name}</h1>
                                <p><span>{restaurant.rating}</span> • <span>{(() => {
                                    let price = "$";
                                    for (let i = 1; i < restaurant.price; i++) {
                                        price += "$";
                                    }
                                    return price
                                })()}
                                </span></p>
                                <p className={styles.duration}><span>{restaurant.fee === 0 ? "No" : restaurant.fee + "$"} fee</span> • <span>{restaurant.duration} min</span></p>
                            </div>
                            <div className={styles.selection}>
                                {width > 480 && height ? <ProductAside productList={productList} /> : ""}
                                <div className={styles.list}>
                                    {productList.length > 0 && productList?.map((productCategory) => {
                                        return (
                                            <ProductCategory category={productCategory} key={productCategory.category} />
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </main>
            <Footer />
        </>
    )
}