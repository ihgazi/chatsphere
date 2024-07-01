"use client";

import React, { useContext } from "react";
import { Message } from "@/types";
import { AuthContext } from "@/context/AuthContext";

const ChatBody = ({ data }: { data: Message[] }) => {
    const { user } = useContext(AuthContext);

    return (
        <>
            {data.map((message, index) => {
                if (message.user_id === user.id) {
                    return (
                        <div
                            key={index}
                            className="flex justify-end mt-2 w-full text-right px-4"
                        >
                            <div className="flex flex-col w-fit">
                                <p className="text-sm">
                                    {message.username}
                                </p>
                                <p className="bg-blue text-white rounded-md inline-block px-4 py-1 mt-1">
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div
                            key={index}
                            className="flex flex-col justify-start mt-2 w-full text-left px-4"
                        >
                            <div className="flex flex-col w-fit">
                                <p className="text-sm">
                                    {message.username}
                                </p>
                                <p className="bg-grey rounded-md inline-block px-4 py-1 mt-1">
                                    {message.content}
                                </p>
                            </div>
                        </div>
                    );
                }
            })}
        </>
    );
};

export default ChatBody;
