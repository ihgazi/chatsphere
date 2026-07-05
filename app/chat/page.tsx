"use client";

import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "@/context/WebSocketContext";
import { AuthContext } from "@/context/AuthContext";
import { WS_URL } from "@/constants";
import getMyRooms from "@/services/getMyRooms";
import getUsers from "@/services/getUsers";
import ChatBody from "./room/ChatBody";
import TextField from "./room/TextField";
import RoomList from "./RoomList";
import RoomCreate from "./RoomCreate";
import RoomSettings from "@/components/RoomSettings";
import { Message, RoomInfo } from "@/types";

export default function ChatPage() {
    const { authenticated } = useContext(AuthContext);
    const {
        conn, setConn,
        activeRoomId, setActiveRoomId,
        myRooms, setMyRooms,
        messages, setMessages,
        users, setUsers,
        modalOpen, setModalOpen
    } = useContext(WebSocketContext);

    const [showJoinModal, setShowJoinModal] = useState(false);
    const [allRooms, setAllRooms] = useState<RoomInfo[]>([]);

    useEffect(() => {
        if (authenticated && conn === null) {
            const ws = new WebSocket(`${WS_URL}/ws/connect`);

            ws.onopen = () => {
                setConn(ws);
                getMyRooms(setMyRooms);
            };

            ws.onerror = (err) => {
                console.error("Global WS error", err);
            };

            ws.onclose = () => {
                setConn(null);
            };
        }
    }, [authenticated, conn, setConn, setMyRooms]);

    useEffect(() => {
        if (conn) {
            conn.onmessage = (messageEvent) => {
                const data: Message = JSON.parse(messageEvent.data);
                console.log(messageEvent); // TODO: REMOVE
                setMessages(prev => {
                    const roomMsgs = prev[data.room_id] || [];
                    return { ...prev, [data.room_id]: [...roomMsgs, data] };
                });

                // Handle user join / leave events on client
                if (data.content === "A new user has joined the room" || data.content === "user has left the chat") {
                    if (activeRoomId === data.room_id) {
                        getUsers(activeRoomId, setUsers);
                    }
                }
            };
        }
    }, [conn, setMessages, activeRoomId, setUsers]);

    useEffect(() => {
        if (activeRoomId) {
            getUsers(activeRoomId, setUsers);
        } else {
            setUsers([]);
        }
    }, [activeRoomId, setUsers]);

    return (
        <div className="flex h-[calc(100vh-64px)] w-full">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-300 flex flex-col bg-white">
                <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">My Rooms</h2>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
                        onClick={() => setShowJoinModal(true)}
                    >
                        + Join / Create
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {myRooms.map(room => (
                        <div
                            key={room.id}
                            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${activeRoomId === room.id ? 'bg-blue-50 border-l-4 border-blue-600' : 'hover:bg-gray-50'}`}
                            onClick={() => setActiveRoomId(room.id)}
                        >
                            <h3 className={`font-semibold ${activeRoomId === room.id ? 'text-blue-800' : 'text-gray-800'}`}>{room.name}</h3>
                        </div>
                    ))}
                    {myRooms.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            You haven't joined any rooms yet.
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="w-2/3 flex flex-col bg-gray-50 relative">
                {activeRoomId ? (
                    <>
                        <div className="p-4 border-b border-gray-300 bg-white shadow-sm flex justify-between items-center z-10">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {myRooms.find(r => r.id === activeRoomId)?.name || 'Chat'}
                                </h2>
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {users.filter(u => u.is_online).length} online
                                </span>
                            </div>
                            <button
                                className="text-gray-500 hover:text-gray-700 p-2"
                                onClick={() => setModalOpen(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden relative flex flex-col">
                            <ChatBody data={messages[activeRoomId] || []} />
                        </div>
                        <div className="p-4 bg-white border-t border-gray-200">
                            <TextField />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 flex-col gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-xl">Select a room to start chatting</p>
                    </div>
                )}
            </div>

            {/* Modals */}
            {modalOpen && <RoomSettings setOpen={() => setModalOpen(false)} />}

            {showJoinModal && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-3xl w-full max-h-[90vh] flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Discover Rooms</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                                onClick={() => setShowJoinModal(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="mb-8 border-b pb-6">
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">Create a New Room</h3>
                            <RoomCreate setRooms={setAllRooms} />
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <RoomList rooms={allRooms} setRooms={setAllRooms} onJoin={() => setShowJoinModal(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
