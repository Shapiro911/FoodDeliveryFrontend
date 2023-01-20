import { AddressSearchBar } from "../AddressSearchBar/AddressSearchBar"
import styles from "./Home.module.sass"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { useState, useEffect } from "react"

export const Home = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    const handleScroll = (): void => {
        if (window.pageYOffset > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])

    return (
        <>
            <Header scrolled={scrolled}></Header>
            <main className={styles.main}>
                <div className={styles.img}></div>
                <div className={styles.bannerBox}>
                    <h1>Order food to your door</h1>
                    <AddressSearchBar />
                </div>
            </main>
            <Footer />
        </>
    )
}