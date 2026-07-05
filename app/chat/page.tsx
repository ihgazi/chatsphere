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
import styles from "./Chat.module.css";

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
                
                setMessages(prev => {
                    const roomMsgs = prev[data.room_id] || [];
                    return { ...prev, [data.room_id]: [...roomMsgs, data] };
                });

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
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>My Rooms</h2>
                    <button
                        className={styles.joinBtn}
                        onClick={() => setShowJoinModal(true)}
                    >
                        + Join / Create
                    </button>
                </div>
                <div className={styles.roomList}>
                    {myRooms.map(room => (
                        <div
                            key={room.id}
                            className={activeRoomId === room.id ? styles.roomItemActive : styles.roomItem}
                            onClick={() => setActiveRoomId(room.id)}
                        >
                            <h3 className={activeRoomId === room.id ? styles.roomTitleActive : styles.roomTitle}>{room.name}</h3>
                        </div>
                    ))}
                    {myRooms.length === 0 && (
                        <div className={styles.emptyState}>
                            You haven't joined any rooms yet.
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.mainChat}>
                {activeRoomId ? (
                    <>
                        <div className={styles.chatHeader}>
                            <div className={styles.chatHeaderTitleContainer}>
                                <h2 className={styles.chatTitle}>
                                    {myRooms.find(r => r.id === activeRoomId)?.name || 'Chat'}
                                </h2>
                                <span className={styles.onlineBadge}>
                                    {users.filter(u => u.is_online).length} online
                                </span>
                            </div>
                            <button
                                className={styles.settingsBtn}
                                onClick={() => setModalOpen(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.chatBodyContainer}>
                            <ChatBody data={messages[activeRoomId] || []} />
                        </div>
                        <div className={styles.textFieldContainer}>
                            <TextField />
                        </div>
                    </>
                ) : (
                    <div className={styles.noRoomSelected}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.noRoomIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className={styles.noRoomText}>Select a room to start chatting</p>
                    </div>
                )}
            </div>

            {modalOpen && <RoomSettings setOpen={() => setModalOpen(false)} />}

            {showJoinModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Discover Rooms</h2>
                            <button
                                className={styles.modalCloseBtn}
                                onClick={() => setShowJoinModal(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.modalCloseIcon} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.createSection}>
                            <h3 className={styles.createTitle}>Create a New Room</h3>
                            <RoomCreate setRooms={setAllRooms} />
                        </div>
                        <div className={styles.listSection}>
                            <RoomList rooms={allRooms} setRooms={setAllRooms} onJoin={() => setShowJoinModal(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
