import { RoomInfo } from "@/types";
import { API_URL } from "@/constants";

const getMyRooms = async (setRooms: (value: RoomInfo[]) => void) => {
    try {
        const res = await fetch(`${API_URL}/ws/myRooms`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch my rooms: ${res.status}`);
        }

        const data = await res.json();
        setRooms(data);
    } catch (err) {
        console.log("Failed to fetch my rooms", err);
    }
};

export default getMyRooms;
