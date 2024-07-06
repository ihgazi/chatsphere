import { UserInfo } from "@/types";
import { API_URL } from "@/constants";

export default async function getUsers(
    roomId: string,
    setUsers: (value: UserInfo[]) => void
) {
    try {
        const res = await fetch(`${API_URL}/ws/getClients/${roomId}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await res.json();
        console.log("Users in room: " + JSON.stringify(data));
        setUsers(data);
    } catch (error) {
        console.error(error);
    }
}
