"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { WebSocketContext } from "@/context/WebSocketContext";
import { API_URL } from "@/constants";

const Header: React.FC = () => {
    const { authenticated, setUser, setAuthenticated } =
        useContext(AuthContext);
    const { conn, setConn, room, users, setModalOpen } =
        useContext(WebSocketContext);

    const handleLogout = async () => {
        try {
            const res = await fetch(`${API_URL}/logout`, {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                setUser({ username: "", id: "" });
                setAuthenticated(false);
                if (conn) conn.close();
                setConn(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex h-fit w-full px-2 md:px-4 py-2 bg-slate-200 items-center">
            <h1 className="text-lg md:text-2xl my-auto"> ChatSphere </h1>
            {conn && (
                <button
                    className="flex flex-col ml-3 md:ml-10 text-left"
                    onClick={() => setModalOpen(true)}
                >
                    <p className="text-sm md:text-md">
                        {" "}
                        {`${room.name}: ${users.length} online`}{" "}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-blue-500">
                        {" "}
                        {`Tap to view more details`}{" "}
                    </p>
                </button>
            )}
            {authenticated && (
                <button
                    className="ml-auto bg-red-500 rounded-md p-2 text-white h-fit"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Header;
