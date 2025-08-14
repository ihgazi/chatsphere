"use client";

import React from "react";
import RoomList from "./RoomList";
import RoomCreate from "./RoomCreate";
import { RoomInfo } from "@/types";
import { WebSocketContext } from "@/context/WebSocketContext";
import { useContext, useEffect } from "react";

export default function ChatPage() {
    const [rooms, setRooms] = React.useState<RoomInfo[]>([]);
    const { conn, users, setConn, setUsers } = useContext(WebSocketContext);

    useEffect(() => {
        if (conn != null && users.length !== 0) {
            conn.close();
            setConn(null);
            setUsers([]);
            console.log("Navigated away from chat page, closing connection.");
        }
    }, [conn, users, setConn])

    return (
        <>
            <div className="my-8 px-4 w-full h-full">
                <h1 className="text-3xl font-bold mx-auto">Chat Rooms</h1>
                <RoomCreate setRooms={(value: RoomInfo[]) => setRooms(value)} />
                <RoomList
                    rooms={rooms}
                    setRooms={(value: RoomInfo[]) => {
                        setRooms(value);
                    }}
                />
            </div>
        </>
    );
}
