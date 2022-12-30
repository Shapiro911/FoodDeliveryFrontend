import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RestaurantList } from "../RestaurantList/RestaurantList"

export const Router = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<RestaurantList />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}