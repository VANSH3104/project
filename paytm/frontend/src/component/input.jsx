
export function Inputmain({label , placeholder , type , onChange}){
    return (
        <>
        <div className="pt-6">
            <label htmlfor={label} className="block mb-2 text-sm font-medium text-white-900 white:text-white">{label}</label>
            <input onChange={onChange} type={type} className="bg-white border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-black-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    </>
        
    )
}