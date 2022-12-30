import Codeblock from "../../../components/Codeblock";
import ProjectContent from "../../../components/ProjectContent";
import Section from "../../../components/Section";

import Gooey from "./Gooey";

export default function GooeyPage() {
    return (
        <ProjectContent
            primaryContent={<Gooey />}
            secondaryContent={<GooeyInformation />}
        />
    );
}

function GooeyInformation() {
    return (
        <>
            <Section title="How does it work?">Yeehaw and whatever</Section>

            <Section title="Code">
                <Codeblock
                    title="Gooey.jsx"
                    language="javascript"
                    className="mb-2"
                >
                    {`.`}
                </Codeblock>
            </Section>
        </>
    );
}
