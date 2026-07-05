"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { WebSocketContext } from "@/context/WebSocketContext";
import { API_URL } from "@/constants";
import styles from "./Header.module.css";

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
                setUser({ username: "", id: "", is_online: false });
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
        <div className={styles.headerContainer}>
            <h1 className={styles.title}> ChatSphere </h1>
            {authenticated && (
                <button
                    className={styles.logoutBtn}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Header;
