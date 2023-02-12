import App from './App';
import renderer from "react-test-renderer";

describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
