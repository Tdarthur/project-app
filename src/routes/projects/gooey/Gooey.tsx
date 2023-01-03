import { useEffect, useRef } from "react";
import classNames from "classnames";

import styles from "./gooey.module.css";

const BLOB_COUNT = 20;
const BLOB_SIZE_REM = 2;

const BLOB_PX_PER_SECOND = 30;

const UPDATE_INTERVAL_MS = 1000 / 30;

export default function Gooey() {
    const blobContainerRef = useRef<HTMLDivElement>(null);

    /**
     * Spreads the blobs and creates an animation interval to put them in motion.
     *
     * @returns the animation interval if it succeeded, undefined otherwise
     */
    const animateBlobs = () => {
        if (!blobContainerRef.current) {
            return undefined;
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
            blobs[i].style.transform = `translateX(calc(${blobContainer.clientWidth * xPositions[i]}px - ${
                BLOB_SIZE_REM / 2
            }rem)) translateY(calc(${blobContainer.clientHeight * yPositions[i]}px - ${BLOB_SIZE_REM / 2}rem))`;
        }

        let paused = false;

        window.addEventListener("keydown", (event) => {
            if (event.key === " ") {
                event.preventDefault();
                paused = !paused;
            }
        });

        // set interval to animate the blobs
        let lastUpdate = Date.now();
        return setInterval(() => {
            const now = Date.now();
            const deltaTime = (now - lastUpdate) / 1000;
            lastUpdate = now;

            if (paused) {
                return;
            }

            const originX = blobContainer.clientWidth / 2;
            const originY = blobContainer.clientHeight / 2;

            const blobReflectionRadius = blobContainer.clientHeight / 2;

            for (let i = 0; i < blobs.length; i++) {
                let newXPositionPixels = xPositions[i] * blobContainer.clientWidth + xSpeeds[i] * deltaTime;
                let newYPositionPixels = yPositions[i] * blobContainer.clientHeight + ySpeeds[i] * deltaTime;

                // determine if blob needs to reflect or not
                const blobDistanceFromCenter = Math.sqrt(
                    Math.pow(newXPositionPixels - originX, 2) + Math.pow(newYPositionPixels - originY, 2)
                );
                if (blobDistanceFromCenter > blobReflectionRadius) {
                    // set the blob back within the reflection radius
                    newXPositionPixels =
                        originX + ((newXPositionPixels - originX) / blobDistanceFromCenter) * blobReflectionRadius;
                    newYPositionPixels =
                        originY + ((newYPositionPixels - originY) / blobDistanceFromCenter) * blobReflectionRadius;

                    // calculate the new speeds after reflection
                    let normalVectorX = newXPositionPixels - originX;
                    let normalVectorY = newYPositionPixels - originY;

                    let incidentVectorX = xSpeeds[i];
                    let incidentVectorY = ySpeeds[i];

                    let dotProduct = normalVectorX * incidentVectorX + normalVectorY * incidentVectorY;

                    let reflectionX = 2 * dotProduct * normalVectorX - incidentVectorX;
                    let reflectionY = 2 * dotProduct * normalVectorY - incidentVectorY;

                    let reflectionMagnitude = Math.sqrt(Math.pow(reflectionX, 2) + Math.pow(reflectionY, 2));

                    xSpeeds[i] = -BLOB_PX_PER_SECOND * (reflectionX / reflectionMagnitude);
                    ySpeeds[i] = -BLOB_PX_PER_SECOND * (reflectionY / reflectionMagnitude);
                }

                // set the new positions
                xPositions[i] = newXPositionPixels / blobContainer.clientWidth;
                yPositions[i] = newYPositionPixels / blobContainer.clientHeight;

                // apply the new positions to the blobs
                blobs[i].style.transform = `translateX(calc(${newXPositionPixels}px - ${
                    BLOB_SIZE_REM / 2
                }rem)) translateY(calc(${newYPositionPixels}px - ${BLOB_SIZE_REM / 2}rem))`;
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
