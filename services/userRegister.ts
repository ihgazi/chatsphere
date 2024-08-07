import { API_URL } from "../constants";

const userRegister = async (username: string, email: string, password: string) => {
    try {
        const res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
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
}

export default userRegister
