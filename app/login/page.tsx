"use client";

import React from "react";
import { useState, useContext, useEffect } from "react";
//import { API_URL } from "@/constants";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";
import { AuthContext } from "@/context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (authenticated) {
            router.push("/");
        }
    }, [authenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
                return router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-w-full min-h-screen">
            <form className="flex flex-col">
                <p className="text-3xl font-bold text-center"> Login </p>
                <input
                    placeholder="email"
                    className="p-3 mt-8 rounded-md border border-grey focus:outline-none focus:border-blue"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="password"
                    className="p-3 mt-8 rounded-md border border-grey focus:outline-none focus:border-blue"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="p-3 mt-6 bg-blue rounded-md font-bold text-white"
                    type="submit"
                    onClick={handleSubmit}
                >
                    {" "}
                    login{" "}
                </button>
            </form>
        </div>
    );
}
