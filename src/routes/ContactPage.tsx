import React, { useState } from "react";
import classNames from "classnames";
import TextInput from "../components/TextInput";
import TextAreaInput from "../components/TextAreaInput";

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
            <TextInput
                name="name"
                placeholder="Name"
                className="mt-2"
                maxLength={30}
            />

            <TextInput
                name="email"
                placeholder="Email"
                className="mt-2"
                maxLength={30}
            />

            <TextInput
                name="subject"
                placeholder="Subject"
                className="mt-2 rounded-b-none"
                maxLength={30}
                autoComplete="off"
            />
            <hr className="h-px w-full border-none bg-gray-700" />
            <TextAreaInput
                name="message"
                placeholder="Message"
                className="rounded-t-none"
                maxLength={500}
                autoComplete="off"
                showRemainingCharacters
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
