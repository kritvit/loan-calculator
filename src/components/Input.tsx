import { useRef, useState, useEffect, ChangeEvent } from "react";
import './Input.scss';
import { toNumberFormattedStringUtil, toNumberUtil } from "../utils/commonUtils";

interface IInput {
    name: string;
    label: string;
    value: number;
    onChange: (value: number) => void;
    info?: string;
}

export const Input = ({
    name,
    label,
    value,
    onChange,
    info
}: IInput): JSX.Element => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState<string>(toNumberFormattedStringUtil(value));
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);

    useEffect(() => {
        if (inputRef.current !== null && cursorPosition !== null) {
            inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
    }, [cursorPosition]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const input = e.target;
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd;

        const sanitizedValue = sanitizeValue(input.value); // Parse value with spaces

        onChange(toNumberUtil(sanitizedValue));
        setInputValue(sanitizedValue);
        const updatedCursorPosition = calculateCursorPosition(
            selectionStart,
            selectionEnd,
            input.value,
            sanitizedValue
        );
        setCursorPosition(updatedCursorPosition);
    };

    const sanitizeValue = (value: string): string => {
        return toNumberFormattedStringUtil(value);
    };

    const calculateCursorPosition = (
        selectionStart: number | null,
        selectionEnd: number | null,
        originalValue: string,
        sanitizedValue: string
    ): number | null => {
        if (selectionStart === null || selectionEnd === null) {
            return null;
        }

        const originalCursorPosition = selectionStart;
        const diffLength = sanitizedValue.length - originalValue.length;
        const updatedCursorPosition = originalCursorPosition + diffLength;

        return updatedCursorPosition;
    };

    return (<div className="component-input global__grid-container">
        <div className="global__grid-item global__grid-item--medium-6 ">
            <label className="global__font-nowrap">{label}{info && <span className="global__font-small"> {info}</span>}</label>
        </div>
        <div className="global__grid-item global__grid-item--medium-6 ">
            <input
                ref={inputRef}
                type="text"
                name={name}
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    </div>);
};