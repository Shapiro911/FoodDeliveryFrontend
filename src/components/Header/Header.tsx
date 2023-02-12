import styles from "./Header.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faCartShopping, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import logo from "../../assets/images/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { destinationAddress } from "../../store/restaurants/selectors"
import { useState } from "react"
import { DeliveryDetails } from "../DeliveryDetails/DeliveryDetails"
import { AppDispatch } from "../../store"
import { changeDeliveryDetailsVisibility } from "../../store/helper/actionCreators"
import { deliveryDetailsVisibility } from "../../store/helper/selectors"
import $ from "jquery"
import { Cart } from "../Cart/Cart"
import { cart } from "../../store/products/selectors"

export const Header = ({ scrolled }: { scrolled: boolean }) => {
    const address = useSelector(destinationAddress)
    const [cartVisibility, setCartVisibility] = useState<boolean>(false);
    const [cartTransition, setCartTransition] = useState<boolean>(false);
    const [cartTrigger, setCartTrigger] = useState<boolean>(false);
    const isdeliveryDetailsVisible = useSelector(deliveryDetailsVisibility);
    const cartProducts = useSelector(cart);
    const dispatch: AppDispatch = useDispatch();

    const handleCart = (visibility: boolean): void => {
        if (visibility) {
            setCartTrigger(!cartTrigger);
            setCartTransition(false);
        }
        setCartVisibility(visibility);
    }

    const openDeliveryDetails = (): void => {
        dispatch(changeDeliveryDetailsVisibility(true));
        $('body').css('overflow', 'hidden');
    }

    const handleCartTransition = (transition: boolean): void => {
        setCartTransition(transition);
    }

    return (
        <>
            <header className={`${scrolled ? styles.scrolled : ""} ${address ? "" : styles.headerHome}`}>
                <div className={styles.headerLeft}>
                    <FontAwesomeIcon className={styles.bars} icon={faBars} />
                    <a className="logo" href="/">
                        <img src={logo} alt="logo"></img>
                    </a>
                </div>
                {address ? <button className={styles.addressBtn} onClick={openDeliveryDetails}>{address}</button> : ""}
                {address ? <div className={styles.headerRight}>
                    <button className={`${styles.signUpBtn} ${styles.cartBtn}`} onClick={() => handleCart(true)}>
                        <FontAwesomeIcon className={styles.faCart} icon={faCartShopping} />
                        {cartProducts.length} cart
                        <FontAwesomeIcon className={styles.faChevron} icon={faChevronDown} /></button>
                    {cartVisibility && <Cart closeCart={handleCart} setCartTransition={handleCartTransition} cartTransition={cartTransition} trigger={cartTrigger} />}
                </div>
                    :
                    <div className={styles.headerRight}>
                        <button className={styles.logInBtn}>Log in</button>
                        <button className={styles.signUpBtn}>Sign up</button>
                    </div>}
            </header>
            {isdeliveryDetailsVisible && <DeliveryDetails />}
        </>
    )
}