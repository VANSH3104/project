import { Balance } from "../component/balance";
import { AllUsers } from "../component/showuser";
import { Topbar } from "../component/topbar";

export function Dashboard(){
    return (
        <div>
            <Topbar />
            <Balance />
            <AllUsers />
        </div>
    )
}