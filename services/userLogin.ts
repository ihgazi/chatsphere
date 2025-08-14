import { API_URL } from "../constants";

import toast from "react-hot-toast";

const userLogin = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const promise = fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
    });

    const res = await promise;
    if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid Credentials");
    }

    const data = await res.json();
    return data;
};

export default userLogin;
