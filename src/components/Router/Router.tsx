import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { destinationAddress } from "../../store/restaurants/selectors"
import { RestaurantList } from "../RestaurantList/RestaurantList"
import { Home } from "../Home/Home"
import { ProductList } from "../ProductList/ProductList"

export const Router = () => {
    const address = useSelector(destinationAddress)
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    {!address ?
                        <Route path="/" element={<Home />} /> :
                        <Route path="/" element={<RestaurantList />} />}
                    <Route path='/restaurant'>
                        <Route index element={<ProductList />} />
                        <Route path=':restaurantId' element={<ProductList />} />
                    </Route>
                    <Route path='*' element={<h3>Error 404</h3>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}