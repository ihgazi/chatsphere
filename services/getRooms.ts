import { RoomInfo } from "@/types";
import { API_URL } from "@/constants";

const getRooms = async (setRooms: (value: RoomInfo[]) => void) => {
    try {
        const res = await fetch(`${API_URL}/ws/getRooms`, {
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
