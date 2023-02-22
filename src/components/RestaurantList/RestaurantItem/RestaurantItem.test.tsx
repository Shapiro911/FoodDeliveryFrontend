import { cleanup, fireEvent } from "@testing-library/react";
import { RestaurantItem } from "./RestaurantItem";

import { renderWithProviders } from "../../../utils/test.utils";

describe("Restaurant tests", () => {
    afterEach(cleanup);

    it("Renders correctly", () => {
        const restaurant = { id: "", img: "", name: "", duration: "", fee: 0, rating: 0, price: 0 };
        const { getByTestId, getAllByRole } = renderWithProviders(<RestaurantItem restaurant={restaurant} />);

        expect(getByTestId("favouriteBtn")).toBeInTheDocument();
        expect(getAllByRole("img").length).toEqual(1);
    })

    it("Boolean favourite in state changed, when button clicked", () => {
        const restaurant = { id: "", img: "", name: "", duration: "", fee: 0, rating: 0, price: 0 };
        const { getByTestId } = renderWithProviders(<RestaurantItem restaurant={restaurant} />);

        const favouriteBtn = getByTestId("favouriteBtn");
        expect(favouriteBtn).toHaveClass("unchecked");

        fireEvent.click(getByTestId("favouriteBtn"));
        expect(favouriteBtn.classList.contains("unchecked")).toBe(false);

        fireEvent.click(getByTestId("favouriteBtn"));
        expect(favouriteBtn).toHaveClass("unchecked");
    })
})