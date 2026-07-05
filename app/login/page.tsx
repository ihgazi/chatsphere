"use client";

import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import userLogin from "@/services/userLogin";
import TextField from "@/components/TextField";
import InputButton from "@/components/InputButton";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthenticated, setUser } = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email && password) {
            try {
                const data = await userLogin({ email, password });

                if (data) {
                    setUser(data);
                    setAuthenticated(true);
                }
            } catch (error: any) {
                toast.error(error.message || "Login failed. Please try again.");
            }
        }
        else {
            toast.error("Please fill in all fields.");
        }
    };

    return (
        <div className="flex items-center justify-center min-w-full mt-10">
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
                <a href="/register" className="text-center text-blue-400 mt-4">
                    Register.
                </a>
            </form>
        </div>
    );
}
