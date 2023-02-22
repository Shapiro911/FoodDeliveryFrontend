import { fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { renderWithProviders } from "../../utils/test.utils";
import { RestaurantList } from "../RestaurantList/RestaurantList";
import { SortList } from "./SortList";

describe("SortList tests", () => {
    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });

    it("Renders correctly", () => {
        const sortValues = { sortBy: "popular", priceRange: [], fee: "0" };
        const getSortValues = jest.fn();
        const { getAllByRole } = renderWithProviders(<SortList sortValuesProp={sortValues} sendSortValues={getSortValues} />);

        expect(getAllByRole("radio").length).toEqual(3);
        expect(getAllByRole("slider").length).toEqual(1);
        expect(getAllByRole("group").length).toEqual(3);
        expect(getAllByRole("complementary").length).toEqual(1);
        expect(getAllByRole("button").length).toEqual(4);
    })

    it("Changes prop on price range button click", () => {
        const sortValues = { sortBy: "popular", priceRange: [], fee: "0" };
        const getSortValues = jest.fn();
        const setPriceRange = jest.fn();
        const handleClick = jest.spyOn(React, "useState");
        //@ts-ignore
        handleClick.mockImplementation(priceRange => [priceRange, setPriceRange]);
        const { getAllByTestId } = renderWithProviders(<RestaurantList><SortList sortValuesProp={sortValues} sendSortValues={getSortValues} /></RestaurantList>);

        getAllByTestId("priceRange").forEach((button) => {
            fireEvent.click(button);
        })
        expect(setPriceRange).toHaveBeenCalledTimes(getAllByTestId("priceRange").length * 3);
    })

    it("Changes prop on radio click", () => {
        const sortValues = { sortBy: "popular", priceRange: [], fee: "0" };
        const getSortValues = jest.fn();
        const setSortValues = jest.fn();
        const handleClick = jest.spyOn(React, "useState");
        //@ts-ignore
        handleClick.mockImplementation(sortValues => [sortValues, setSortValues]);
        const { getAllByRole } = renderWithProviders(<RestaurantList><SortList sortValuesProp={sortValues} sendSortValues={getSortValues} /></RestaurantList>);

        getAllByRole("radio").forEach((button) => {
            fireEvent.click(button);
        })
        expect(setSortValues).toHaveBeenCalledTimes(getAllByRole("radio").length * 2);
    })
})