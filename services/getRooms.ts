import { RoomInfo } from "@/types";

const getRooms = async (setRooms: (value: RoomInfo[]) => void) => {
    try {
        const res = await fetch("/api/ws/getRooms", {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();
        setRooms(data);
    } catch (err) {
        console.log("Failed to fetch rooms", err);
    }
};

export default getRooms;
