import ProjectContent from "../../../components/ProjectContent";
import Thing from "./Thing";

export default function ThingPage() {
    return (
        <ProjectContent
            primaryContent={<Thing />}
            secondaryContent={<>Something should be here</>}
        />
    );
}
