import { useEffect, useState } from "react";
import { Header } from "../component/header";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Create(){
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [Context, setContent] = useState('');
    const id = Math.random() *10;
    const handleCreateClick = async() => {
            const fetchBlogs = async () => {
                try {
                    const token = localStorage.getItem("token");
                    await axios.post(
                        `${BACKEND_URL}/api/v1/blog`,
                        { title, Context , id},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                } catch (error) {
                    console.error("Error creating blog:", error);
                }
            };
            
            fetchBlogs();
        navigate("/blogs")
    };
    return <div>
        <Header siteName={"Medium"} userAvatar={"User"} onCreateClick={handleCreateClick} prop={"Upload"}  />
        <div className="m-7">
        <div className="mb-6">
                    <h1>
                        <textarea
                            className="w-full p-4 text-gray-900 text-4xl font-extrabold dark:text-black border-none focus:outline-none placeholder-gray-500"
                            placeholder="Title"
                            rows={1}
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                    </h1>
                </div>
                <div className="mb-6 h-screen flex">
        <p className="flex-1">
            <textarea
                className="w-full h-full p-4 text-gray-900 text-xl dark:text-black border-none focus:outline-none placeholder-gray-500 resize-none"
                placeholder="Content"
                onChange={(e)=>setContent(e.target.value)}
                style={{ minHeight: "calc(100vh - 200px)" }}
            ></textarea>
        </p>
    </div>

            
        </div>
    </div>
}