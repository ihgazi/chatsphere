"use client";

import React, { useState, createContext } from "react";
import { Conn, RoomInfo, UserInfo, Message } from "@/types";

export const WebSocketContext = createContext<{
    conn: Conn;
    setConn: (c: Conn) => void;
    activeRoomId: string | null;
    setActiveRoomId: (id: string | null) => void;
    myRooms: RoomInfo[];
    setMyRooms: (rooms: RoomInfo[]) => void;
    messages: Record<string, Message[]>;
    setMessages: React.Dispatch<React.SetStateAction<Record<string, Message[]>>>;
    users: UserInfo[];
    setUsers: (u: UserInfo[]) => void;
    modalOpen: boolean;
    setModalOpen: (b: boolean) => void;
}>({
    conn: null,
    setConn: () => { },
    activeRoomId: null,
    setActiveRoomId: () => { },
    myRooms: [],
    setMyRooms: () => { },
    messages: {},
    setMessages: () => { },
    users: [],
    setUsers: () => { },
    modalOpen: false,
    setModalOpen: () => { },
});

const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [conn, setConn] = useState<Conn>(null);
    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
    const [myRooms, setMyRooms] = useState<RoomInfo[]>([]);
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <WebSocketContext.Provider
            value={{
                conn,
                setConn,
                activeRoomId,
                setActiveRoomId,
                myRooms,
                setMyRooms,
                messages,
                setMessages,
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
