"use client"

import React, { useState, createContext } from "react";
import { Conn } from "@/types";

export const WebSocketContext = createContext<{
    conn: Conn
    setConn: (c: Conn) => void
}>({
    conn: null,
    setConn: () => {}
});

const WebSocketProvider = ({ children }: { children: React.ReactNode } ) => {
    const [conn, setConn] = useState<Conn>(null);

    return (
        <WebSocketContext.Provider value={{ conn, setConn }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export default WebSocketProvider;
