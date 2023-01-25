import styles from "./DeliveryDetails.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons"
import { AddressSearchBar } from "../AddressSearchBar/AddressSearchBar"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { destinationAddress } from "../../store/restaurants/selectors"
import { AppDispatch } from "../../store"
import { changeDeliveryDetailsVisibility } from "../../store/helper/actionCreators"
import $ from "jquery"

export const DeliveryDetails = () => {
    const [changeAddressVisible, setChangeAddressVisible] = useState<boolean>(false);
    const [changeScheduleVisible, setChangeScheduleVisible] = useState<boolean>(false);
    const address = useSelector(destinationAddress);
    const dispatch: AppDispatch = useDispatch();

    const handleAddressVisibility = (): void => {
        setChangeAddressVisible(!changeAddressVisible);
    }

    const handleScheduleVisibility = (): void => {
        setChangeScheduleVisible(!changeScheduleVisible);
    }

    const handleClickInside = (event: React.MouseEvent): void => {
        event.stopPropagation();
    }

    const closeDeliveryDetails = (): void => {
        dispatch(changeDeliveryDetailsVisibility(false));
        $('body').css('overflow', 'auto');
    }

    return (
        <div className={styles.shade} onClick={closeDeliveryDetails}>
            <div className={styles.menu} onClick={(event) => { handleClickInside(event) }}>
                {(!changeAddressVisible && !changeScheduleVisible) &&
                    <>
                        <FontAwesomeIcon icon={faXmark} className={styles.close} onClick={closeDeliveryDetails} />
                        <h1>Delivery details</h1>
                        <div className={styles.details}>
                            <div className={styles.detailsBlock}>
                                <FontAwesomeIcon className={styles.mapMarker} icon={faLocationDot} />
                                <div>
                                    <h4>{address}</h4>
                                </div>
                                <button className={styles.detailsBtn} onClick={handleAddressVisibility}>Change</button>
                            </div>
                            <hr></hr>
                            <div className={styles.detailsBlock}>
                                <FontAwesomeIcon className={styles.clock} icon={faClock} />
                                <div>
                                    <h4>Now</h4>
                                </div>
                                <button className={styles.detailsBtn} onClick={handleScheduleVisibility}>Schedule</button>
                            </div>
                            <button className={styles.doneBtn} onClick={closeDeliveryDetails}>Done</button>
                        </div>
                    </>
                }
                {changeAddressVisible &&
                    <>
                        <FontAwesomeIcon icon={faXmark} className={styles.close} onClick={handleAddressVisibility} />
                        <AddressSearchBar />
                    </>
                }
                {changeScheduleVisible &&
                    <>
                        <FontAwesomeIcon icon={faXmark} className={styles.close} onClick={handleScheduleVisibility} />
                        <div></div>
                    </>
                }
            </div>
        </div>
    )
}