import { Link, Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";

type ProjectData = {
    relativePath: string;
    name: string;
    explanation: string;
    imageClass: string;
    hoverImageClass: string;
};

const projectDataList: ProjectData[] = [
    {
        relativePath: "cube",
        name: "3D Cube",
        explanation: "This is a 3D cube that rotates",
        imageClass: "bg-[url('../src/assets/rotating-cube.png')]",
        hoverImageClass: "group-hover:bg-[url('../src/assets/rotating-cube.gif')]"
    },
    {
        relativePath: "other",
        name: "Other",
        explanation:
            "Nothing here yet, so I'm just going to put really long text that will hopefully wrap to the next line!",
        imageClass: "bg-[url('../src/assets/placeholder.png')]",
        hoverImageClass: "group-hover:bg-[url('../src/assets/placeholder.png')]"
    }
];

export default function ProjectsPage() {
    const location = useLocation();

    const isChild = location.pathname !== "/projects";

    return isChild ? (
        <Outlet />
    ) : (
        <div className="flex flex-wrap justify-center gap-12">
            {projectDataList.map((projectData) => (
                <ProjectCard
                    to={`/projects/${projectData.relativePath}`}
                    name={projectData.name}
                    explanation={projectData.explanation}
                    imageClass={projectData.imageClass}
                    hoverImageClass={projectData.hoverImageClass}
                    key={projectData.relativePath}
                />
            ))}
        </div>
    );
}

type ProjectCardProps = {
    to: string;
    name: string;
    explanation: string;
    imageClass: string;
    hoverImageClass: string;
};

function ProjectCard({ to, name, explanation, imageClass, hoverImageClass }: ProjectCardProps) {
    return (
        <Link
            to={to}
            className="group relative"
        >
            <div className="absolute h-full w-full rounded-lg transition-all group-hover:backdrop-filter-none"></div>
            <div className="absolute bottom-0 h-1/4 w-full rounded-b-lg bg-black transition-all duration-500 group-hover:h-0"></div>
            <div className="absolute top-0 h-3/4 w-full rounded-t-lg bg-gradient-to-t from-black to-transparent transition-all duration-500 group-hover:h-full group-hover:rounded-b-lg"></div>
            <article
                className={classNames(
                    "box-highlight flex h-96 w-96 flex-col rounded-lg bg-zinc-500 bg-cover bg-center transition-all duration-500",
                    imageClass,
                    hoverImageClass
                )}
                style={{ transitionProperty: "background" }}
            >
                <h2 className="relative py-2 text-center text-4xl font-bold shadow-white drop-shadow-lg">{name}</h2>
                <div className="relative flex h-1/2 flex-grow flex-col-reverse rounded-b-lg bg-gradient-to-t from-black to-transparent p-4">
                    <span className="text-right">{explanation}</span>
                </div>
            </article>
        </Link>
    );
}
