import styles from "./Footer.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons"
import logo from "../../assets/images/logo.png"

export const Footer = () => {
    return (
        <footer>
            <div className={styles.footerHigh}>
                <div className={styles.footerLogo}>
                    <a className="logo" href="/">
                        <img src={logo} alt="logo"></img>
                    </a>
                </div>
                <div className={styles.footerLinks}>
                    <ul>
                        <li><a href="/">Restaurants near me</a></li>
                        <li><a href="/">Get Help</a></li>
                        <li><a href="/">Add restaurant</a></li>
                        <li><a href="/">Sign up to deliver</a></li>
                        <li><a href="/">Create a business account</a></li>
                        <li><a href="/">Pickup near me</a></li>
                        <li><a href="/">About us</a></li>
                    </ul>
                </div>
            </div>
            <hr></hr>
            <div className={styles.footerLow}>
                <div className={styles.media}>
                    <FontAwesomeIcon className={styles.icon} icon={faSquareFacebook} />
                    <FontAwesomeIcon className={styles.icon} icon={faTwitter} />
                    <FontAwesomeIcon className={styles.icon} icon={faInstagram} />
                </div>
                <p className={styles.copyright}>© {new Date().getFullYear()} Copyrighted.</p>
            </div>
        </footer>
    )
}