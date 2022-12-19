import { useState } from "react";

import classNames from "classnames";

type TextAreaInputProps = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & { showRemainingCharacters?: boolean };

export default function TextAreaInput({ className, showRemainingCharacters = false, ...props }: TextAreaInputProps) {
    const [value, setValue] = useState("");

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();

        setValue(event.target.value);
    };

    const isShowingRemainingCharacters = props.maxLength && showRemainingCharacters;

    return (
        <div className={classNames("relative w-full", { "mb-2": isShowingRemainingCharacters })}>
            <textarea
                className={classNames(
                    "block h-52 max-h-96 min-h-[2.5rem] w-full overflow-hidden rounded-sm bg-gray-800 p-2 text-gray-100 placeholder-gray-600 autofill:bg-black focus-visible:outline-0",
                    className
                )}
                value={value}
                onChange={onChange}
                {...props}
            >
                {props.children}
            </textarea>

            {isShowingRemainingCharacters && (
                <div
                    className={classNames(
                        "mt-1 block w-full text-xs",
                        value.length < props.maxLength! ? "text-gray-500" : "text-yellow-600"
                    )}
                >
                    {`${props.maxLength! - value.length} characters remaining`}
                </div>
            )}
        </div>
    );
}
