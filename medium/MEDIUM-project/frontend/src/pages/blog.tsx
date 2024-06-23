import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BlogCard } from "../component/BlogCard";
import { Header } from "../component/Header";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk?filter=${input}`);
                setBlogs(response.data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                // Handle error state if needed
            }
        };

        fetchBlogs();
    }, [input]);

    const handleCreateClick = () => {
        // Example: Navigate to create blog form or show modal
        console.log("Create button clicked");
    };

    return (
        <div>
            <Header siteName={"Medium"} userAvatar={"Jane Doe"} onCreateClick={handleCreateClick} />
            <div className="pt-7">
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Search title..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div className="mt-4">
                {blogs.map(blog => (
                    <BlogCard 
                        authorName={}
                        title={blog.title}
                        date={blog.date}
                        content={blog.content}
                    />
                ))}
            </div>
        </div>
    );
};

export default Blog;
