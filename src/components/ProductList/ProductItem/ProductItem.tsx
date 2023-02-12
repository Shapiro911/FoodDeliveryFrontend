import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Product, ProductCart } from "../../../interfaces/products.interface"
import { AppDispatch } from "../../../store"
import { changeProductCart } from "../../../store/products/actionsCreators"
import { cart } from "../../../store/products/selectors";
import { getImage } from "../../../store/restaurants/actionCreators";
import styles from "./ProductItem.module.sass"

export const ProductItem = ({ product }: { product: Product }) => {
    const [image, setImage] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();
    const cartProducts: ProductCart[] = useSelector(cart);

    const addToCart = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let productInCart = false;
        let cartProductsTemp = cartProducts;

        cartProducts.every((cartProduct, index) => {
            if (product.id === cartProduct.id) {
                cartProductsTemp[index].quantity++
                productInCart = true;
                dispatch(changeProductCart(cartProductsTemp));
                return false;
            }
            return true;
        })

        if (productInCart === false) {
            const productCart: ProductCart = { ...product, quantity: 1 };
            cartProductsTemp.push(productCart);
            dispatch(changeProductCart(cartProductsTemp));
        }
    }

    useEffect(() => {
        const fetchImages = async () => {
            const imageURL: string = await dispatch(getImage(product.img));
            setImage(imageURL);
        }

        fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    return (
        <div className={styles.product}>
            <div className={styles.productInfo}>
                <h2 className={styles.name}>{product.name}</h2>
                <p className={styles.price}>{product.price}$</p>
            </div>
            <div className={styles.image}>
                <img src={image} alt="dish"></img>
                <button className={styles.addBtn} onClick={(event) => { addToCart(event) }}><span>+</span></button>
            </div>
        </div>
    )
}