import { useState, useEffect } from "react";
import ToggleBar from "./ToggleBar";
import {
    standardHash,
    getTogglePositions,
    shuffleAnswerAndOptions,
} from "../helpers";

interface ToggleContainerProps {
    statement: string;
    answerAndOptions: { [key: string]: string[] };
}

const GRADIENTS = [
    "bg-gradient-to-b from-[#f2b496] to-[#eb8069]",
    "bg-gradient-to-b from-[#EEB876] to-[#F16C31]",
    "bg-gradient-to-b from-amber-200 to-yellow-500",
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
}: ToggleContainerProps) {
    //------state------
    const [togglePositions] = useState<number[]>(() =>
        getTogglePositions(answerAndOptions)
    );
    const [shuffledAnswerOptions] = useState<{ [key: string]: string[] }>(() =>
        shuffleAnswerAndOptions(answerAndOptions, togglePositions)
    );
    const [isCorrectOptions, setIsCorrectOptions] = useState<{
        [key: string]: boolean;
    }>(() => {
        return Object.entries(shuffledAnswerOptions).reduce<{
            [key: string]: boolean;
        }>((acc, [key, value], index) => {
            acc[key] = key === value[togglePositions[index]];
            return acc;
        }, {});
    });
    const [backgroundGradient, setBackgroundGradient] = useState<string>("");
    const [isLocked, setIsLocked] = useState<boolean>(false);

    //--------handlers---------
    const setCorrectHandler = (key: string, isCorrect: boolean) => {
        const newIsCorrectOptions = { ...isCorrectOptions };
        newIsCorrectOptions[key] = isCorrect;
        setIsCorrectOptions(newIsCorrectOptions);
    };

    const setIsLockedHandler = (percentage: number) => {
        percentage === 100 ? setIsLocked(true) : setIsLocked(false);
    };

    const getPercentageCorrect = () => {
        let numberCorrect = Object.values(isCorrectOptions).reduce(
            (acc, curr) => (curr === true ? (acc += 1) : acc),
            0
        );
        return (numberCorrect / Object.values(isCorrectOptions).length) * 100;
    };

    const computeBackgroundGradient = () => {
        const percentage = getPercentageCorrect();
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
    };

    //------hooks------
    useEffect(() => {
        computeBackgroundGradient();
    }, [isCorrectOptions]);

    return (
        <div
            aria-label="toggle-container"
            className={`h-full w-full flex flex-col transition-colors duration-300
            items-center justify-center gap-8 ${backgroundGradient}`}
        >
            <h1 className="text-2xl lg:text-3xl text-white">{statement}:</h1>
            <div className="w-2/3 flex flex-col items-center gap-8 justify-center">
                {Object.entries(shuffledAnswerOptions).map(
                    ([key, value], index) => (
                        <ToggleBar
                            key={standardHash(key, index)}
                            answer={key}
                            options={value}
                            initialThumPos={togglePositions[index]}
                            setCorrectHandler={setCorrectHandler}
                            isLocked={isLocked}
                        />
                    )
                )}
            </div>
            <h2 className="text-white text-xl lg:text-2xl">
                <span className={`${isLocked ? "opacity-100" : "opacity-0"}`}>
                    The answer is correct!
                </span>
            </h2>
        </div>
    );
}
