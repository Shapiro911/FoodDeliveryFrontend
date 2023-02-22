import { cleanup } from "@testing-library/react";
import { Header } from "./Header";
import { renderWithProviders } from "../../utils/test.utils";

describe("Restaurant tests", () => {
    afterEach(cleanup);

    it("Renders correctly", () => {
        const { getAllByRole } = renderWithProviders(<Header scrolled={false} />);

        expect(getAllByRole("banner").length).toEqual(1);
    })
})