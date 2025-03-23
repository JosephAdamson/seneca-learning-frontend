import { KeyboardEventHandler, useState, useEffect } from "react";
import { standardHash } from "../helpers";

interface ToggleBarProps {
    answer: string;
    options: string[];
    initialThumPos: number;
    setCorrectHandler: (key: string, isCorrect: boolean) => void
    isLocked: boolean
}

/* 
Toggle bar supports either 2 or three options.

@component
@param  {ToggleBarProps}    props
@param  string              props.answer      Correct option.
@param  {string[]}          props.options     Possible answer options for the user.
@param  boolean             props.tabIndex    Tabbing order in a collection, for accesibilty
focused by the parent container.
*/
export default function ToggleBar({
    answer,
    options,
    initialThumPos,
    setCorrectHandler,
    isLocked
}: ToggleBarProps) {
    //--------state--------
    const [thumbPosIndex, setThumbPosIndex] = useState<number>(
        initialThumPos ? initialThumPos : 0
    );
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 620);

    const shiftThumbHandler = (index: number) => {
        setThumbPosIndex(index);
    };

    //---------handlers------
    // keydown handler for toggling the thumb left and right.
    const keyDownHandler: KeyboardEventHandler<HTMLButtonElement> = (e) => {
        if (window.innerWidth < 640) {
            if (e.key == "ArrowUp" && thumbPosIndex > 0) {
                setThumbPosIndex((prev) => prev - 1);
            }
            if (e.key == "ArrowDown" && thumbPosIndex < options.length - 1) {
                setThumbPosIndex((prev) => prev + 1);
            }
        } else {
            if (e.key == "ArrowLeft" && thumbPosIndex > 0) {
                setThumbPosIndex((prev) => prev - 1);
            }
            if (e.key == "ArrowRight" && thumbPosIndex < options.length - 1) {
                setThumbPosIndex((prev) => prev + 1);
            }
        }
    };

    //---------hooks--------
    useEffect(() => {
        const handleResize = () => {
            window.innerWidth < 640 
                ? setIsMobile(true) 
                : setIsMobile(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // report select option to parent
    useEffect(() => {
        options[thumbPosIndex] === answer 
            ? setCorrectHandler(answer, true)
            : setCorrectHandler(answer, false);
    }, [thumbPosIndex]);

    return (
        <button
            aria-roledescription="toggle-bar-button"
            className="flex flex-col sm:flex-row w-full xl:w-2/3 relative rounded-xl sm:rounded-4xl 
            focus:shadow-[inset_0_6px_6px_rgba(0,0,0,0.1),0_6px_6px_rgba(0,0,0,0.1)] 
            focus:outline-0 border-2 border-custom-border hover:cursor-pointer"
            onKeyDown={(e) => {
                if (!isLocked) {
                    keyDownHandler(e)
                }
            }}
        >
            {options.map((option, index) => (
                <div
                    className={`p-4 basis-0 grow flex justify-center 
                        ${
                            thumbPosIndex === index
                                ? "text-gray-500"
                                : "text-white"
                        }`}
                    onClick={() => {
                        if (!isLocked) {
                            shiftThumbHandler(index)
                        }
                    }}
                    key={standardHash(option, index)}
                >
                    <span className="z-10 text-sm lg:text-base">{option}</span>
                </div>
            ))}
            {isMobile ? (
                <div
                    className={`absolute w-full opacity-60 bg-white transition-all duration-400 shadow-xl rounded-lg ${
                        options.length === 2 ? "h-1/2" : "h-1/3"
                    } `}
                    style={{
                        transform: `translateY(calc(${thumbPosIndex} * 100%))`,
                    }}
                ></div>
            ) : (
                <div
                    className={`absolute h-full opacity-60 bg-white transition-all duration-400 shadow-xl rounded-4xl ${
                        options.length === 2 ? "w-1/2" : "w-1/3"
                    } `}
                    style={{
                        transform: `translateX(calc(${thumbPosIndex} * 100%))`,
                    }}
                ></div>
            )}
        </button>
    );
}
