"use client";

import { useContext, useRef } from "react";
import { WebSocketContext } from "@/context/WebSocketContext";
import { AuthContext } from "@/context/AuthContext";

const TextField = () => {
    const { conn, activeRoomId } = useContext(WebSocketContext);
    const { user } = useContext(AuthContext);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const sendMessage = () => {
        if (!textAreaRef.current?.value || !activeRoomId || !conn) return;

        const messageData = {
            content: textAreaRef.current.value,
            room_id: activeRoomId,
            user_id: user.id,
            username: user.username
        };

        conn.send(JSON.stringify(messageData));
        textAreaRef.current.value = "";
    };

    const handleEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="w-full">
            <div className="flex px-4 py-2 bg-gray-100 rounded-xl mx-2 shadow-inner">
                <div className="flex w-full mr-4">
                    <textarea
                        ref={textAreaRef}
                        placeholder="Type your message here..."
                        className="w-full h-12 p-3 bg-transparent rounded-md focus:outline-none resize-none"
                        onKeyDown={handleEnter}
                        rows={1}
                    />
                </div>
                <div className="flex items-center">
                    <button
                        className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        onClick={sendMessage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextField;
