import { render, screen } from "@testing-library/react";
import ToggleBar from "./ToggleBar";
import { describe, it, expect } from "vitest";

describe("ToggleBar", () => {
    // Ribosomes: ["Cell wall", "Ribosomes"]
    it("renders the options passed to it", () => {
        render(<ToggleBar
            answer={"Ribosomes"}
            options={["Cell wall", "Ribosomes"]}
            initialThumPos={0}
            setCorrectHandler={() => {}}
            isLocked={false}/>);
        
        expect(screen.getByText("Cell wall")).toBeInTheDocument();
        expect(screen.getByText("Ribosomes")).toBeInTheDocument();
    });
});

