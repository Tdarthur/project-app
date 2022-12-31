import { useEffect, useRef } from "react";
import classNames from "classnames";

import styles from "./gooey.module.css";

const BLOB_COUNT = 10;
const BLOB_SIZE_REM = 3;

const BLOB_PX_PER_SECOND = 25;

const UPDATE_INTERVAL_MS = 1 / 60;

// TODO: make the blobs bounce internally off of the circular container
export default function Gooey() {
    const blobContainerRef = useRef<HTMLDivElement>(null);

    /**
     * Spreads the blobs and creates an animation interval to put them in motion.
     *
     * @returns true if succeeded, false otherwise
     */
    const animateBlobs = () => {
        if (!blobContainerRef.current) {
            return;
        }

        const blobContainer = blobContainerRef.current;

        const xPositions = new Array(BLOB_COUNT).fill(0).map(() => Math.random());
        const yPositions = new Array(BLOB_COUNT).fill(0).map(() => Math.random());
        const xSpeeds = new Array(BLOB_COUNT);
        const ySpeeds = new Array(BLOB_COUNT);

        const blobs = [...blobContainer.children] as HTMLDivElement[];

        // initialize blobs
        for (let i = 0; i < blobs.length; i++) {
            // calculate blob velocities
            const angle = Math.PI * 2 * Math.random();
            xSpeeds[i] = Math.cos(angle) * BLOB_PX_PER_SECOND;
            ySpeeds[i] = Math.sin(angle) * BLOB_PX_PER_SECOND;

            // set initial position of blobs
            blobs[i].style.left = `calc(${blobContainer.clientWidth * xPositions[i]}px - ${BLOB_SIZE_REM / 2}rem)`;
            blobs[i].style.top = `calc(${blobContainer.clientHeight * yPositions[i]}px - ${BLOB_SIZE_REM / 2}rem)`;
        }

        // set interval to animate the blobs
        let lastUpdate = Date.now();
        return setInterval(() => {
            let now = Date.now();
            let deltaTime = (now - lastUpdate) / 1000;
            lastUpdate = now;
            for (let i = 0; i < blobs.length; i++) {
                const newXPositionPixels = xPositions[i] * blobContainer.clientWidth + xSpeeds[i] * deltaTime;
                const newYPositionPixels = yPositions[i] * blobContainer.clientHeight + ySpeeds[i] * deltaTime;

                // set the position and update speed if necessary
                xPositions[i] = newXPositionPixels / blobContainer.clientWidth;
                if (xPositions[i] < 0) {
                    xPositions[i] = 0;
                    xSpeeds[i] *= -1;
                }
                if (xPositions[i] > 1) {
                    xPositions[i] = 1;
                    xSpeeds[i] *= -1;
                }

                yPositions[i] = newYPositionPixels / blobContainer.clientHeight;
                if (yPositions[i] < 0) {
                    yPositions[i] = 0;
                    ySpeeds[i] *= -1;
                }
                if (yPositions[i] > 1) {
                    yPositions[i] = 1;
                    ySpeeds[i] *= -1;
                }

                // apply the new positions to the blobs
                blobs[i].style.left = `calc(${newXPositionPixels}px - ${BLOB_SIZE_REM / 2}rem)`;
                blobs[i].style.top = `calc(${newYPositionPixels}px - ${BLOB_SIZE_REM / 2}rem)`;
            }
        }, UPDATE_INTERVAL_MS);
    };

    useEffect(() => {
        let animationInterval = animateBlobs();

        return () => {
            clearInterval(animationInterval);
        };
    }, [blobContainerRef]);

    const blobs = [];
    for (let i = 0; i < BLOB_COUNT; i++) {
        blobs[i] = (
            <div
                key={i}
                style={{ width: `${BLOB_SIZE_REM}rem`, height: `${BLOB_SIZE_REM}rem` }}
            />
        );
    }

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                className="absolute"
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

            <div
                ref={blobContainerRef}
                className={classNames(styles.blobs, "aspect-square h-full")}
            >
                {blobs}
            </div>
        </>
    );
}
