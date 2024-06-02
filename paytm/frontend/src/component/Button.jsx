export function Button({label, onClick}){
    return <div>
        <button
             onClick={onClick}
            type="button"
            id="button"
            className="flex justify-center text-lg bg-black border border-gray-300 text-white text-sm rounded-lg focus:ring-black focus:border-blue-500 block w-full p-2.5 dark:bg-black-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {label}
          </button>
    </div>
}