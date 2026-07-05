"use client";

import React, { useContext } from "react";
import { Message } from "@/types";
import { AuthContext } from "@/context/AuthContext";
import styles from "./ChatBody.module.css";

const ChatBody = ({ data }: { data: Message[] }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className={styles.container}>
            {data.map((message, index) => {
                if (String(message.user_id) === String(user.id)) {
                    return (
                        <div
                            key={index}
                            className={styles.messageContainerRight}
                        >
                            <div className={styles.messageWrapper}>
                                <p className={styles.username}>
                                    {message.username}
                                </p>
                                <p className={styles.bubbleRight}>
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={index}
                            className={styles.messageContainerLeft}
                        >
                            <div className={styles.messageWrapper}>
                                <p className={styles.username}>
                                    {message.username}
                                </p>
                                <p className={styles.bubbleLeft}>
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default ChatBody;
