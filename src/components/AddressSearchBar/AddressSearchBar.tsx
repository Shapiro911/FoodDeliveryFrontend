import { useState } from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { addDestination } from "../../store/restaurants/actionCreators";
import styles from "./AddressSearchBar.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { changeDeliveryDetailsVisibility } from "../../store/helper/actionCreators";
import { NavigateFunction, useNavigate } from "react-router-dom";
import $ from "jquery"

export const AddressSearchBar = () => {
    const [address, setAddress] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    const handleChange = (address: string): void => {
        setAddress(address);
    }

    const handleSelect = async (address: string) => {
        const latLng = await geocodeByAddress(address)
            .then(results => getLatLng(results[0]));

        setAddress(address);
        dispatch(addDestination({
            address: address,
            latLng: [latLng.lat, latLng.lng]
        }));
        dispatch(changeDeliveryDetailsVisibility(false));
        navigate("/")
        $('body').css('overflow', 'auto');
    };

    const searchOptions = {
        location: new google.maps.LatLng(40.730610, -73.935242),
        componentRestrictions: { country: ['us'] },
        radius: 20000,
        types: ['address']
    }

    return (
        <div className={styles.autocomplete}>
            <PlacesAutocomplete value={address} onSelect={handleSelect} onChange={handleChange} searchOptions={searchOptions}>
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div className={styles.searchBar}>
                        <div className={styles.searchBarContainer}>
                            <FontAwesomeIcon className={styles.mapMarker} icon={faLocationDot} />
                            <input
                                {...getInputProps({
                                    placeholder: 'Enter delivery address',
                                    className: styles.input,
                                })}
                            />
                        </div>
                        <div className={styles.suggestionContainer}>
                            {suggestions.map(suggestion => {
                                return (
                                    <div className={styles.searchResultBox}
                                        {...getSuggestionItemProps(suggestion)}
                                        key={suggestion.placeId}
                                    >
                                        <FontAwesomeIcon className={styles.mapMarker} icon={faLocationDot} />
                                        <div className={styles.suggestion}>
                                            <h4>{suggestion.formattedSuggestion.mainText}</h4>
                                            <p className={styles.suggestionText}>{suggestion.formattedSuggestion.secondaryText}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
                }
            </PlacesAutocomplete >
            <button className={styles.findBtn} onClick={() => handleSelect(address)}>Find Food</button>
        </div >
    )
}