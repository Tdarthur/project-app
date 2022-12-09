import { useRouteError } from "react-router-dom";

export default function Error404(props: any) {
    const error = useRouteError();
    console.log(error);

    return <h1>Something went wrong?</h1>;
}
