import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { ProductCart } from "../../interfaces/products.interface"
import { cart } from "../../store/products/selectors"
import styles from "./Cart.module.sass"
import { CartItem } from "./CartItem/CartItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useOnClickOutside } from "../../utils/hooks"

export const Cart = ({ closeCart, setCartTransition, cartTransition, trigger }: { closeCart: Function, setCartTransition: Function, cartTransition: boolean, trigger: boolean }) => {
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const product: ProductCart[] = useSelector(cart);
    const cartRef = useRef<HTMLDivElement>(null);
    const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();

    useEffect(() => {
        let totalPrice = 0;
        product?.map((product) => {
            return totalPrice += product.price * product.quantity;
        })
        setTotalPrice(totalPrice);
    }, [product])

    useEffect(() => {
        handleTimeoutClear(timeoutState);
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [trigger])

    const handleCloseCart = (): void => {
        setCartTransition(true);
        handleTimeoutClear(timeoutState);
        const timeout = setTimeout(() => {
            setCartTransition(false);
            closeCart(false);
        }, 500)
        setTimeoutState(timeout);
    }

    const handleTimeoutClear = (timeout: NodeJS.Timeout | undefined) => {
        clearTimeout(timeout);
    }

    useOnClickOutside(cartRef, handleCloseCart);

    return (
        <div className={`${styles.cart} ${cartTransition && styles.cartTransition}`} ref={cartRef as React.RefObject<HTMLDivElement>}>
            <FontAwesomeIcon icon={faXmark} className={styles.close} onClick={handleCloseCart} />
            {
                product?.map((product) => {
                    return <CartItem product={product} key={product.id} />
                })
            }
            <button className={styles.checkoutBtn}>Go to checkout • <span>{totalPrice}$</span></button>
        </div >
    )
}