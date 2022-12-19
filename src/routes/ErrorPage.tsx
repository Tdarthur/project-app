import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();

    console.log(typeof error);
    for (let key in error) {
        console.log(" - ", key, error[key]);
    }
    console.log("");

    return (
        <>
            <div className="mx-auto h-72 w-1/2 border-x border-gray-800 px-4 text-left">
                {/* Status */}
                <div className="mb-8">
                    <h2 className="text-6xl font-bold text-gray-200">{error?.status || "Internal Error"}</h2>
                    <h2 className="text-3xl text-gray-400">{error?.statusText || "An internal error occurred"}</h2>
                </div>

                {/* Error Message */}
                {
                    <div className="">
                        {!!error.data && <h3 className="text-xl font-bold text-gray-200">Error Information</h3>}

                        <h3 className="overflow-hidden text-gray-400">
                            {error?.data || (
                                <>
                                    Please return to the{" "}
                                    <Link
                                        to="/"
                                        className="cursor-pointer font-bold text-white hover:text-yellow-600"
                                    >
                                        Home
                                    </Link>{" "}
                                    page
                                </>
                            )}
                        </h3>
                    </div>
                }
            </div>
        </>
    );
}
