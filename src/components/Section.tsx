import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";

type Props = {
    children: React.ReactElement | React.ReactElement[] | string;
    title: string;
    className?: string | null | undefined;
    buttonClass?: string | null | undefined;
    panelClass?: string | null | undefined;
};

export default function Section({ children, title, className, buttonClass, panelClass }: Props) {
    return (
        <Disclosure defaultOpen>
            {({ open }) => (
                <div className={classNames("mb-2", className)}>
                    <Disclosure.Button
                        className={classNames(
                            "flex h-8 w-full items-center rounded-t-sm bg-gray-800 py-1 px-2 font-bold",
                            { "rounded-b-sm": !open },
                            buttonClass
                        )}
                        style={{ justifyContent: "space-between" }}
                    >
                        {title}
                        <div className="aspect-square h-full">
                            <ChevronDownIcon className={open ? "rotate-180 transform" : ""} />
                        </div>
                    </Disclosure.Button>
                    <Disclosure.Panel className={classNames("rounded-b-sm bg-gray-700 p-2", panelClass)}>
                        {children}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}
