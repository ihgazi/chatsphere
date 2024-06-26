import { UserInfo } from "@/types";

export default async function getUsers(
    roomId: string,
    setUsers: (value: UserInfo[]) => void
) {
    try {
        const res = await fetch(`/api/ws/getClients/${roomId}`, {
            method: "GET",
        });
        const data = await res.json();
        console.log("Users in room: " + JSON.stringify(data));
        setUsers(data);
    } catch (error) {
        console.error(error);
    }
}
