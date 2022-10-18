import { render, screen } from "@testing-library/react";
import Article2 from "../Article2";

describe("<Article2 />", () => {
    it("should render without errors", () => {
        render(<Article2 title={"Article_Title"} content={"Article_Content"} author={"Article_Author"} />);
        screen.getByText("Article_Title");
        screen.getByText("Article_Content");
        screen.getByText("Article_Author");
    }); 
});