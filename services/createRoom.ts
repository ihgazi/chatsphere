import { API_URL } from "../constants";

const createRoom = async ({ roomName }: { roomName: string }) => {
    try {
        const res = await fetch(`${API_URL}/ws/createRoom`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: roomName,
            }),
        });

        const data = await res.json();
        console.log(data);
        return res;
    } catch (err) {
        console.log("Failed to create room", err);
        throw err;
    }
}

export default createRoom;
