import { useDispatch, useSelector } from "react-redux"
import { ProductCart } from "../../../interfaces/products.interface"
import { AppDispatch } from "../../../store"
import styles from "./CartItem.module.sass"
import React from "react"
import { changeProductCart } from "../../../store/products/actionsCreators"
import { cart } from "../../../store/products/selectors"

export const CartItem = ({ product }: { product: ProductCart }) => {
    const dispatch: AppDispatch = useDispatch();
    const cartProducts: ProductCart[] = useSelector(cart);

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = parseInt(event.target.value);
        let cartProductsTemp = cartProducts;

        cartProducts.every((cartProduct, index) => {
            if (product.id === cartProduct.id) {
                cartProductsTemp[index].quantity = quantity;

                if (quantity <= 0) {
                    cartProductsTemp.splice(index, 1)
                }
                return false;
            }
            return true;
        })

        dispatch(changeProductCart(cartProductsTemp));
    }

    return (
        <div className={styles.product}>
            <select value={product.quantity} size={1} onChange={(event) => { changeQuantity(event) }}>
                <option value={0}>Remove</option>
                {[...Array(100)].map((_, i) => {
                    i++
                    return <option value={i} key={i}>{i}</option>
                })}
            </select>
            <h3>{product.name}</h3>
            <h4>{product.price * product.quantity}$</h4>
        </div >
    )
}