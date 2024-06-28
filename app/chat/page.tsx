"use client";

import React from "react";
import RoomList from "./RoomList";
import RoomCreate from "./RoomCreate";
import { RoomInfo } from "@/types";

export default function ChatPage() {
    const [rooms, setRooms] = React.useState<RoomInfo[]>([]);

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
