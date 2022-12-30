import Codeblock from "../../../components/Codeblock";
import ProjectContent from "../../../components/ProjectContent";
import Section from "../../../components/Section";

import Cube from "./Cube";

export default function CubePage() {
    return (
        <ProjectContent
            primaryContent={<Cube />}
            secondaryContent={<CubeInformation />}
        />
    );
}

function CubeInformation() {
    return (
        <>
            <Section title="How does it work?">
                The cube works via some plain HTML and CSS. It's made of 6 separate faces, oriented and aligned with
                simple styles.
            </Section>

            <Section title="Code">
                <Codeblock
                    title="Cube.jsx"
                    language="javascript"
                    className="mb-2"
                >
                    {`import cubeClasses from "./cube.module.css";

export default function Cube() {
return (
<div className={cubeClasses.cubeContainer}>
<div className={cubeClasses.cube}>
    <div className={\`\${cubeClasses.face} \${cubeClasses.front}\`} />
    <div className={\`\${cubeClasses.face} \${cubeClasses.back}\`} />
    <div className={\`\${cubeClasses.face} \${cubeClasses.left}\`} />
    <div className={\`\${cubeClasses.face} \${cubeClasses.right}\`} />
    <div className={\`\${cubeClasses.face} \${cubeClasses.top}\`} />
    <div className={\`\${cubeClasses.face} \${cubeClasses.bottom}\`} />
</div>
</div>
);
}
`}
                </Codeblock>

                <Codeblock
                    title="cube.module.css"
                    language="css"
                >
                    {`.cubeContainer {
display: flex;
width: 20rem;
height: 20rem;

perspective: 50rem;
}

.cube {
position: relative;
width: 100%;
height: 100%;

transform-style: preserve-3d;
}

@keyframes rotateSideFace {
from {
transform: rotateY(0deg) translateZ(7.5rem);
}
to {
transform: rotateY(360deg) translateZ(7.5rem);
}
}

@keyframes rotateTopFace {
from {
transform: rotateX(90deg) rotateZ(360deg) translateZ(7.5rem);
}
to {
transform: rotateX(90deg) rotateZ(0deg) translateZ(7.5rem);
}
}

@keyframes rotateBottomFace {
from {
transform: rotateX(-90deg) rotateZ(360deg) translateZ(7.5rem);
}
to {
transform: rotateX(-90deg) rotateZ(0deg) translateZ(7.5rem);
}
}

.face {
position: absolute;
width: 15rem;
height: 15rem;
margin: 2.5rem;

display: flex;
justify-content: center;
align-items: center;

color: black;
font-weight: bold;
opacity: 0.9;

transition-property: transform;
transition-timing-function: linear;
transition-duration: 1000ms;

animation: rotateSideFace 4s linear infinite;
}

.front {
background-color: rgb(160, 160, 160);
}

.back {
animation-delay: -2s;
background-color: rgb(32, 32, 32);
}

.left {
animation-delay: -1s;
background-color: rgb(96, 96, 96);
}

.right {
animation-delay: -3s;
background-color: rgb(96, 96, 96);
}

.top {
animation: rotateTopFace 4s linear infinite;
background-color: white;
}

.bottom {
animation: rotateBottomFace 4s reverse linear infinite;
background-color: black;
}
`}
                </Codeblock>
            </Section>
        </>
    );
}
