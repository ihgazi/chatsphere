const checkAuth = async () => {
    const res = await fetch("/api/ws/auth", {
        method: "GET",
        credentials: "include",
    });

    const data = await res.json();
    return data;
}

export default checkAuth;
