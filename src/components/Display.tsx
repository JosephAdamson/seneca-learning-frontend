import { useState } from "react";
import ToggleContainer from "./ToggleContainer";

const stmt1 = "An animal cell contains";
const eg1: {[key: string]: string[]} = {
    "Ribosomes": ["Cell wall", "Ribosomes"],
    "Cytoplasm": ["Cytoplasm", "Chlorplast"],
    "Partially permeable membrane": [
        "Partially permeable membrane",
        "Impermeable membrane",
    ],
    "Cellulose": ["Cellulose", "Mitochondria"],
};

const stmt2 = "Countries in Africa";
const eg2: {[key: string]: string[]}  = {
    "Eswatini": ["Eswatini", "Nicaragua", "Georgia"],
    "Malawi": ["Barbados", "Malawi", "Hati"],
    "Chad": ["Portugal", "Chad", "East Timor"],
};

/* 
Purley for displaying the different types of toggle components.
*/
export default function Display() {
    const [isTwoExample, setIsTwoExample] = useState<boolean>(true);

    const toggleModeHandler = () => {
        setIsTwoExample((prev) => !prev);
    };
    return (
        <div className="h-screen w-screen relative">
            <div className="w-full flex justify-end absolute top-0">
                {isTwoExample ? (
                    <button
                        className="px-4 py-2 rounded-bl-xl text-gray-500 bg-white opacity-60
                        hover:brightness-95 hover:cursor-pointer"
                        onClick={toggleModeHandler}
                    >
                        3 Toggle
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 rounded-bl-xl text-gray-500 bg-white opacity-60
                        hover:brightness-95 hover:cursor-pointer"
                        onClick={toggleModeHandler}
                    >
                        2 Toggle
                    </button>
                )}
            </div>

            {isTwoExample ? (
                <ToggleContainer
                    key={0}
                    statement={stmt1}
                    answerAndOptions={eg1}
                />
            ) : (
                <ToggleContainer
                    key={1}
                    statement={stmt2}
                    answerAndOptions={eg2}
                />
            )}
        </div>
    );
}
