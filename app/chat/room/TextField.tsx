"use client";

import { useContext, useRef } from "react";
import { WebSocketContext } from "@/context/WebSocketContext";
import { AuthContext } from "@/context/AuthContext";
import styles from "./TextField.module.css";

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
        <div className={styles.container}>
            <div className={styles.inputWrapper}>
                <div className={styles.textareaContainer}>
                    <textarea
                        ref={textAreaRef}
                        placeholder="Type your message here..."
                        className={styles.textarea}
                        onKeyDown={handleEnter}
                        rows={1}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.sendButton}
                        onClick={sendMessage}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextField;
