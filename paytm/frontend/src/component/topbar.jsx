export function Topbar(){
    return (
        <div className="shadow h-16 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-5" >
            <img class="_3r8MI" src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg" alt="logo"></img>
            </div>
            <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 font-bold text-xl">
                Hello
            </div>
            <div className="rounded-full flex justify-center ml mr-2 mt-1 h-12 w-12 bg-slate-300 p-4">
                <div className="flex flex-col justify-center font-bold text-xl h-full">
                    U
                </div>
            </div>
            </div>
        </div>
    )
}