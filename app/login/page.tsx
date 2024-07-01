"use client";

import React from "react";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import userLogin from "@/services/userLogin";
import TextField from "@/components/TextField";
import InputButton from "@/components/InputButton";

export default function LoginPage() {
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

        const success = await userLogin({ email, password });
        if (success) {
            router.push("/chat");
        }
    };

    return (
        <div className="flex items-center justify-center min-w-full min-h-screen">
            <form className="flex flex-col">
                <p className="text-3xl font-bold text-center"> Login </p>
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
                <InputButton title="Login" handleSubmit={handleSubmit} />
                <a href="/register" className="text-center text-blue mt-4">
                    Register.
                </a>
            </form>
        </div>
    );
}
