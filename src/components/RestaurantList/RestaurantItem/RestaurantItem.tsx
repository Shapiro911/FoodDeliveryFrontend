import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Restaurant } from "../../../interfaces/restaurants.interface"
import { AppDispatch } from "../../../store"
import { getImage } from "../../../store/restaurants/actionCreators"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons"
import { useHover } from "../../../utils/hooks"
import styles from "./RestaurantItem.module.sass"
import { NavLink } from "react-router-dom"

export const RestaurantItem = ({ restaurant }: { restaurant: Restaurant }) => {
    const [image, setImage] = useState<string>("");
    const [favourite, setFavourite] = useState<boolean>(false);
    const [hoverRef, isHovered] = useHover();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchImages = async () => {
            const imageURL: string = await dispatch(getImage(restaurant.img));
            setImage(imageURL);
        }

        fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    const addFavourite = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setFavourite(!favourite)
    }

    return (
        <NavLink className={styles.restaurant} to={`/restaurant/${restaurant.id}`} state={{ restaurant: restaurant }}>
            <div className={styles.image}>
                <img src={image} alt="restaurantImage" className={styles.img}></img>
                <div ref={hoverRef as React.RefObject<HTMLDivElement>}>
                    <FontAwesomeIcon className={`${styles.favourite} ${favourite ? styles.favouriteChecked : ""}`} icon={favourite || isHovered ? faHeart : farHeart} onClick={(event) => { addFavourite(event) }} />
                </div>
                <div className={styles.blur}></div>
            </div>
            <div className={styles.info}>
                <div className={styles.name}>
                    <h3>{restaurant.name}</h3>
                    <div className={styles.rating}>{restaurant.rating}</div>
                </div>
                <p><span className={styles.fee}>{restaurant.fee === 0 ? "No" : restaurant.fee + "$"} fee</span> • <span className={styles.duration}>{restaurant.duration} min</span></p>
            </div>
        </NavLink>
    )
}