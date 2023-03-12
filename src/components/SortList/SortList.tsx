import { SortValues } from "../../interfaces/restaurants.interface";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./SortList.module.sass"

export const SortList = ({ sortValuesProp, sendSortValues }: { sortValuesProp: SortValues, sendSortValues: Function }) => {
    const [priceRange, setPriceRange] = useState<number[]>([]);
    const [isOpenSort, setOpenSort] = useState<boolean>(true);
    const [isOpenPrice, setOpenPrice] = useState<boolean>(true);
    const [isOpenFee, setOpenFee] = useState<boolean>(true);
    const [rangeValue, setRangeValue] = useState<string>(sortValuesProp.fee)

    const handleSort = (key: keyof SortValues, value: any): void => {
        const sortValues = sortValuesProp;
        sortValues[key] = value;
        sendSortValues(sortValues);
    }

    const changePriceRange = (value: number): void => {
        const priceRangeTemp = [...priceRange];
        if (priceRangeTemp.findIndex(number => number === value) !== -1) {
            priceRangeTemp.splice(priceRangeTemp.findIndex(number => number === value), 1);
        }
        else { priceRangeTemp.push(value); }
        setPriceRange(priceRangeTemp);
        handleSort("priceRange", priceRangeTemp)
    }

    const setActive = (event: React.SyntheticEvent): void => {
        event.currentTarget.classList.toggle('activeBtn');
    }

    return (
        <aside className={styles.aside}>
            <details open={true} className={styles.sortBy}>
                <summary onClick={() => { setOpenSort(!isOpenSort) }}>Sort
                    {isOpenSort ?
                        <FontAwesomeIcon className={styles.summaryArrow} icon={faAngleDown} />
                        :
                        <FontAwesomeIcon className={styles.summaryArrow} icon={faAngleUp} />
                    }
                </summary>
                <label className={styles.radioLabel} id="sort">
                    <input onClick={() => handleSort("sortBy", "popular")} type="radio" defaultChecked name="sort" className={styles.radio}></input>
                    <span className={styles.radioCheckmark}></span>
                    Most popular (default)
                </label>
                <label className={styles.radioLabel} id="sort">
                    <input onClick={() => handleSort("sortBy", "rating")} type="radio" name="sort" className={styles.radio}></input>
                    <span className={styles.radioCheckmark}></span>
                    Rating
                </label>
                <label className={styles.radioLabel} id="sort">
                    <input onClick={() => handleSort("sortBy", "time")} type="radio" name="sort" className={styles.radio}></input>
                    <span className={styles.radioCheckmark}></span>
                    Delivery time
                </label>
            </details>
            <details open={true}>
                <summary onClick={() => { setOpenPrice(!isOpenPrice) }}>Price range
                    {priceRange.length > 0 ? <div className={styles.active}>{priceRange.length}</div> : <></>}
                    {isOpenPrice ?
                        <FontAwesomeIcon className={styles.summaryArrow} icon={faAngleDown} />
                        :
                        <FontAwesomeIcon className={styles.summaryArrow} icon={faAngleUp} />
                    }</summary>
                <div className={styles.priceBtns}>
                    <button data-testid="priceRange" onClick={(event) => { setActive(event); changePriceRange(1); }}>$</button>
                    <button data-testid="priceRange" onClick={(event) => { setActive(event); changePriceRange(2); }}>$$</button>
                    <button data-testid="priceRange" onClick={(event) => { setActive(event); changePriceRange(3); }}>$$$</button>
                    <button data-testid="priceRange" onClick={(event) => { setActive(event); changePriceRange(4); }}>$$$$</button>
                </div>
            </details>
            <details open={true}>
                <summary onClick={() => { setOpenFee(!isOpenFee) }}>Max. Delivery Fee
                    {isOpenFee ?
                        <FontAwesomeIcon className={styles.summaryArrow} icon={faAngleDown} />
                        :
                        <FontAwesomeIcon className={styles.summaryArrow} icon={faAngleUp} />
                    }</summary>
                <div className={styles.fee}>
                    <input type="range" className={styles.range} id="fee" value={rangeValue} min="0" max="8" step="1" onChange={(input) => { setRangeValue(input.target.value) }} onMouseUp={() => { handleSort("fee", rangeValue) }}></input>
                    <output id="fee">${rangeValue === "8" ? "7+" : rangeValue}</output>
                </div>
            </details>
        </aside >
    )
}