"use client";

import { useEffect, useContext } from "react";
import { RoomInfo } from "@/types";
import getRooms from "@/services/getRooms";
import joinRoom from "@/services/joinRoom";
import getMyRooms from "@/services/getMyRooms";
import { WebSocketContext } from "@/context/WebSocketContext";
import styles from "./RoomList.module.css";

interface RoomListProps extends React.HTMLAttributes<HTMLDivElement> {
    rooms: RoomInfo[];
    setRooms: (value: RoomInfo[]) => void;
    onJoin?: () => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, setRooms, onJoin }) => {
    const { setMyRooms, setActiveRoomId } = useContext(WebSocketContext);

    useEffect(() => {
        getRooms(setRooms);
    }, [setRooms]);

    const handleJoinRoom = async (room: RoomInfo) => {
        try {
            await joinRoom(room.id);
            await getMyRooms(setMyRooms);
            setActiveRoomId(room.id);
            if (onJoin) onJoin();
        } catch (error) {
            console.error("Error joining room:", error);
            alert("Failed to join room.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Available Rooms</h1>
            <div className={styles.grid}>
                {Array.isArray(rooms) &&
                    rooms.map((room, index) => (
                        <div
                            key={index}
                            className={styles.roomCard}
                        >
                            <div className={styles.roomInfo}>
                                <h2 className={styles.roomName}>{room.name}</h2>
                                <p className={styles.roomId}>#{room.id}</p>
                            </div>
                            <button
                                className={styles.joinButton}
                                onClick={() => handleJoinRoom(room)}
                            >
                                Join
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RoomList;
