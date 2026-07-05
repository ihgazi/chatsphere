import { API_URL } from "@/constants";

const joinRoom = async (roomId: string) => {
    try {
        const res = await fetch(`${API_URL}/ws/joinRoom/${roomId}`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(`Failed to join room: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Failed to join room", err);
        throw err;
    }
};

export default joinRoom;
