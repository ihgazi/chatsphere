"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { API_URL } from "@/constants";

const Header: React.FC = () => {
    const { authenticated, setUser, setAuthenticated } =
        useContext(AuthContext);

    const handleLogout = async () => {
        try {
            const res =  await fetch(`${API_URL}/logout`, {
                method: "GET",
                credentials: "include",
            });

            if (res.ok) {
                setUser({ username: "", id: "" });
                setAuthenticated(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex h-fit w-full px-4 py-2 bg-slate-200">
            <h1 className="text-2xl"> ChatSphere </h1>
            {authenticated && (
                <button
                    className="ml-auto bg-red-500 rounded-md p-2 text-white"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Header;
