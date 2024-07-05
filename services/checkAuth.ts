import { UserInfo } from "@/types";

const checkAuth = async (
    setUser: (value: UserInfo) => void
) => {
    try {
        const res = await fetch("/api/ws/auth", {
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data);
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default checkAuth;

