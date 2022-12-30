import classNames from "classnames";

import styles from "./gooey.module.css";

export default function Gooey() {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="10"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
                            result="goo"
                        />
                        <feBlend
                            in="SourceGraphic"
                            in2="goo"
                        />
                    </filter>
                </defs>
            </svg>

            <div className={classNames(styles.blobs)}>
                <div className="h-12 w-12 rounded-full bg-red-500"></div>
                <div className="h-12 w-12 rounded-full bg-red-500"></div>
            </div>
        </>
    );
}
