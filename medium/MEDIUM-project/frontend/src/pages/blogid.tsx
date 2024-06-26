import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "../component/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Bloging {
  title: string;
  content: string;
}

export const Blogid = () => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/create?id=");
  };
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
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");

  if (id !== null) {
    id = id.trim().replace(/['"]/g, '');
  }
  const [blog, setBlog] = useState<Bloging | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${decodeURIComponent(id)}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
          setBlog(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
        }
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="blog-page">
      <Header siteName="Medium" userAvatar="User" onCreateClick={handleCreateClick} />
      
      <div className="content-wrapper p-6 mt-4 rounded-lg shadow-lg h-screen bg-slate-100">
        {blog ? (
          <>
            <div className="title-section flex items-center justify-between p-4 mb-1 font-extrabold text-5xl  rounded-lg ">
              <h1 className="title ">{blog.title}</h1>
            </div>
            <div className="date-section text-gray-600 p-4 mb-4 text-slate-400">
              {formatDate(getRandomDate(startDate, endDate))}
            </div>
            <div className="content-section p-4 rounded-lg">
              <p className="content">{blog.content}</p>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
