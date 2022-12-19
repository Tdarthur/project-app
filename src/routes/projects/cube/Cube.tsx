import cubeClasses from "./cube.module.css";

export default function Cube() {
    return (
        <div className={cubeClasses.cubeContainer}>
            <div className={cubeClasses.cube}>
                <div className={`${cubeClasses.face} ${cubeClasses.front}`} />
                <div className={`${cubeClasses.face} ${cubeClasses.back}`} />
                <div className={`${cubeClasses.face} ${cubeClasses.left}`} />
                <div className={`${cubeClasses.face} ${cubeClasses.right}`} />
                <div className={`${cubeClasses.face} ${cubeClasses.top}`} />
                <div className={`${cubeClasses.face} ${cubeClasses.bottom}`} />
            </div>
        </div>
    );
}
