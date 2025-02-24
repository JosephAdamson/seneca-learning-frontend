import { useState, useEffect } from "react";
import ToggleBar from "./ToggleBar";
import { standardHash } from "../helpers";

interface ToggleContainerProps {
    statement: string;
    answerAndOptions: { [key: string]: string[] };
    togglePositions: number[];
}

const GRADIENTS = [
    "bg-gradient-to-b from-[#f2b496] to-[#eb8069]",
    "bg-gradient-to-b from-[#EEB876] to-[#F16C31]",
    "bg-gradient-to-b from-amber-200 to-yellow-400",
    "bg-gradient-to-b from-[#76e0c4] to-[#64d2d1]",
];

/* 
Container for rendering interactive Statement & Answer task. Given a statement
the user must select the correct options using toggle swtiches. 

@component
@param      string              statement 
@param      string: string[]    answerAndOptions  A key: value pair, correct answer
and options to be rendered on the toggle switch.
*/
export default function ToggleContainer({
    statement,
    answerAndOptions,
    togglePositions,
}: ToggleContainerProps) {
    const [isCorrectOptions, setIsCorrectOptions] = useState<{
        [key: string]: boolean;
    }>({});
    const [backgroundGradient, setBackgroundGradient] = useState<string>("");
    const [isLocked, setIsLocked] = useState<boolean>(false);

    const setCorrectHandler = (key: string, isCorrect: boolean) => {
        const newIsCorrectOptions = { ...isCorrectOptions };
        newIsCorrectOptions[key] = isCorrect;
        setIsCorrectOptions(newIsCorrectOptions);
    };

    const setIsLockedHandler = (percentage: number) => {
        percentage === 100
            ? setIsLocked(true)
            : setIsLocked(false);
    }

    const getPercentageCorrect = () => {
        let numberCorrect = 0;
        const isCorrectValues = Object.values(isCorrectOptions);
        isCorrectValues.forEach((value) => {
            if (value === true) {
                numberCorrect += 1;
            }
        });
        console.log(numberCorrect);
        console.log(isCorrectValues.length);
        return (numberCorrect/ isCorrectValues.length) * 100;
    }

    const computeBackgroundGradient = () => {
        const percentage = getPercentageCorrect();
        console.log(percentage);
        setIsLockedHandler(percentage);
        if (percentage == 0) {
            setBackgroundGradient(GRADIENTS[0]);           
        } else if (percentage > 0 && percentage < 50) {
            setBackgroundGradient(GRADIENTS[1]);
        } else if (percentage >= 50 && percentage < 100) {
            setBackgroundGradient(GRADIENTS[2]);
        } else {
            setBackgroundGradient(GRADIENTS[3]);
        }
    } 

    // initialize our 'correctness' state.
    useEffect(() => {
        const newIsCorrectOptions: { [key: string]: boolean } = {};
        Object.entries(answerAndOptions).forEach(([key, value], index) => {
            newIsCorrectOptions[key] = key === value[togglePositions[index]];
        });
        setIsCorrectOptions(newIsCorrectOptions);
        console.log(newIsCorrectOptions);
    }, []);

    useEffect(() => {
        computeBackgroundGradient()
        // check thresoholds
    }, [isCorrectOptions]);

    return (
        <div
            className={`h-full w-full flex flex-col transition-colors duration-300
            items-center justify-center gap-8 ${backgroundGradient}`}
        >
            <h1 className="text-2xl lg:text-3xl text-white">{statement}:</h1>
            <div className="w-2/3 flex flex-col items-center gap-8 justify-center">
                {Object.entries(answerAndOptions).map(([key, value], index) => (
                    <ToggleBar
                        key={standardHash(key, index)}
                        answer={key}
                        options={value}
                        initialThumPos={togglePositions[index]}
                        setCorrectHandler={setCorrectHandler}
                        isLocked={isLocked}
                    />
                ))}
            </div>
            <h2 className="text-white text-xl lg:text-2xl">
                <span className={`${isLocked ? "opacity-100" : "opacity-0"}`}>The answer is correct</span>
            </h2>
        </div>
    );
}
