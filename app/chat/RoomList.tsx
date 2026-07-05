"use client";

import { useEffect, useContext } from "react";
import { RoomInfo } from "@/types";
import getRooms from "@/services/getRooms";
import joinRoom from "@/services/joinRoom";
import getMyRooms from "@/services/getMyRooms";
import { WebSocketContext } from "@/context/WebSocketContext";

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
        <div className="mt-2">
            <h1 className="font-bold text-gray-700 mb-4">Available Rooms</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(rooms) &&
                    rooms.map((room, index) => (
                        <div
                            key={index}
                            className="w-full rounded-lg flex border border-blue-200 bg-blue-50 items-center p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="w-full">
                                <h2 className="font-bold text-blue-900">{room.name}</h2>
                                <p className="text-xs text-gray-500">#{room.id}</p>
                            </div>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors"
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
