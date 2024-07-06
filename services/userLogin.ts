import { API_URL } from "../constants";

const userLogin = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            return true;
        } else {
            console.log(data);
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default userLogin;
