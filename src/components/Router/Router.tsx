import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { destinationAddress } from "../../store/restaurants/selectors"
import { RestaurantList } from "../RestaurantList/RestaurantList"
import { Home } from "../Home/Home"

export const Router = () => {
    const address = useSelector(destinationAddress)
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    {!address || address === undefined ?
                        <Route path="/" element={<Home />} /> :
                        <Route path="/" element={<RestaurantList />} />}
                </Routes>
            </div>
        </BrowserRouter>
    )
}