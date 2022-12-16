import React, { useState } from "react";
import classNames from "classnames";

type Props = {};

export default function ContactPage({}: Props) {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <strong className="mb-6 italic text-yellow-600">Have a question or want to work together?</strong>
            <ContactForm />
        </div>
    );
}

function ContactForm() {
    const formSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <form className="flex w-[24rem] flex-col items-center">
            <ContactTextInput
                name="name"
                placeholder="Name"
                className="mt-2"
            />

            <ContactTextInput
                name="email"
                placeholder="Email"
                className="mt-2"
            />

            <ContactTextInput
                name="subject"
                placeholder="Subject"
                className="mt-2 rounded-b-none"
            />
            <hr className="h-px w-full border-none bg-gray-700" />
            <ContactTextAreaInput
                name="message"
                placeholder="Message"
                className="rounded-t-none"
            />

            <button
                className="yeehaw hover:scale-101 mt-10 w-fit rounded-sm bg-yellow-600 py-2 px-10 font-bold text-black transition-all duration-300 hover:bg-black hover:text-yellow-600 focus:bg-black focus:text-yellow-600"
                type="submit"
                onClick={formSubmitHandler}
            >
                Submit
            </button>
        </form>
    );
}

type ContactTextInputProps = {
    name: string;
    placeholder: string;
    className?: string;
};

function ContactTextInput({ name, placeholder, className }: ContactTextInputProps) {
    return (
        <input
            type="text"
            name={name}
            className={classNames(
                "h-10 w-full rounded-sm bg-gray-800 p-2 text-gray-100 placeholder-gray-600 autofill:bg-black focus-visible:outline-0",
                className
            )}
            maxLength={30}
            placeholder={placeholder}
        />
    );
}

function ContactTextAreaInput({ name, placeholder, className }: ContactTextInputProps) {
    const [value, setValue] = useState("");

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();

        setValue(event.target.value);
    };

    return (
        <div className="relative w-full">
            <textarea
                name={name}
                className={classNames(
                    "h-52 max-h-96 min-h-[2.5rem] w-full overflow-hidden rounded-sm bg-gray-800 p-2 text-gray-100 placeholder-gray-600 autofill:bg-black focus-visible:outline-0",
                    className
                )}
                maxLength={500}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <span
                className={classNames(
                    "absolute -bottom-4 left-0 w-full text-xs",
                    value.length < 500 ? "text-gray-500" : "text-yellow-600"
                )}
            >
                {500 - value.length} characters remaining
            </span>
        </div>
    );
}
