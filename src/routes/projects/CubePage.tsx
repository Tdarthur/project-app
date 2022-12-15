import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import Codeblock from "../../components/Codeblock";
import Section from "../../components/Section";

import cubeClasses from "../../styles/cube.module.css";

export default function CubePage() {
    return (
        <>
            <Cube />

            <Section title="How does it work?">
                The cube works via some plain HTML and CSS. It's made of 6 separate faces, oriented and aligned with
                simple styles.
            </Section>

            <Section title="Code">
                <Codeblock
                    title="Cube.tsx"
                    language="javascript"
                >
                    {`function Cube() {
    const [initialized, setInitialized] = useState(false);
    const [rotations, setRotations] = useState({ front: 0, back: 180, left: -90, right: 90, top: 90, bottom: -90 });

    const rotateCube = useCallback(() => {
        const newRotations = { ...rotations };

        newRotations.front = newRotations.front + 90;
        newRotations.back = newRotations.back + 90;
        newRotations.left = newRotations.left + 90;
        newRotations.right = newRotations.right + 90;
        newRotations.top = newRotations.top - 90;
        newRotations.bottom = newRotations.bottom + 90;

        setRotations(newRotations);
    }, [rotations]);

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            rotateCube();
        }
    }, [initialized]);

    useEffect(() => {
        setTimeout(() => {
            rotateCube();
        }, 1000);
    }, [rotateCube]);

    return (
        <div className="mt-8 mb-16 flex h-80 w-full items-center justify-center">
            <div className={cubeClasses.cubeContainer}>
                <div className={cubeClasses.cube}>
                    {/* front */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.front, "bg-slate-200")}
                        style={{ transform: \`rotateY(\${rotations.front}deg) translateZ(7.5rem)\` }}
                    >
                        I'm a cube
                    </div>

                    {/* back */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.back, "bg-slate-600")}
                        style={{ transform: \`rotateY(\${rotations.back}deg) translateZ(7.5rem)\` }}
                    />

                    {/* left */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.left, "bg-slate-400")}
                        style={{ transform: \`rotateY(\${rotations.left}deg) translateZ(7.5rem)\` }}
                    />

                    {/* right */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.right, "bg-slate-400")}
                        style={{ transform: \`rotateY(\${rotations.right}deg) translateZ(7.5rem)\` }}
                    />

                    {/* top */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.top, "bg-white")}
                        style={{ transform: \`rotateX(90deg) rotateZ(\${rotations.top}deg) translateZ(7.5rem)\` }}
                    />

                    {/* bottom */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.bottom, "bg-black")}
                        style={{ transform: \`rotateX(-90deg) rotateZ(\${rotations.bottom}deg) translateZ(7.5rem)\` }}
                    />
                </div>
            </div>
        </div>
    );
}`}
                </Codeblock>
            </Section>
        </>
    );
}

function Cube() {
    const [initialized, setInitialized] = useState(false);
    const [rotations, setRotations] = useState({ front: 0, back: 180, left: -90, right: 90, top: 90, bottom: -90 });

    const rotateCube = useCallback(() => {
        const newRotations = { ...rotations };

        newRotations.front = newRotations.front + 90;
        newRotations.back = newRotations.back + 90;
        newRotations.left = newRotations.left + 90;
        newRotations.right = newRotations.right + 90;
        newRotations.top = newRotations.top - 90;
        newRotations.bottom = newRotations.bottom + 90;

        setRotations(newRotations);
    }, [rotations]);

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            rotateCube();
        }
    }, [initialized]);

    useEffect(() => {
        setTimeout(() => {
            rotateCube();
        }, 1000);
    }, [rotateCube]);

    return (
        <div className="mt-8 mb-16 flex h-80 w-full items-center justify-center">
            <div className={cubeClasses.cubeContainer}>
                <div className={cubeClasses.cube}>
                    {/* front */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.front, "bg-slate-200")}
                        style={{ transform: `rotateY(${rotations.front}deg) translateZ(7.5rem)` }}
                    />

                    {/* back */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.back, "bg-slate-600")}
                        style={{ transform: `rotateY(${rotations.back}deg) translateZ(7.5rem)` }}
                    />

                    {/* left */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.left, "bg-slate-400")}
                        style={{ transform: `rotateY(${rotations.left}deg) translateZ(7.5rem)` }}
                    />

                    {/* right */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.right, "bg-slate-400")}
                        style={{ transform: `rotateY(${rotations.right}deg) translateZ(7.5rem)` }}
                    />

                    {/* top */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.top, "bg-white")}
                        style={{ transform: `rotateX(90deg) rotateZ(${rotations.top}deg) translateZ(7.5rem)` }}
                    />

                    {/* bottom */}
                    <div
                        className={classNames(cubeClasses.face, cubeClasses.bottom, "bg-black")}
                        style={{ transform: `rotateX(-90deg) rotateZ(${rotations.bottom}deg) translateZ(7.5rem)` }}
                    />
                </div>
            </div>
        </div>
    );
}
