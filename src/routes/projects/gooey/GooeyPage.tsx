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
                    title="Gooey.tsx"
                    language="javascript"
                    className="mb-2"
                >
                    {` `}
                </Codeblock>

                <Codeblock
                    title="gooey.module.css"
                    language="css"
                >
                    {`.blobs {
    position: relative;

    background-color: rgb(202 138 4);
    border-radius: 9999px;

    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='goo'><feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur' /><feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7' result='goo' /><feBlend in='SourceGraphic' in2='goo'/></filter></svg>#goo");
    -webkit-filter: url("#goo");
}

.blobs > div {
    position: absolute;
    width: 3rem;
    height: 3rem;

    background-color: rgb(202 138 4);
    border-radius: 9999px;
}
`}
                </Codeblock>
            </Section>
        </>
    );
}
