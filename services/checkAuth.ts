import { UserInfo } from "@/types";

const checkAuth = async (
    setAuthenticated: (value: boolean) => void,
    setUser: (value: UserInfo) => void
) => {
    try {
        const res = await fetch("/api/ws/auth", {
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            setAuthenticated(true);
            const data = await res.json();
            setUser(data);
        } else {
            setAuthenticated(false);
        }
    } catch (err) {
        console.log(err);
        setAuthenticated(false);
    }
};

export default checkAuth;

