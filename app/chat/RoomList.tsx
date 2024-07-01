"use client";

import { useEffect } from "react";
import { RoomInfo } from "@/types";
import getRooms from "@/services/getRooms";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { WebSocketContext } from "@/context/WebSocketContext";
import { WS_URL } from "@/constants";
import { useRouter } from "next/navigation";

interface RoomListProps extends React.HTMLAttributes<HTMLDivElement> {
    rooms: RoomInfo[];
    setRooms: (value: RoomInfo[]) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, setRooms }) => {
    const { user } = useContext(AuthContext);
    const { setConn } = useContext(WebSocketContext);
    const router = useRouter();

    useEffect(() => {
        getRooms(setRooms);
    }, []);

    const handleJoinRoom = (roomId: string) => {
        const ws = new WebSocket(
            `${WS_URL}/ws/joinRoom/${roomId}`
        );
        if (ws.OPEN) {
            setConn(ws);
            router.push(`/chat/${roomId}`);
        }
    };

    return (
        <div className="mt-6">
            <h1 className="font-bold">Active Rooms</h1>
            <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
                {Array.isArray(rooms) &&
                    rooms.map((room, index) => (
                        <div
                            key={index}
                            className="w-full rounded-md flex border border-blue-300 items-center p-4"
                        >
                            <div className="w-full">
                                <h2 className="font-bold">{room.name}</h2>
                            </div>
                            <button
                                className="bg-blue-500 text-white rounded-md px-4"
                                onClick={() => handleJoinRoom(room.id)}
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
