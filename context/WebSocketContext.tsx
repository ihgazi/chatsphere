"use client"

import React, { useState, createContext } from "react";
import { Conn, RoomInfo } from "@/types";

export const WebSocketContext = createContext<{
    conn: Conn
    setConn: (c: Conn) => void
    room: RoomInfo
    setRoom: (r: RoomInfo) => void
}>({
    conn: null,
    setConn: () => {},
    room: { id: "", name: "" },
    setRoom: () => {}
});

const WebSocketProvider = ({ children }: { children: React.ReactNode } ) => {
    const [conn, setConn] = useState<Conn>(null);
    const [room, setRoom] = useState<RoomInfo>({ id: "", name: "" });
        
    return (
        <WebSocketContext.Provider value={{ conn, setConn, room, setRoom }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
