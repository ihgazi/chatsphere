"use client";

import React, { useState } from "react";
import { RoomInfo } from "@/types";
import getRooms from "@/services/getRooms";
import createRoom from "@/services/createRoom";
import styles from "./RoomCreate.module.css";

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
        <div className={styles.container}>
            <input
                type="text"
                className={styles.input}
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <button
                className={styles.button}
                onClick={handleCreateRoom}
            >
                Create Room
            </button>
        </div>
    );
};

export default RoomCreate;
