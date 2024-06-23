import { Backpage } from "../component/back";
import { Top } from "../component/top";

export const Signin = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="w-full md:w-auto grid grid-cols-1 md:grid-cols-2 lg:justify-center">
                <div className="flex justify-center md:block">
                    <Top type="signin" />
                </div>
                <div className="hidden md:block">
                    <Backpage />
                </div>
            </div>
        </div>
    );
}
