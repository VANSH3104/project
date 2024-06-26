import { useNavigate } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    date: string;
    keyId: string;
    authorId:string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    date,
    keyId
}: BlogCardProps) => {
    return (
        <div className="flex items-center w-full py-7 px-7">
            <div className="rounded overflow-hidden bg-white content-around w-full">
                <div className="flex items-center mb-3">
                    <Avatar icon={authorName} blogId={keyId} />
                    <div className="ml-4 text-slate-800 dark:text-slate-800">
                        {authorName} &middot; {date}
                    </div>
                </div>
                <div className="mb-1 text-2xl font-bold text-slate-900 dark:text-slate-800">
                    {title}
                </div>
                <div className="text-slate-700 dark:text-gray-500">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="mt-3 text-gray-600 dark:text-gray-400">
                    {`${Math.ceil(content.length / 100)} minutes`}
                </div>
                <div className="mt-3 border-b border-gray-500 w-full"></div>
            </div>
        </div>
    );
}

interface IconProps {
    icon: string;
    blogId?: string;
}
export const Avatar = ({ icon , blogId }: IconProps) => {
    const navigate = useNavigate();
    function click(){
        navigate(`/show?id="${blogId}`)
    }
    return (
        <button onClick={click} className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-500 rounded-full dark:bg-gray-600">
            <span className="font-medium text-white dark:text-gray-300">{icon[0]}</span>
        </button>
    );
}
