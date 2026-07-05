"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { WebSocketContext } from "@/context/WebSocketContext";
import { API_URL } from "@/constants";

const Header: React.FC = () => {
    const { authenticated, setUser, setAuthenticated } =
        useContext(AuthContext);
    const {
        conn,
        setConn,
        setActiveRoomId,
        setMyRooms,
        setMessages,
        setUsers,
    } = useContext(WebSocketContext);

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

                // Clear out context state so next login is fresh
                setActiveRoomId(null);
                setMyRooms([]);
                setMessages({});
                setUsers([]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex h-fit w-full px-2 md:px-4 py-2 bg-slate-200 items-center">
            <h1 className="text-lg md:text-2xl my-auto font-bold text-gray-800"> ChatSphere </h1>
            {authenticated && (
                <button
                    className="ml-auto bg-red-500 hover:bg-red-600 transition-colors rounded-md px-4 py-2 text-white h-fit font-medium"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Header;
