"use client"

import React, { useEffect, useState } from "react";
import { UserInfo } from "@/types";
import { useRouter } from "next/navigation";

export const AuthContext = React.createContext<{
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    user: UserInfo;
    setUser: (user: UserInfo) => void;
}>({
    authenticated: false,
    setAuthenticated: () => {},
    user: { id: "", username: "" },
    setUser: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<UserInfo>({ id: "", username: "" });

    const router = useRouter(); 

    useEffect(() => {
        const userInfo = localStorage.getItem("user");

        if (!userInfo) {
            if (window.location.pathname !== '/signup') {
                router.push("/login");
                return
            }
        } else {
            const user: UserInfo = JSON.parse(userInfo);
            setUser(user);
            setAuthenticated(true);
        }
    }, [router]);

    return (
        <AuthContext.Provider
            value={{ authenticated, setAuthenticated, user, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
