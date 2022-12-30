import classNames from "classnames";

import styles from "../styles/projects.module.css";

type Props = {
    primaryContent: React.ReactElement | React.ReactElement[] | string;
    secondaryContent?: React.ReactElement | React.ReactElement[] | string | undefined;
};

export default function ProjectContent({ primaryContent, secondaryContent }: Props) {
    return (
        <>
            <div className={classNames(styles.fadePrimary, "mt-8 mb-16 flex h-80 w-full items-center justify-center")}>
                {primaryContent}
            </div>
            <div className={styles.fadeSecondary}>{secondaryContent}</div>
        </>
    );
}
