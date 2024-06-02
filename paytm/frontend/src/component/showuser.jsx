import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AllUsers() {
    const [users, setUsers] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${input}`);
                setUsers(response.data.user);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [input]);

    return (
        <>
            <div className="flex h-6 pt-14 pl-9 font-bold text-xl">
                Users
            </div>
            <div className="my-2 pt-7 pl-9">
                <input
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div className="pt-5 pl-9">
                {users.map(user => <User key={user.id} user={user} />)}
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between mb-4">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center items-center mt-1 mr-2">
                    <div className="text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center pr-6">
                <button
                    onClick={(e)=>{
                        navigate("/send?id="+ user._id + "&name="+ user.firstName)
                    }}  
                    type="button"
                    className="flex justify-center text-lg bg-black border border-gray-300 text-white text-sm rounded-lg focus:ring-black focus:border-blue-500 block w-full p-2.5 pl-6 pr-6">
                    Send Money
                </button>
            </div>
        </div>
    );
}
