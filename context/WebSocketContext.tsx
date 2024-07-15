"use client";

import React, { useState, createContext } from "react";
import { Conn, RoomInfo, UserInfo } from "@/types";

export const WebSocketContext = createContext<{
    conn: Conn;
    setConn: (c: Conn) => void;
    room: RoomInfo;
    setRoom: (r: RoomInfo) => void;
    users: UserInfo[];
    setUsers: (u: UserInfo[]) => void;
    modalOpen: boolean;
    setModalOpen: (b: boolean) => void;
}>({
    conn: null,
    setConn: () => {},
    room: { id: "", name: "" },
    setRoom: () => {},
    users: [],
    setUsers: () => {},
    modalOpen: false,
    setModalOpen: () => {},
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [conn, setConn] = useState<Conn>(null);
    const [room, setRoom] = useState<RoomInfo>({ id: "", name: "" });
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <WebSocketContext.Provider
            value={{
                conn,
                setConn,
                room,
                setRoom,
                users,
                setUsers,
                modalOpen,
                setModalOpen,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
