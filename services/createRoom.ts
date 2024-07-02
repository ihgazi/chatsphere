import { v4 as uuidv4 } from "uuid";

const createRoom = async ({ roomName }: { roomName: string }) => {
    try {
        const res = await fetch("/api/ws/createRoom", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: uuidv4(),
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
