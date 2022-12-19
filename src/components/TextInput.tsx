import { forwardRef } from "react";
import classNames from "classnames";

type TextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className, ...props }, ref) => {
    return (
        <input
            type="text"
            className={classNames(
                "h-10 w-full rounded-sm bg-gray-800 p-2 text-gray-100 placeholder-gray-600 autofill:bg-black focus-visible:outline-0",
                className
            )}
            style={{ ...props.style, lineHeight: "2.5rem" }}
            ref={ref}
            {...props}
        >
            {props.children}
        </input>
    );
});

export default TextInput;
