import styles from "./Header.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faCartShopping, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import logo from "../../assets/images/logo.png"
import { useSelector } from "react-redux"
import { destinationAddress } from "../../store/restaurants/selectors"
import { useState } from "react"

export const Header = ({ scrolled }: { scrolled: boolean }) => {
    const address = useSelector(destinationAddress)
    const [cartVisibility, setCartVisibility] = useState<boolean>(false);

    const handleCart = (): void => {
        setCartVisibility(!cartVisibility);
    }

    return (
        <header className={`${scrolled ? styles.scrolled : ""} ${address ? "" : styles.headerHome}`}>
            <div className={styles.headerLeft}>
                <FontAwesomeIcon className={styles.bars} icon={faBars} />
                <a className="logo" href="/">
                    <img src={logo} alt="logo"></img>
                </a>
            </div>
            {address ? <button className={styles.addressBtn}>{address}</button> : ""}
            {address ? <div className={styles.headerRight}>
                <button className={`${styles.signUpBtn} ${styles.cartBtn}`} onClick={handleCart}>
                    <FontAwesomeIcon className={styles.faCart} icon={faCartShopping} />
                    { } cart
                    <FontAwesomeIcon className={styles.faChevron} icon={faChevronDown} /></button>
                <div className={styles.cart}>
                    { }
                </div>
            </div>
                :
                <div className={styles.headerRight}>
                    <button className={styles.logInBtn}>Log in</button>
                    <button className={styles.signUpBtn}>Sign up</button>
                </div>}
        </header>
    )
}