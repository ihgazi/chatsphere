"use client";

import React, { useEffect, useState } from "react";
import { UserInfo } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import checkAuth from "@/services/checkAuth";

export const AuthContext = React.createContext<{
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    user: UserInfo;
    setUser: (user: UserInfo) => void;
}>({
    authenticated: false,
    setAuthenticated: () => { },
    user: { id: "", username: "", is_online: false },
    setUser: () => { },
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserInfo>({ id: "", username: "", is_online: false });
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    const router = useRouter();
    const pathname = usePathname();

    // Check authentication once when the app mounts
    useEffect(() => {
        const initAuth = async () => {
            const success = await checkAuth(setUser);
            setAuthenticated(success);
            setIsCheckingAuth(false);
        };
        initAuth();
    }, []);

    // Handle redirects based on auth state and current route
    useEffect(() => {
        if (isCheckingAuth) return;

        if (authenticated) {
            // If they are logged in and on a public page, send them to chat
            if (pathname === "/" || pathname === "/login" || pathname === "/register") {
                router.push("/chat");
            }
        } else {
            // If they are NOT logged in and trying to access a protected page, send them to login
            if (pathname !== "/" && pathname !== "/login" && pathname !== "/register") {
                router.push("/login");
            }
        }
    }, [authenticated, isCheckingAuth, pathname, router]);

    return (
        <AuthContext.Provider
            value={{ authenticated, setAuthenticated, user, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
