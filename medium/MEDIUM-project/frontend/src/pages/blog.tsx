import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BlogCard } from "../component/blogcard";
import { Header } from "../component/header";
import { useNavigate } from "react-router-dom";
function getRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const startDate = new Date(2020, 0, 1);
const endDate = new Date(2024, 11, 31); 
interface Bloging {
    "title": string
    "content": string
    "id": string
    "authorId": string
}
export const Blog = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Bloging[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);
    const handleCreateClick = () => {
        navigate("/create")
    };

    return (
        <div>
            <Header siteName={"Medium"} userAvatar={"User"} onCreateClick={handleCreateClick}  />
            <div className="mt-4">
                {blogs.map(blog =>
                    <BlogCard 
                    authorName= "anonymous"
                    title={blog.title}
                    date= {formatDate(getRandomDate(startDate, endDate))}
                    content={blog.content}
                    keyId={blog.id}
                    authorId={blog.authorId}
                />

                )}
            </div>
        </div>
    );
};
