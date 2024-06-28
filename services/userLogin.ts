import { UserInfo } from "../types";

const userLogin = async ({ email, password }: { email: string, password: string }) => {
    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            const user: UserInfo = {
                username: data.username,
                id: data.id,
            };

            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default userLogin;
