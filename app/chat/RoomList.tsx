"use client";

import { useState, useEffect } from "react";
import { RoomInfo } from "@/types";
import getRooms from "./getRooms";

interface RoomListProps extends React.HTMLAttributes<HTMLDivElement> {
    rooms: RoomInfo[];
    setRooms: (value: RoomInfo[]) => void;
}

const RoomList: React.FC<RoomListProps> = ({
    rooms,
    setRooms,
}) => {

    useEffect(() => {
        getRooms(setRooms);
    }, []);

    return (
        <div className="mt-6">
            <h1 className="font-bold">Active Rooms</h1>
            <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
                {rooms.map((room, index) => (
                    <div
                        key={index}
                        className="w-full rounded-md flex border border-blue items-center p-4"
                    >
                        <div className="w-full">
                            <h2 className="font-bold">{room.name}</h2>
                        </div>
                        <button className="bg-blue text-white rounded-md px-4">
                            Join
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomList;
