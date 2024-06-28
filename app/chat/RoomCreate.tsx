"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RoomInfo } from "@/types";
import getRooms from "@/services/getRooms";
import createRoom from "@/services/createRoom";

interface RoomCreateProps extends React.HTMLAttributes<HTMLDivElement> {
    setRooms: (value: RoomInfo[]) => void;
}

const RoomCreate: React.FC<RoomCreateProps> = ({ setRooms }) => {
    const [roomName, setRoomName] = useState("");

    const handleCreateRoom = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        createRoom({ roomName })
            .then((res) => {
                if (res.ok) {
                    getRooms(setRooms);
                }
            })
            .catch((err) => {});
    };

    return (
        <div className="flex justify-center mt-3 p-5 gap-4">
            <input
                type="text"
                className="border-2 border-grey p-2 rounded-md focus:outline-none focus:border-blue"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <button
                className="bg-blue border text-white rounded-md p-2"
                onClick={handleCreateRoom}
            >
                Create Room
            </button>
        </div>
    );
};

export default RoomCreate;
