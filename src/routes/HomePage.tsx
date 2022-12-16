import classNames from "classnames";

import styles from "../styles/home.module.css";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center">
            <h2 className="mb-2 text-2xl">
                Hi, I'm{" "}
                <span
                    className={classNames(
                        "bg-gradient-to-r from-yellow-500 via-yellow-700 to-yellow-500 bg-clip-text bg-repeat-x font-bold text-transparent",
                        styles.nameText
                    )}
                >
                    Tyler Arthur
                </span>
                <span className="text-base">.</span>
            </h2>
            <h3 className="text-xl text-white">I'm a full-stack web developer.</h3>
        </div>
    );
}
