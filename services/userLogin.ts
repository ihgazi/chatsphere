import { API_URL } from "../constants";

import toast from "react-hot-toast";

const userLogin = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    try {
        const promise = fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        
        toast.promise(promise, {
            loading: "Logging in...",
            success: "Logged in!",
            error: "Invalid Credentials"
        });

        const res = await promise;
        const data = await res.json();
        console.log(data);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export default userLogin;
