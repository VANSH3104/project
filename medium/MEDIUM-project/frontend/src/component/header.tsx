import { Avatar } from "../component/blogcard";

interface HeaderProps {
    siteName: string;
    userAvatar: string | null;
    onCreateClick: () => void;
}

export const Header = ({ siteName, userAvatar, onCreateClick }: HeaderProps) => {
    return (
        <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-800">{siteName}</h1>
            </div>
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={onCreateClick}
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Create
                </button>
                {userAvatar && <Avatar icon={userAvatar} />}
            </div>
        </header>
    );
};
