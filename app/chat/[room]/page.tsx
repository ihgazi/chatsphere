"use client";

import { useState, useRef, useContext, useEffect } from "react";
import { Message, UserInfo } from "@/types";
import ChatBody from "./ChatBody";
import { WebSocketContext } from "@/context/WebSocketContext";
import { useRouter } from "next/navigation";
import getUsers from "@/services/getUsers";

export default function RoomPage({ params }: { params: { room: string } }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<UserInfo[]>([]);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { conn } = useContext(WebSocketContext);

    const router = useRouter();

    useEffect(() => {
        if (conn == null) {
            router.push("/");
            return;
        }

        getUsers(params.room, (value: UserInfo[]) => {
            setUsers(value);
        });
    }, []);

    useEffect(() => {
        if (conn == null) {
            router.push("/");
            return;
        }

        conn.onmessage = (message) => {
            const data: Message = JSON.parse(message.data);
            if (data.content === "A new user has joined the room") {
                const newUser: UserInfo = {
                    username: data.username,
                    id: data.user_id,
                };
                setUsers([...users, newUser]);
            } else if (data.content === "user has left the chat") {
                const deletedUsers = users.filter(
                    (user) => user.id !== data.user_id
                );
                setUsers(deletedUsers);
            } 

            setMessages([...messages, data]);
        };
        // TODO: Implement onclose event
        conn.onclose = () => {};

        conn.onerror = () => {};

        conn.onopen = () => {};
    }, [textAreaRef, messages, conn, users]);

    const sendMessage = () => {
        if (!textAreaRef.current?.value) return;
        if (conn === null) {
            router.push('/');
            return;
        }

        conn?.send(textAreaRef.current.value);
        textAreaRef.current.value = "";
    };

    return (
        <div className="flex flex-col w-full">
            <ChatBody data={messages} />
            <div className="fixed bottom-0 mt-4 w-full">
                <div className="flex px-4 py-2 bg-grey rounded-md mx-2">
                    <div className="flex w-full mr-4 rounded-md border border-blue">
                        <textarea
                            ref={textAreaRef}
                            placeholder="type your message here"
                            className="w-full h-10 p-2 rounded-md focus:outline-none"
                            style={{ resize: "none" }}
                        />
                    </div>
                    <div className="flex items-center">
                        <button
                            className="p-2 rounded-md bg-blue text-white"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
