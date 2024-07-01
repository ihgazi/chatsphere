"use client";

import React from "react";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import userRegister from "@/services/userRegister";
import TextField from "@/components/TextField";
import InputButton from "@/components/InputButton";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (authenticated) {
            router.push("/chat");
        }
    }, [authenticated, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await userRegister(username, email, password);
        if (success) {
            router.push("/login");
        }
    };

    return (
        <div className="flex items-center justify-center min-w-full mt-10">
            <form className="flex flex-col">
                <p className="text-3xl font-bold text-center"> Register </p>
                <TextField
                    title={"Username"}
                    value={username}
                    setValue={(e: string) => setUsername(e)}
                />
                <TextField
                    title={"Email"}
                    value={email}
                    setValue={(e: string) => setEmail(e)}
                />
                <TextField
                    title={"Password"}
                    value={password}
                    setValue={(e: string) => setPassword(e)}
                />
                <InputButton title="Register" handleSubmit={handleSubmit} />
                <a href="/login" className="text-center text-blue-400 mt-4">
                    Login.
                </a>
            </form>
        </div>
    );
}
