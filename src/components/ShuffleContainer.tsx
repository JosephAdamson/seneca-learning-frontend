import ToggleContainer from "./ToggleContainer";
import { shuffleAnswerOptions } from "../helpers";

interface ShuffleContainerProps {
    statement: string;
    answerAndOptions: { [key: string]: string[] };
}

/* 
Wrapper for our toggle container, keeps the shuffling of our data as a
seperate concern.

@component
@param      string              statement 
@param      string: string[]    answerAndOptions  A key: value pair, correct answer
and options to be rendered on the toggle switch.
*/
export default function ShuffleContainer({
    statement,
    answerAndOptions,
}: ShuffleContainerProps) {
    const togglePositions = Object.keys(answerAndOptions).map((key) =>
        Math.floor(Math.random() * answerAndOptions[key].length)
    );

    return (
        <div className="w-screen h-screen">
            <ToggleContainer
                statement={statement}
                answerAndOptions={shuffleAnswerOptions(answerAndOptions)}
                togglePositions={togglePositions}
            />
        </div>
    );
}
